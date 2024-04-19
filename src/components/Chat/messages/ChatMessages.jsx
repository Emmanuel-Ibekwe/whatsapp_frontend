import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import { sameDay } from "../../../utils/date";
import FileMessage from "./files/FileMessage";

export default function ChatMessages() {
  const { messages } = useSelector(state => state.chat);
  const { user } = useSelector(state => state.user);
  const endRef = useRef();
  console.log(messages);
  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behaviour: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function mapMessages(message, i, arr) {
    let setCornerTriangle, showDate, showSenderPicture;
    // console.log("message_id", message._id);
    if (i <= 0 || message.sender._id !== arr[i - 1]?.sender._id) {
      setCornerTriangle = true;
      showSenderPicture = true;
    } else {
      setCornerTriangle = false;
      showSenderPicture = false;
    }

    const currentMessageDate = new Date(message.updatedAt);
    const dateofMsgBeforeCurMsg = new Date(arr[i - 1]?.updatedAt);

    if (i <= 0 || !sameDay(currentMessageDate, dateofMsgBeforeCurMsg)) {
      showDate = true;
      setCornerTriangle = true;
    } else {
      showDate = false;
    }

    return (
      <>
        {message.files.length > 0
          ? message.files.map(file => (
              <FileMessage
                filePayload={file}
                message={message}
                key={message._id}
                me={user._id === message.sender._id}
                setCornerTriangle={setCornerTriangle}
                showDate={showDate}
                showSenderPicture={showSenderPicture}
              />
            ))
          : null}
        {message.message.length > 0 ? (
          <Message
            message={message}
            key={message._id}
            me={user._id === message.sender._id}
            setCornerTriangle={setCornerTriangle}
            showSenderPicture={showSenderPicture}
            showDate={showDate}
          />
        ) : null}
      </>
    );
  }

  return (
    <div className="w-full bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat">
      <div className="w-full scrollbar overflow_scrollbar overflow-auto py-2 px-[6%]">
        {messages && messages.map(mapMessages)}
        <div ref={endRef}></div>
      </div>
    </div>
  );
}
