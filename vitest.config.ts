/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";
import react from "@vitejs/plugin-react";

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
    },
  })
);
