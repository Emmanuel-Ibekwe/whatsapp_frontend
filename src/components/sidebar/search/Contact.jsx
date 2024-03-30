import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { open_create_conversation } from "../../../store/chatSlice";
import SocketContext from "../../../context/SocketContext";
import BoldedText from "../../../UI/BoldText";

export default function Contact({ contact, searchInput }) {
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { token } = user;

  const values = {
    receiver_id: contact._id,
    token,
    isGroup: false
  };
  const openConversation = async () => {
    const activeConvo = await dispatch(open_create_conversation(values));
    socket.emit("join conversation", activeConvo.payload._id);
  };
  return (
    <li
      onClick={() => openConversation()}
      className="relative list-none h-[72px] hover:dark:dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px] pt-[10px]"
    >
      <div className="flex items-center gap-x-3">
        {/*Conversation user picture*/}
        <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
          <img
            src={contact.picture}
            alt={contact.name}
            className="w-full h-full object-cover "
          />
        </div>
        {/*Conversation name and message*/}
        <div className="w-full flex flex-col">
          {/*Conversation name*/}
          <h1 className=" flex items-center gap-x-2">
            <BoldedText text={contact.name} shouldBeBold={searchInput} />
          </h1>
          <div className="flex items-center gap-x-1 dark:text-dark_text_2">
            <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
              <p>{contact.status}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 ml-16 border-b dark:border-b-dark_border_1 w-full"></div>
    </li>
  );
}
