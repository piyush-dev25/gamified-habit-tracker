import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import About from "./pages/About";
import Settings from "./pages/Settings";

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          token ? <Navigate to="/dashboard" /> : <Home />
        }
      />
      <Route
        path="/login"
        element={token ? <Navigate to="/dashboard" /> : <Login />}
      />

      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          token ? <Dashboard /> : <Navigate to="/" />
        }
      />
      <Route path="/about" element={<About />} />
      <Route
        path="/settings"
        element={token ? <Settings /> : <Navigate to="/" />}
      />

    </Routes>
  );
}

export default App;
