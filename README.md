# 拆弹手册 · KTANE zh-CN

《Keep Talking and Nobody Explodes》拆弹手册（中文 v1）的网页版速查，内含**摩斯电码**与**密码**模块的交互解算器。Astro 静态站，部署到 Cloudflare Pages。

## 技术栈

- [Astro](https://astro.build) 静态输出（`output: 'static'`）
- 交互解算器为 Astro 内联 `<script>` 孤岛（vanilla TS），无额外框架
- 包管理：**pnpm**

## 开发

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # 产物输出到 dist/
pnpm preview      # 本地预览生产构建
```

## 部署到 Cloudflare Pages

无需 GitHub，直接推送 dist：

```bash
pnpm build
pnpm dlx wrangler pages deploy dist --project-name ktane-manual
```

或在 Cloudflare Pages 连接 Git 仓库，构建命令 `pnpm build`、输出目录 `dist`（CF 会自动识别 `pnpm-lock.yaml`）。

## 内容结构

- `src/data/modules.ts` — 全部模块规则（从 PDF 誊清的 HTML）
- `src/data/morse.ts` / `password.ts` / `keypad.ts` — 解算器与键盘数据
- `src/components/MorseSolver.astro` / `PasswordSolver.astro` — 交互组件
- `public/assets/` — 键盘符号与迷宫图（从原 PDF 提取）

## 资产来源

键盘 27 个符号、迷宫九图由原 PDF 的内嵌位图 / 页面栅格化提取。规则文本、表格均从 PDF 文本誊清。仅供学习查阅。
