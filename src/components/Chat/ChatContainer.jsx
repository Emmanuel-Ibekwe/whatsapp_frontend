import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import ChatActions from "./actions/ChatActions";
import { getConversationMessages } from "../../store/chatSlice";
import { getConversationId } from "../../utils/chat";
import FilesPreview from "./preview/FilesPreview";

export default function ChatContainer({ onlineUsers, callUser }) {
  const dispatch = useDispatch();
  const { activeConversation, files } = useSelector(state => state.chat);
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
        <ChatHeader
          callUser={callUser}
          online={onlineUsers.find(u =>
            u.userId === getConversationId(user, activeConversation.users)
              ? true
              : false
          )}
        />
        {files.length > 0 ? (
          <FilesPreview />
        ) : (
          <>
            <ChatMessages />
            <ChatActions />
          </>
        )}
      </div>
    </div>
  );
}
