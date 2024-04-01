import { useEffect, useContext, useState, useRef } from "react";
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

const callData = {
  receivingCall: true,
  callEnded: false
};

function Home() {
  const { user } = useSelector(state => state.user);
  const { activeConversation } = useSelector(state => state.chat);
  const dispatch = useDispatch();
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { socket } = useContext(SocketContext);

  const [call, setCall] = useState(callData);
  const [stream, setStream] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const myVideo = useRef();
  const userVideo = useRef();

  // Visibilitychange
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("Visibilitychange: socket disconnected");
        socket.connect();
      } else {
        socket.connect();
        console.log("Visibilitychange: socket connected");
        socket.emit("join", user._id);
        socket.on("get-online-users", users => {
          setOnlineUsers(users);
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

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
          <ChatContainer onlineUsers={onlineUsers} />
        ) : (
          <WhatsappHome />
        )}
        <Call
          call={call}
          onSetCall={setCall}
          callAccepted={callAccepted}
          userVideo={userVideo}
          myVideo={myVideo}
          stream={stream}
        />
      </div>
    </div>
  );
}

export default Home;
