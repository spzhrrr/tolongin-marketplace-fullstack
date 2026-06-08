import "./styles/main.css";
import { bootstrap } from "./app/App.js";
import "./shared/utils/ws.js"; // auto-connect WebSocket when authenticated

document.addEventListener("DOMContentLoaded", bootstrap);
if (document.readyState !== "loading") bootstrap();
