import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  name: "HTTP Request Toggle",
  description: "",
  version: "0.1.0",
  manifest_version: 3,
  icons: {
    "16": "img/play-16.png",
    "34": "img/play-34.png",
    "48": "img/play-48.png",
    "128": "img/play-128.png",
  },
  options_page: "options.html",
  background: {
    service_worker: "src/background/index.ts",
    type: "module",
  },
  action: {},
  commands: {
    "toggle-http-request": {
      suggested_key: "Ctrl+Shift+Y",
      description: "Toggle HTTP request",
    },
  },
  web_accessible_resources: [
    {
      resources: [
        "img/play-16.png",
        "img/play-34.png",
        "img/play-48.png",
        "img/play-128.png",
      ],
      matches: [],
    },
  ],
  permissions: ["activeTab", "storage"],
});
