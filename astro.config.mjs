import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

const site =
  process.env.SITE_URL || process.env.PUBLIC_SITE_URL || "https://blog.afzalex.com";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const base = process.env.BASE_PATH || (repoName ? `/${repoName}/` : "/");

export default defineConfig({
  site,
  base,
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
