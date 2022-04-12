import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
