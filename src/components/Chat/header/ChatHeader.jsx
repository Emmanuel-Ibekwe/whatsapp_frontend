import { useSelector } from "react-redux";
import { SearchLargeIcon, DotsIcon } from "../../../svg";

export default function ChatHeader() {
  const { activeConversation } = useSelector(state => state.chat);
  const { name, picture } = activeConversation;

  return (
    <div className="h-[50px] dark:bg-dark_bg_2 flex items-center p16 select-none">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <button className="btn w-[50px] h-[50px] ">
            <img
              src={
                "https://res.cloudinary.com/dawmodxmu/image/upload/v1708172938/cht6gou1klhstx7mzq3r.jpg"
              }
              alt={`${name} picture`}
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          <div className="flex flex-col">
            <h1 className="dark:text-[#e9edef] text-xl tracking-wide  font-bold">
              {name}
            </h1>
            <span className="text-md text-dark_svg_2">online</span>
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
