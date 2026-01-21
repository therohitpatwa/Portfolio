import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import { defineConfig } from 'astro/config';

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon(), expressiveCode(), mdx()],
  output: "static",
  adapter: vercel(),
  image: {
    domains: [],
    remotePatterns: []
  },
  vite: {
    build: {
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['astro']
          }
        }
      }
    }
  }
});