import moment from "moment";
import { dateHandler } from "../../../utils/date";

export default function Conversation({ convo }) {
  // console.log(moment(convo.latestMessage.createdAt));
  // console.log(dateHandler(convo.latestMessage.createdAt));

  return (
    <li className="h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 dark:text-dark_text_1 px-[10px]">
      <div className="relative w-full flex items-center justify-between py-[10px]">
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
              <h1 className="font-bold flex items-center gap-x-2 text-xl">
                {convo.name}
              </h1>
              <span className="dark:text-dark_text_2 text-sm">
                {dateHandler(convo.latestMessage.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-x-1 dark:text-dark_text_2">
              <p>{convo.latestMessage?.message}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-x-3">
        <div className="w-[50px]"></div>
        <div className="w-full border-b dark:border-b-dark_border_1"></div>
      </div>
    </li>
  );
}
