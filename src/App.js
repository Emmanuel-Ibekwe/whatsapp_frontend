import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { logout } from "./store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { getTokenDuration } from "./utils/auth";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { token } = user;
  console.log(token);
  console.log(user);

  useEffect(() => {
    const duration = getTokenDuration();

    if (duration < 0) {
      dispatch(logout());
    }
  }, []);

  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={token ? <Home /> : <Navigate to="/login" />}
          />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
