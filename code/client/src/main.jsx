/* ---------------------------------------------------------------------------
Main.jsx
This is our main component that is the main entry point of our application
------------------------------------------------------------------------------ */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { BrowserRouter } from "react-router-dom";
import { GlobalNotificationListener } from "../src/components/index.components.js";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer />
        <GlobalNotificationListener />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
