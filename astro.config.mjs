import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from 'astro/config';

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon()],
  output: "hybrid",
  adapter: vercel(),
  image: {
    domains: [],
    remotePatterns: []
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'terser',
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