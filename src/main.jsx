import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import AuthContextProvider from "./contexts/AuthContext.jsx";
import ApiDataContext from "./contexts/ApiDataContext.jsx";

import "./index.css";
import "sweetalert2/src/sweetalert2.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <AuthContextProvider>
    <ApiDataContext>
      <App />
    </ApiDataContext>
  </AuthContextProvider>
  //</React.StrictMode>
);
