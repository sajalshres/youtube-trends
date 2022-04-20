import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "^/api": {
        target: "https://dev.sajalshres.com",
        changeOrigin: true,
        rewrite: (path) => {
          console.log(path);
          return path;
        },
        secure: false,
      },
    },
  },
});
