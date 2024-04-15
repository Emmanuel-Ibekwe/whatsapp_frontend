import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { logout } from "./store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { getTokenDuration } from "./utils/auth";
import SocketContext from "./context/SocketContext";
import { sendMessage } from "./store/chatSlice";

const socket = io(process.env.REACT_APP_API_ENDPOINT.split("/api/v1")[0]);

const ctxValue = {
  socket
};
function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { token } = user;

  useEffect(() => {
    const duration = getTokenDuration();

    if (duration < 0) {
      dispatch(logout());
    }
  }, []);

  return (
    <SocketContext.Provider value={ctxValue}>
      <div className="dark">
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={token ? <Home /> : <Navigate to="/login" />}
            />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={token ? <Home /> : <Login />} />
          </Routes>
        </Router>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
