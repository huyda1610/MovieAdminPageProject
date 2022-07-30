import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Component Provider dùng để kết nối redux store với react component
import { Provider } from "react-redux";
import store from "./configStore";
import "./GlobalStyle.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
