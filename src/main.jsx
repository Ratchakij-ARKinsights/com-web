import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import AuthContextProvider from "./contexts/AuthContext";

import "./index.css";
import "sweetalert2/src/sweetalert2.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  // </React.StrictMode>
);
