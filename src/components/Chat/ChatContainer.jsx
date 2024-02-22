import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import { getConversationMessages } from "../../store/chatSlice";

export default function ChatContainer() {
  const dispatch = useDispatch();
  const { activeConversation, messages } = useSelector(state => state.chat);
  const { user } = useSelector(state => state.user);
  const { token } = user;

  const values = {
    convo_id: activeConversation?._id,
    token
  };
  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);

  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden">
      <div>
        <ChatHeader />
        <ChatMessages />
      </div>
    </div>
  );
}
