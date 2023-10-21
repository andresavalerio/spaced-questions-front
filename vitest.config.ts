/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [react(), tsConfigPaths()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setup.ts",
    },
  })
);
