// import React from "react";
// import { createRoot } from "react-dom/client";
// import ChatWidget from "./index"; // your existing ChatWidget
// import "./ChatWidget.css"; // import widget CSS

// // Mount widget when page fully loads
// window.addEventListener("load", () => {
//   if (document.getElementById("bike-chat-widget-container")) return;

//   const container = document.createElement("div");
//   container.id = "bike-chat-widget-container";
//   document.body.appendChild(container);

//   const root = createRoot(container);
//   root.render(<ChatWidget />);
// });

import React from "react";
import { createRoot } from "react-dom/client";
import ChatWidget from "./index";
import "./ChatWidget.css";

// Function to initialize or update the widget
const initializeWidget = () => {
  let container = document.getElementById("bike-chat-widget-container");

  // If container doesn't exist, create it
  if (!container) {
    container = document.createElement("div");
    container.id = "bike-chat-widget-container";
    document.body.appendChild(container);
  }

  // If container is empty or not yet rendered, render the widget
  if (!container.hasChildNodes()) {
    const root = createRoot(container);
    root.render(<ChatWidget />);
  }
};

// Run immediately and listen for SPA navigation
setTimeout(initializeWidget, 0);

// Listen for SPA navigation events (e.g., React Router, history API)
window.addEventListener("popstate", initializeWidget);
window.addEventListener("pushstate", initializeWidget);
window.addEventListener("replacestate", initializeWidget);

// Custom event for SPA frameworks to trigger widget recheck
window.addEventListener("widget-recheck", initializeWidget);