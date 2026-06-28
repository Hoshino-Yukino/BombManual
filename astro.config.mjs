// @ts-check
import { defineConfig } from 'astro/config';

// 纯静态站，部署到 Cloudflare Pages（输出 dist/）。
export default defineConfig({
  output: 'static',
  site: 'https://ktane-manual.pages.dev',
  build: { format: 'directory' },
});
