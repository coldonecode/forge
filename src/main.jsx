import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Ask Android/Chrome to never auto-delete our stored data (plans, logs)
if ("storage" in navigator && navigator.storage?.persist) {
  navigator.storage.persist().catch(() => {});
}

// PWA: register the service worker (silently skipped on insecure origins)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}
