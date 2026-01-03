// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["@repo/ui"],
    },
    server: {
      allowedHosts: ["aebc23c89643.ngrok.app"],
    },
  },
});
