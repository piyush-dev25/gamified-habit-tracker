import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          token ? <Navigate to="/dashboard" /> : <Login />
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

    </Routes>
  );
}

export default App;
