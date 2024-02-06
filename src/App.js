import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { logout } from "./store/userSlice";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector(state => state.user);
  const { token } = user;
  console.log(token);
  console.log(user);

  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={token ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/signup"
            element={!token ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/login"
            element={!token ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
