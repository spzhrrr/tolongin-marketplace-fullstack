import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    root: ".",
    publicDir: "public",
    build: {
      outDir: "dist",
      assetsDir: "assets",
      rollupOptions: {
        input: "./index.html",
      },
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
      strictPort: true,
      hmr: { clientPort: 443, protocol: "wss" },
      allowedHosts: true,
      watch: { usePolling: true },
    },
    define: {
      "import.meta.env.VITE_BACKEND_URL": JSON.stringify(
<<<<<<< HEAD
        env.VITE_BACKEND_URL || env.REACT_APP_BACKEND_URL || "",
=======
        env.VITE_BACKEND_URL || env.REACT_APP_BACKEND_URL || "http://localhost:8001",
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
      ),
    },
  };
});
