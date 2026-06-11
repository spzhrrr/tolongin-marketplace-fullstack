import "./styles/main.css";
import { bootstrap } from "./app/App.js";
import "./shared/utils/ws.js";

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}
