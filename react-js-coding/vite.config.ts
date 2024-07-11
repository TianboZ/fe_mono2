import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pages from "vite-plugin-react-pages";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    pages({
      pagesDir: path.join(__dirname, "pages"),
    }),
  ],
});
