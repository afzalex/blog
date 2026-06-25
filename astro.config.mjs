import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

const site =
  process.env.SITE_URL || process.env.PUBLIC_SITE_URL || "https://quietpages-eta.vercel.app";

export default defineConfig({
  site,
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    host: true,
    allowedHosts: ["blog.afzalex.com", "localhost", "127.0.0.1", "::1"],
    port: 4321,
  },
});
