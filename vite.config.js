import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // hls.js is ~500 kB minified; it's split into its own chunk and lazily
    // loaded only when an HLS camera tile is rendered, so the warning is benign.
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          hls: ["hls.js"],
        },
      },
    },
  },
});
