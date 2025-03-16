import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  // Load env variables from .env files in root directory
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react()],
    server: { port: env.VITE_PORT || 5173 }, // Default to 5173 if VITE_PORT is not set
    build: {
      outDir: "dist", // Render requires the output directory to be "dist"
      emptyOutDir: true, // Clears old files before building new ones
    },
    define: {
      "process.env": env, // Ensures VITE_BACKEND_URL is available
    },
    base: "/", // Ensure correct paths for deployment
  });
};
