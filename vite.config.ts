import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import monkey, { cdn } from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: "src/main.ts",
      userscript: {
        namespace: "Velocita/torrent-download-helper",
        version: "0.1.0",
        author: "Velocita",
        match: ["https://share.dmhy.org/", "https://nyaa.si/"],
        description:
          "Support batch select and copy magnet link in torrent site",
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr("Vue", "dist/vue.global.prod.js"),
        },
        autoGrant: true,
      },
    }),
  ],
});
