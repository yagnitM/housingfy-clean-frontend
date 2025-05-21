import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // Ensure BrowserRouter is imported
import App from "./App";  // Import the App component
import "./styles.css";  // Assuming you have styles.css for your project

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>  {/* Wrapping App with BrowserRouter here */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
