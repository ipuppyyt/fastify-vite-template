import react from '@vitejs/plugin-react-swc';
import tailwindcss from "@tailwindcss/vite";
import config from './shared/config';
import logger from './shared/logger';
import { defineConfig } from 'vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  cacheDir: path.resolve(__dirname, "node_modules/.vite"),
  customLogger: logger,
  base: './',
  root: 'client',
  build: {
    outDir: path.resolve(__dirname, "build/client"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
  },
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": "http://localhost:" + config.server.port,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@config": path.resolve(__dirname, "./config/config.ts"),
    },
  },
});
