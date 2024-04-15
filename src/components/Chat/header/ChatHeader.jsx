import { useContext, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import {
  SearchLargeIcon,
  DotsIcon,
  VideoCallIcon,
  CallIcon
} from "../../../svg";
import SocketContext from "../../../context/SocketContext";
import {
  getConversationPicture,
  getConversationName
} from "../../../utils/chat";

export default function ChatHeader({ online, callUser }) {
  const [isTyping, setIsTyping] = useState(false);
  const { socket } = useContext(SocketContext);
  const { activeConversation } = useSelector(state => state.chat);
  const { user } = useSelector(state => state.user);
  const { name, picture } = activeConversation;

  useEffect(() => {
    socket.on("started typing", conversation => {
      if (activeConversation._id === conversation) {
        setIsTyping(true);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("stopped typing", conversation => {
      if (activeConversation._id === conversation) {
        setIsTyping(false);
      }
    });
  });

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
            {isTyping ? (
              <span className="text-sm text-dark_svg_2">typing...</span>
            ) : online ? (
              <span className="text-sm text-dark_svg_2">online</span>
            ) : (
              ""
            )}
          </div>
        </div>
        <ul className="flex items-center gap-x-2.5">
          <li onClick={() => callUser()}>
            <button className="btn">
              <VideoCallIcon />
            </button>
          </li>
          <li>
            <button className="btn">
              <CallIcon />
            </button>
          </li>
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
