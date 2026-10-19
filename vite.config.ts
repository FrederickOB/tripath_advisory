import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import sitemap from "./plugins/sitemap";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sitemap()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "dist/**"],
  },
});
