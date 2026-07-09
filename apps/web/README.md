# apps/web

TaskPilot AI 前端 — Vite + React 19 + TypeScript 6。

## 本地开发

```bash
# 从 monorepo 根目录运行
pnpm dev          # 启动开发服务器 → http://localhost:5170
pnpm storybook    # Storybook → http://localhost:6006

# 或在本目录运行
cd apps/web
pnpm dev
```

## 技术栈

React 19 / TypeScript 6 / Vite 8 / MUI 9 / React Router 7 / Zustand 5 / Apollo Client 4 / i18next / Storybook 10 / Vitest + Playwright

## 目录结构

```
apps/web/
├── src/
│   ├── main.tsx            # 应用入口
│   ├── assets/             # 图片、SVG 插图
│   ├── components/         # layout / molecules
│   ├── config/             # MUI 主题、Apollo Client
│   ├── constants/          # 常量与枚举
│   ├── locales/            # 国际化（en / sc / tc）
│   ├── mocks/              # MSW API Mock
│   ├── modules/            # 业务模块（task / auth / project）
│   ├── routers/            # React Router 配置
│   ├── stores/             # Zustand
│   ├── styles/             # 全局 SCSS
│   ├── tokens/             # 设计 Token 系统
│   └── types/              # TS 类型声明
├── .storybook/             # Storybook 配置
├── public/                 # 静态文件
├── index.html
└── vite.config.ts
```

## 脚本

| 命令                   | 说明                            |
| ---------------------- | ------------------------------- |
| `pnpm dev`             | 启动 Vite 开发服务器（5170）    |
| `pnpm build`           | tsc -b + Vite 生产构建          |
| `pnpm typecheck`       | TypeScript 类型检查             |
| `pnpm lint`            | oxlint                          |
| `pnpm codegen`         | GraphQL Codegen（需要后端运行） |
| `pnpm storybook`       | Storybook 开发服务器（6006）    |
| `pnpm build-storybook` | 构建 Storybook 静态站点         |
