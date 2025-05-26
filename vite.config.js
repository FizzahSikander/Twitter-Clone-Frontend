import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setupTests.js",
    exclude: ["node_modules", "tests", "tests-examples"]
  },
  define: {
    __BASE_URL__: JSON.stringify("http://localhost:3000"),
  },
});
