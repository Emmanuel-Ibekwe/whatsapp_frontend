import { useState, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import EmojiPickerButton from "./EmojiPickerButton";
import Attachments from "./Attachments";
import Input from "./Input";
import { SendIcon } from "../../../svg";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../store/chatSlice";

export default function ChatActions() {
  const [message, setMessage] = useState("");
  const { user } = useSelector(state => state.user);
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
    await dispatch(sendMessage(values));
    setMessage("");
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
          />
          <Attachments />
        </ul>
        <Input onSetMessage={setMessage} message={message} textRef={textRef} />
        <button type="submit" className="btn">
          {status === "loading" ? (
            <ClipLoader color="#e9edef" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
}
