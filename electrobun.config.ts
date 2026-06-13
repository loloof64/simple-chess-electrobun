import type { ElectrobunConfig } from "electrobun";

export default {
  app: {
    name: "simple-chess",
    identifier: "simple-chess.electrobun.dev",
    version: "0.0.4",
  },
  runtime: {
    exitOnLastWindowClosed: true,
  },
  build: {
    // Vite builds to dist/, we copy from there
    copy: {
      "dist/index.html": "views/mainview/index.html",
      "dist/assets": "views/mainview/assets",
    },
    // Ignore Vite output in watch mode — HMR handles view rebuilds separately
    watchIgnore: ["dist/**"],
    mac: {
      bundleCEF: false,
    },
    linux: {
      bundleCEF: false,
      icon: "assets/icon.png",
    },
    win: {
      bundleCEF: false,
      icon: "assets/icon.png",
    },
  },
} satisfies ElectrobunConfig;
