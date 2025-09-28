import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      ".ngrok.io",
      ".ngrok-free.app",
      ".ngrok.app",
      "4630af237ae1.ngrok-free.app"
    ],
    hmr: {
      port: 5173,
    }
  },
  build: {
    outDir: "dist",
    sourcemap: true
  }
});
