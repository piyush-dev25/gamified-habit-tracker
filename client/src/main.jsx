import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

// Auto-recover from stale cached assets (white screen fix)
window.addEventListener(
  "error",
  (e) => {
    const target = e.target;
    if (
      target &&
      (target.tagName === "SCRIPT" || target.tagName === "LINK")
    ) {
      console.warn("Asset failed to load. Reloading...");
      window.location.reload();
    }
  },
  true
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
