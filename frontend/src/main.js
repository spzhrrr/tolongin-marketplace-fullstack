import "./styles/main.css";
import { bootstrap } from "./app/App.js";
<<<<<<< HEAD
import "./shared/utils/ws.js";

=======
import "./shared/utils/ws.js"; // auto-connect WebSocket saat pengguna terautentikasi

// Bootstrap aplikasi tepat satu kali (hindari render & listener ganda).
>>>>>>> ec26484 (implementasi demo)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}
