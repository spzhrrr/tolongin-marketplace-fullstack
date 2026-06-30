import "./styles/main.css";
import "./styles/premium-borderless.css";
import "./styles/navbar-v2.css";
import "./styles/notifications.css";
import "./styles/auth-pages.css";
import "./styles/account-pages.css";
import "./styles/hero-landing.css";
import { bootstrap } from "./app/App.js";
import "./shared/utils/ws.js"; // chat WebSocket
import "./shared/utils/notifications-ws.js"; // notifications WebSocket (persistent hub)

// Bootstrap aplikasi tepat satu kali (hindari render & listener ganda).
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}
