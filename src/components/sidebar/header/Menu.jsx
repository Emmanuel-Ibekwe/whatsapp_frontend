import { useContext } from "react";
import { useDispatch } from "react-redux";
import SocketContext from "../../../context/SocketContext";
import { logout } from "../../../store/userSlice";

export default function Menu() {
  const { socket } = useContext(SocketContext);

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    socket.disconnect();
  };

  return (
    <div className="absolute right-1 z-50 dark:bg-dark_bg_4 dark:text-dark_text_1 shadow-md w-64 rounded-sm text-left border-b border-b-dark_bg_2">
      <ul>
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>New Group</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>New Community</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Starred Messages</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Select Chat</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Settings</span>
        </li>
        <li
          className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3"
          onClick={() => logoutHandler()}
        >
          <span>Log out</span>
        </li>

        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3 border-t dark:border-t-dark_border_2">
          <span>Get Whatsapp for Windows</span>
        </li>
      </ul>
    </div>
  );
}
