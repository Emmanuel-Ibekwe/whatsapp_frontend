import { useSelector } from "react-redux";
import Conversation from "./Conversation";
import { sortInDescendingLatestMessageTime } from "../../../utils/chat";

export default function Conversations() {
  const { conversations, activeConversation } = useSelector(
    state => state.chat
  );
  console.log(conversations);
  const filteredConvos = conversations.filter(
    c => c.latestMessage || c._id === activeConversation._id
  ); // This filters out conversations opened without any message(latestMessage)
  const sortedConversations = sortInDescendingLatestMessageTime([
    ...filteredConvos
  ]);
  console.log(sortedConversations);
  return (
    <div className="convos scrollbar">
      <ul className="list-none">
        {sortedConversations &&
          sortedConversations.map(convo => (
            <Conversation convo={convo} key={convo._id} />
          ))}
      </ul>
    </div>
  );
}
