import { useSelector } from "react-redux";
import Conversation from "./Conversation";

export default function Conversations() {
  const { conversations } = useSelector(state => state.chat);
  return (
    <div className="convos scrollbar">
      <ul className="list-none">
        {conversations &&
          conversations.map(convo => (
            <Conversation convo={convo} key={convo._id} />
          ))}
      </ul>
    </div>
  );
}
