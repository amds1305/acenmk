
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./lib/animations.css";

// Find the root element where React will mount the app
const rootElement = document.getElementById("root");

// Only render if the root element exists
if (rootElement) {
  // Create a React root
  const root = ReactDOM.createRoot(rootElement);
  
  // Render the app
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found!");
}
