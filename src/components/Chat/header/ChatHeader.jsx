import { useSelector } from "react-redux";
import { SearchLargeIcon, DotsIcon } from "../../../svg";
import {
  getConversationPicture,
  getConversationName
} from "../../../utils/chat";

export default function ChatHeader() {
  const { activeConversation } = useSelector(state => state.chat);
  const { user } = useSelector(state => state.user);
  const { name, picture } = activeConversation;

  return (
    <div className="h-[60px] dark:bg-dark_bg_2 flex items-center p16 select-none">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <button className="btn ">
            <img
              src={getConversationPicture(user, activeConversation.users)}
              alt={`${name} picture`}
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          <div className="flex flex-col">
            <h1 className="dark:text-[#e9edef] text-md tracking-wide  font-bold">
              {getConversationName(user, activeConversation.users)}
            </h1>
            <span className="text-sm text-dark_svg_2">online</span>
          </div>
        </div>
        <ul className="flex items-center gap-x-2.5">
          <li>
            <button className="btn">
              <SearchLargeIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
