import { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getConversations } from "../store/chatSlice";
import WhatsappHome from "../components/Chat/WhatsappHome";
import ChatContainer from "../components/Chat/ChatContainer";

function Home() {
  const { user } = useSelector(state => state.user);
  const { activeConversation } = useSelector(state => state.chat);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user, dispatch]);

  return (
    <div className="relative h-screen dark:bg-dark_bg_1  justify-center overflow-hidden">
      <div className=" h-screen flex items w-full">
        <Sidebar />
        {activeConversation?._id ? <ChatContainer /> : <WhatsappHome />}
      </div>
    </div>
  );
}

export default Home;
