import { useEffect, useContext, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
// import Peer from "simple-peer";
import Sidebar from "../components/sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  getConversations,
  updateMessagesAndConversations
} from "../store/chatSlice";
import Call from "../components/Chat/call/Call";
import WhatsappHome from "../components/Chat/WhatsappHome";
import ChatContainer from "../components/Chat/ChatContainer";
import SocketContext from "../context/SocketContext";
import {
  getConversationName,
  getConversationPicture,
  getConversationId
} from "../utils/chat";

const callData = {
  socketId: "",
  receiveingCall: false,
  callEnded: false,
  name: "",
  picture: "",
  signal: "",
  callerId: "",
  calleeId: "",
  callId: ""
};

function Home() {
  const { user } = useSelector(state => state.user);
  const { activeConversation } = useSelector(state => state.chat);
  const dispatch = useDispatch();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const SimplePeer = window.SimplePeer;

  const { socket } = useContext(SocketContext);

  const [call, setCall] = useState(callData);
  const [stream, setStream] = useState();
  const [show, setShow] = useState(false);
  const { receiveingCall, callEnded, socketId } = call;
  const [callAccepted, setCallAccepted] = useState(false);
  const [totalSecsInCall, setTotalSecsInCall] = useState(0);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  // Visibilitychange
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.hidden) {
  //       console.log("Visibilitychange: socket disconnected");
  //       socket.connect();
  //     } else {
  //       // socket.connect();
  //       // console.log("Visibilitychange: socket connected");
  //       // socket.emit("join", user._id);
  //       // socket.on("get-online-users", users => {
  //       //   setOnlineUsers(users);
  //       // });
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, []);

  // call
  useEffect(() => {
    setUpMedia();

    socket.on("setup socket", id => {
      setCall({ ...call, socketId: id });
    });
    socket.on("call user", data => {
      setCall({
        ...call,
        socketId: data.from,
        name: data.name,
        picture: data.picture,
        signal: data.signal,
        receiveingCall: true,
        callerId: data.callerId,
        calleeId: data.calleeId,
        callId: data.callId
      });
      setShow(true);
      // console.log("callAccepted: ", callAccepted);
      // console.log("receiveingCall: ", call.receiveingCall);
    });

    socket.on("end call", () => {
      setShow(false);
      socket.emit("leave call", call.callId);

      // setCall({
      //   ...call,
      //   callEnded: true,
      //   receiveingCall: false
      // });

      setCall({
        socketId: "",
        receiveingCall: false,
        callEnded: false,
        name: "",
        picture: "",
        signal: "",
        callerId: "",
        calleeId: "",
        callId: ""
      });

      console.log("end call listened");
      // myVideo.current.srcObject = null;
      if (callAccepted) {
        console.log("end call listened");
        connectionRef?.current?.destroy();
      }
      setCallAccepted(false);

      // setUpMedia();
    });

    socket.on("end call, other caller disconnected", callId => {
      setShow(false);
      console.log("end call, other caller disconnected");
      socket.emit("leave call", callId);

      // setCall({
      //   ...call,
      //   callEnded: true,
      //   receiveingCall: false
      // });

      setCall({
        socketId: "",
        receiveingCall: false,
        callEnded: false,
        name: "",
        picture: "",
        signal: "",
        callerId: "",
        calleeId: "",
        callId: ""
      });

      if (callAccepted) {
        console.log("end call listened");
        connectionRef?.current?.destroy();
      }
      setCallAccepted(false);
    });
  }, []);

  // callUser function
  const callUser = () => {
    enableMedia();
    const callId = uuidv4();
    console.log("callId: ", callId);
    setCall({
      ...call,
      callEnded: false,
      name: getConversationName(user, activeConversation.users),
      picture: getConversationPicture(user, activeConversation.users),
      callerId: user._id,
      calleeId: getConversationId(user, activeConversation.users),
      callId: callId
    });

    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: stream
    });

    peer.on("signal", data => {
      socket.emit("call user", {
        userToCall: getConversationId(user, activeConversation.users),
        signal: data,
        from: socketId,
        name: user.name,
        picture: user.picture,
        callerId: user._id,
        calleeId: getConversationId(user, activeConversation.users),
        callId: callId
      });
    });

    peer.on("stream", stream => {
      console.log("stream: ", stream);
      userVideo.current.srcObject = stream;
    });
    connectionRef.current = peer;

    peer.on("error", err => {
      console.log("err: ", err);
    });

    socket.on("call accepted", signal => {
      console.log("call accepted listened");
      setCallAccepted(true);
      peer.signal(signal);
    });

    peer.on("close", () => {
      socket.off("call accepted");
    });
  };

  const answerCall = () => {
    enableMedia();
    setCallAccepted(true);

    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: stream
    });

    peer.on("signal", data => {
      socket.emit("answer call", {
        signal: data,
        to: call.socketId,
        callerId: call.callerId,
        calleeId: call.calleeId,
        callId: call.callId
      });
    });

    peer.on("stream", stream => {
      userVideo.current.srcObject = stream;
      console.log("answerCall stream");
    });

    peer.signal(call.signal);

    peer.on("error", err => {
      console.log("err: ", err);
    });
    connectionRef.current = peer;
  };

  // end call function
  const endCall = () => {
    setShow(false);
    setCallAccepted(false);
    // setCall({
    //   ...call,
    //   callEnded: true,
    //   receiveingCall: false
    // });

    myVideo.current.srcObject = null;

    if (call.callerId === user._id) {
      socket.emit("end call", {
        participant: call.calleeId,
        callId: call.callId
      });
    } else {
      socket.emit("end call", {
        participant: call.callerId,
        callId: call.callId
      });
    }

    setCall({
      socketId: "",
      receiveingCall: false,
      callEnded: false,
      name: "",
      picture: "",
      signal: "",
      callerId: "",
      calleeId: "",
      callId: ""
    });
    connectionRef?.current?.destroy();
    // setUpMedia();
    console.log("endCall emitted");
  };

  const setUpMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        setStream(stream);
      });
  };

  const enableMedia = () => {
    myVideo.current.srcObject = stream;
    setShow(true);
  };

  // join user into the socket.io
  useEffect(() => {
    socket.emit("join", user._id);
    socket.on("get-online-users", users => {
      console.log("online users", users);
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user, dispatch]);

  // Listening to received messages
  useEffect(() => {
    socket.on("receive message", message => {
      console.log("message received ", message);
      dispatch(updateMessagesAndConversations(message));
    });
  }, []);

  return (
    <div className="relative h-screen dark:bg-dark_bg_1  justify-center overflow-hidden">
      <div className=" h-screen flex items w-full">
        <Sidebar onlineUsers={onlineUsers} />
        {activeConversation?._id ? (
          <ChatContainer onlineUsers={onlineUsers} callUser={callUser} />
        ) : (
          <WhatsappHome />
        )}
        <div
          className={(show || call.signal) && !call.callEnded ? "" : "hidden"}
        >
          <Call
            call={call}
            onSetCall={setCall}
            callAccepted={callAccepted}
            userVideo={userVideo}
            myVideo={myVideo}
            stream={stream}
            answerCall={answerCall}
            show={show}
            endCall={endCall}
            totalSecsInCall={totalSecsInCall}
            setTotalSecsInCall={setTotalSecsInCall}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
