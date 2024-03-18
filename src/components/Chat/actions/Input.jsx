import { useState, useContext } from "react";
import { useSelector } from "react-redux";
import SocketContext from "../../../context/SocketContext";

let typingTimeout = setTimeout(() => {}, 1000);

export default function Input({ message, onSetMessage, textRef }) {
  const { activeConversation } = useSelector(state => state.chat);
  const { socket } = useContext(SocketContext);
  const [typing, setTyping] = useState(false);
  const onChangeHandler = e => {
    onSetMessage(e.target.value);
    socket.emit("typing", activeConversation._id);

    // Clear previous timeout
    clearTimeout(typingTimeout);
    // Set a timeout to determine when typing stops
    typingTimeout = setTimeout(() => {
      socket.emit("stop typing", activeConversation._id);
    }, 1000);
  };

  const onBlurHandler = () => {
    socket.emit("stop typing", activeConversation._id);
  };

  return (
    <div className="w-full">
      <input
        type="text"
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full rounded-lg pl-4"
        placeholder="type a message"
        onChange={onChangeHandler}
        value={message}
        ref={textRef}
        onBlur={onBlurHandler}
      />
    </div>
  );
}
