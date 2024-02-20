import moment from "moment";
import { dateHandler } from "../../../utils/date";
import {
  open_create_conversation,
  setActiveConversation
} from "../../../store/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { getConversationId } from "../../../utils/chat";

export default function Conversation({ convo }) {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { token } = user;
  console.log(convo);

  const values = {
    receiver_id: getConversationId(user, convo.users),
    token,
    isGroup: convo.isGroup ? convo._id : false
  };
  const openConversation = async () => {
    // const res = await dispatch(open_create_conversation(values));
    // console.log(res);
    dispatch(setActiveConversation(convo));
  };

  console.log(convo?.latestMessage?.createdAt);
  console.log(dateHandler(convo?.latestMessage?.createdAt));

  return (
    <>
      {convo?.latestMessage && (
        <li
          onClick={() => openConversation()}
          className=" w-full dark:bg-dark_bg_1   dark:text-dark_text_1  cursor-pointer"
        >
          <div className="h-[85px] relative w-full flex items-center justify-between py-[10px] px-[10px] hover:dark:bg-dark_bg_2">
            <div className="flex items-center gap-x-3 w-full">
              <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png"
                  alt={convo.name}
                  className=" object-cover"
                />
              </div>
              <div className="w-full flex flex-col w-full ">
                <div className="flex items-baseline justify-between  mt-0">
                  <h1 className="font-semibold flex items-center gap-x-2 text-2xl">
                    {convo.name}
                  </h1>
                  <span className="dark:text-dark_text_2 text-sm">
                    {dateHandler(convo?.latestMessage?.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-x-1 dark:text-dark_text_2 text-lg">
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
