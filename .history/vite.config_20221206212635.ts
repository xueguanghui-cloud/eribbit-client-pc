import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import resolveExternalsPlugin from "vite-plugin-resolve-externals";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      // 全局样式引入
      scss: {
        additionalData: '@import "./src/assets/style/variables.scss";',
        javascriptEnable: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
