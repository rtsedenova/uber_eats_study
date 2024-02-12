import { resolve } from "path";
import { defineConfig } from "vite";
import { ViteAliases } from "vite-aliases";
import legacy from "@vitejs/plugin-legacy";

// import pages from "./vitejs/pages.config";

// const pagesInput = {};

// pages.forEach((page) => {
//   pagesInput[page.name] = page.path;
// });

export default defineConfig({
  build: {
    // target: "es2017",
    outDir: "build",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        restDetails: resolve(__dirname, "pages/restDetails.html"),

        // ...pagesInput,
      },
    },
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    hmr: true,
    open: "/index.html",
  },
  plugins: [
    ViteAliases(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
});
