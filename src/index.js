import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./styles/index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// @material-tailwind/react
import { ThemeProvider } from "@material-tailwind/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
    <ToastContainer autoClose="1500" position="top-center" />
  </React.StrictMode>
);
