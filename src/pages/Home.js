import { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getConversations } from "../store/chatSlice";
import WhatsappHome from "../components/Chat/WhatsappHome";

function Home() {
  const { user } = useSelector(state => state.user);
  const { activeConversation } = useSelector(state => state.chat);
  console.log("activeConversation", activeConversation);
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
        {activeConversation?._id ? "Home" : <WhatsappHome />}
      </div>
    </div>
  );
}

export default Home;
