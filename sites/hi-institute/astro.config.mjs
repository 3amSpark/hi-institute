// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://hiinstitute.com",
  prefetch: true,
  integrations: [react(), sitemap()],
  redirects: {
    "/diabetes": "/tratamientos/diabetes",
    "/cervix": "/tratamientos/salud-femenina-ginecologica",
    "/endometriosis": "/tratamientos/salud-femenina-ginecologica",
    "/incontinencia": "/tratamientos/salud-femenina-ginecologica",
    "/mioma": "/tratamientos/salud-femenina-ginecologica",
    "/hi-woman": "/tratamientos/salud-femenina-ginecologica",
    "/hi-family": "/tratamientos/fertilidad-reproduccion",
    "/hi-pregnacy": "/tratamientos/fertilidad-reproduccion",
    "/hi-health": "/tratamientos/balance-hormonal",
    "/hi-life": "/tratamientos/metabolismo-peso",
    "/hi-man": "/tratamientos/metabolismo-peso",
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
