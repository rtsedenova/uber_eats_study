import { resolve } from "path";
import path from "path";
import { defineConfig } from "vite";
import { ViteAliases } from "vite-aliases";
import { fileURLToPath } from "url";
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import glob from "fast-glob";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  build: {
    outDir: "build",
    rollupOptions: {
      // input: {
      //   main: resolve(__dirname, "index.html"),
      //   restDetails: resolve(__dirname, "pages/restDetails.html"),
      // },
      input: Object.fromEntries(
        glob
          .sync(["./*.html", "./pages/**/*.html"])
          .map((file) => [
            path.relative(
              __dirname,
              file.slice(0, file.length - path.extname(file).length)
            ),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
    },
  },
  server: {
    // port: 3000,
    // host: "0.0.0.0",
    // hmr: true,
    // open: "/index.html",
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [
    ViteImageOptimizer({
      png: {
        quality: 70,
      },
      jpeg: {
        quality: 70,
      },
      jpg: {
        quality: 70,
      },
    }),
    ViteAliases(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    {
      ...imagemin(["./src/img/**/*.{jpg,png,jpeg}"], {
        destination: "./src/img/webp/",
        plugins: [imageminWebp({ quality: 70 })],
      }),
      apply: "serve",
    },
  ],
});
