import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 3000,
  },
  build: {
    outDir: path.resolve(__dirname, "../backend/public"),
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "wouter", "@tanstack/react-query"],
          "ui-vendor": [
            "framer-motion",
            "lucide-react",
            "@radix-ui/react-dialog",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-toast",
          ],
          "chart-vendor": ["recharts"],
        },
      },
    },
  },
});
