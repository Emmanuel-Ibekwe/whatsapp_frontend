import { useState, useRef, useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import SocketContext from "../../../context/SocketContext";
import EmojiPickerButton from "./EmojiPickerButton";
import Attachments from "./attachments/Attachments";
import Input from "./Input";
import { SendIcon } from "../../../svg";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../store/chatSlice";

export default function ChatActions() {
  const { socket } = useContext(SocketContext);
  const [showPicker, setShowPicker] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);
  const { activeConversation, status } = useSelector(state => state.chat);

  const textRef = useRef();
  const { token } = user;
  const dispatch = useDispatch();

  const values = {
    message,
    token,
    files: [],
    convo_id: activeConversation._id
  };

  const sendMessageHandler = async e => {
    e.preventDefault();
    setLoading(true);
    let newMessage = await dispatch(sendMessage(values));
    socket.emit("send message", newMessage.payload);
    setMessage("");
    setLoading(false);
  };

  return (
    <form
      onSubmit={sendMessageHandler}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2m px-4 select-none"
    >
      <div className="w-full flex items-center gap-x-2">
        <ul className="flex gap-x-2">
          <EmojiPickerButton
            textRef={textRef}
            onSetMessage={setMessage}
            message={message}
            onSetShowPicker={setShowPicker}
            onSetShowAttachments={setShowAttachments}
            showPicker={showPicker}
          />
          <Attachments
            showAttachments={showAttachments}
            onSetShowAttachments={setShowAttachments}
            onSetShowPicker={setShowPicker}
          />
        </ul>
        <Input onSetMessage={setMessage} message={message} textRef={textRef} />
        <button type="submit" className="btn" disabled={message.trim() === ""}>
          {loading && status === "loading" ? (
            <ClipLoader color="#e9edef" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
}
