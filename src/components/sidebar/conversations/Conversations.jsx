import { useSelector } from "react-redux";
import Conversation from "./Conversation";
import {
  sortInDescendingLatestMessageTime,
  getConversationId
} from "../../../utils/chat";

export default function Conversations({ onlineUsers }) {
  const { conversations, activeConversation } = useSelector(
    state => state.chat
  );
  const { user } = useSelector(state => state.user);
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
          sortedConversations.map(convo => {
            let check = onlineUsers.find(
              u => u.userId === getConversationId(user, convo.users)
            );
            return (
              <Conversation
                convo={convo}
                key={convo._id}
                online={check ? true : false}
              />
            );
          })}
      </ul>
    </div>
  );
}
