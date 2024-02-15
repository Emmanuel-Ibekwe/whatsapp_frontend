import { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getConversations } from "../store/chatSlice";

function Home() {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user, dispatch]);

  return (
    <div className="relative min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      <div className="container min-h-screen flex">
        <Sidebar />
      </div>
    </div>
  );
}

export default Home;
