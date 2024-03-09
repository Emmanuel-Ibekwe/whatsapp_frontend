import { useEffect, useState, useContext } from "react";
import moment from "moment";
import { dateHandler } from "../../../utils/date";
import {
  open_create_conversation,
  setActiveConversation
} from "../../../store/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversationId,
  getConversationPicture,
  getConversationName
} from "../../../utils/chat";
import SocketContext from "../../../context/SocketContext";

export default function Conversation({ convo }) {
  const { socket } = useContext(SocketContext);
  const [activeConvo, setActiveConvo] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { activeConversation } = useSelector(state => state.chat);
  const { token } = user;
  console.log(convo);

  useEffect(() => {
    if (convo._id === activeConversation._id) {
      setActiveConvo(true);
    } else {
      setActiveConvo(false);
    }
  }, [activeConversation]);

  const values = {
    receiver_id: getConversationId(user, convo.users),
    token,
    isGroup: convo.isGroup ? convo._id : false
  };
  const openConversation = async () => {
    // const res = await dispatch(open_create_conversation(values));
    // console.log(res);
    const currentConvo = await dispatch(setActiveConversation(convo));
    socket.emit("join conversation", currentConvo.payload._id);
  };

  // const date = new Date(convo?.latestMessage?.createdAt);
  // console.log(date.getTime());
  // console.log(dateHandler(convo?.latestMessage?.createdAt));

  return (
    <>
      {convo?.latestMessage && (
        <li
          onClick={() => openConversation()}
          className={`w-full ${
            activeConvo ? "dark:bg-dark_bg_5" : "dark:bg-dark_bg_1"
          }    dark:text-dark_text_1  cursor-pointer`}
        >
          <div
            className={`h-[72px] relative w-full flex items-center justify-between py-[10px] px-[10px] hover:dark:bg-dark_bg_2 `}
          >
            <div className="flex items-center gap-x-3 w-full">
              <div className="min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
                <img
                  src={getConversationPicture(user, convo.users)}
                  alt={getConversationName(user, convo.users)}
                  className=" object-cover w-full h-full"
                />
              </div>
              <div className="w-full flex flex-col w-full ">
                <div className="flex items-baseline justify-between  mt-0">
                  <h1 className="font-normal flex items-center gap-x-2 text-lg">
                    {getConversationName(user, convo.users)}
                  </h1>
                  <span className="dark:text-dark_text_2 text-xs">
                    {dateHandler(convo?.latestMessage?.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-x-1 dark:text-dark_text_2 text-sm">
                  <p>
                    {convo?.latestMessage?.message.length > 50
                      ? `${convo?.latestMessage?.message.substring(0, 50)}...`
                      : convo?.latestMessage?.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full gap-x-3">
            <div className="w-[50px]"></div>
            <div className="w-full border-b dark:border-b-dark_border_1"></div>
          </div>
        </li>
      )}
    </>
  );
}
