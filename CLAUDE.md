# CLAUDE.md

本文件为 Claude Code（claude.ai/code）在此仓库中工作时提供指导。

## 项目概述

TaskPilot AI — 一个 AI 驱动的项目任务管理平台。

## 常用命令

| 命令             | 说明                                  |
| ---------------- | ------------------------------------- |
| `pnpm dev`       | 启动 Vite 开发服务器（端口 5170）     |
| `pnpm build`     | TypeScript 类型检查 + Vite 生产构建   |
| `pnpm typecheck` | 仅运行 `tsc -b`（不生成输出）         |
| `pnpm lint`      | 运行 oxlint                           |
| `pnpm preview`   | 预览生产构建                          |
| `pnpm install`   | 安装依赖（需要 pnpm ≥ 10，Node ≥ 20） |

**Pre-commit**（husky + lint-staged）：`*.{ts,tsx}` 文件依次执行 prettier → oxlint → `tsc -b --noEmit`。提交信息通过 commitlint 强制遵循 Conventional Commits 规范。

## 技术栈

- **框架**：React 19、TypeScript 6（strict 模式，`verbatimModuleSyntax`）
- **构建**：Vite 8 + `@vitejs/plugin-react`，路径别名 `@` → `./src`
- **UI**：MUI (Material UI) 9 + Emotion，自定义设计 Token 系统，Sass（`.scss`）
- **路由**：React Router 7（createBrowserRouter + 懒加载路由）
- **状态管理**：Zustand 5（无 Redux — Navbar 中被注释的 import 是之前代码库迁移的遗留代码）
- **i18n**：i18next + react-i18next，3 种语言：`en`（英文）、`sc`（简体中文）、`tc`（繁体中文）
- **API Mock**：MSW 2（Service Worker 在 `public/` 目录，handlers 目前为空）
- **图标**：`lucide-react`，按需直接导入使用
- **测试**：尚未配置测试框架（无 Vitest、Jest 或 Playwright）

## 架构

### 应用启动流程（`src/main.tsx` → `src/components/layout/App.tsx`）

```
main.tsx
  ├─ MSW（开发环境下 VITE_ENABLE_MOCK === 'true' 时启用）
  └─ App
       ├─ I18nextProvider
       ├─ ThemeProvider（MUI 主题，来自 config/theme.config.ts）
       ├─ CssBaseline
       └─ RouterProvider
```

### 路由（`src/routers/`）

- `index.tsx` — 使用 `createBrowserRouter` 创建路由，每个路由配有错误边界。每个页面组件通过 `lazy()` 懒加载。根路径 `/` 重定向到 `/tasks`。`*` 通配符渲染 NotFound 组件。
- `path.ts` — 定义了所有规划模块的路由元数据（`RouteConfig[]`）：dashboard、tasks、staffs、schedules、reports、documents、locations，以及设置子路由。**目前仅 `/tasks` 已接入路由**，其余尚未连接。

### 模块结构（`src/modules/`）

业务模块遵循 `src/modules/<名称>/page/<页面名>/index.tsx` 模式。目前仅存在 `task/page/Landing`。新增模块应沿用此结构。

### 组件层级

```
Layout (src/components/layout/index.tsx)
  ├─ Navbar — 固定顶栏，随滚动联动（渐变 + 模糊 + 阴影随滚动进度变化）
  ├─ <Outlet /> — 页面内容
  └─ Footer
```

- `Header` — 页面级横幅，含背景图片，根据固定 Navbar 高度（64px）留出内边距
- `NotFound` / `ErrorBoundary` — 通用错误/404 页面；ErrorBoundary 使用 `IllustrationCard`
- `IllustrationCard`（`components/molecules/IllustrationCard/`）— 可复用的卡片组件，含图片、标题、操作按钮；支持 `variant`（info/success/error）和 `loading` 状态

### 状态管理（`src/stores/`）

| Store          | 用途                                                 |
| -------------- | ---------------------------------------------------- |
| `useAppStore`  | 侧边栏开关、主题模式（light/dark）、语言（en/sc/tc） |
| `useTaskStore` | 任务 CRUD、筛选（status/sort/order）、计数计算       |

Store 使用 Zustand 的 `create()`，将 state 和 actions 放在同一个 slice 中。Selector 以 getter 函数形式实现在 store 上（如 `filteredTasks()`、`taskCount()`）。

### 设计 Token（`src/tokens/base/`）

一套完整的设计 Token 系统，由 `src/tokens/base/index.ts` 聚合导出。Token 是纯对象（非 CSS 自定义属性），直接被 MUI 主题配置和内联 `sx` 属性消费。主要类别：

- **Color** — 500+ 语义化颜色 Token，覆盖文本、图标、背景、边框、徽章、插画。命名遵循严格约定：`color<类别><角色><状态>`（如 `colorTextHighlightHover`、`colorFilledPrimaryPressed`）。
- **Typography** — 字体家族、字号、字重、行高 Token
- **Space** — 间距标尺（`spaceGeneralGapS`、`spaceComponentNavPaddingXXl` 等）
- **Border radius** — `borderRadiusGeneralAllRound` 等
- **Shadow、Gradient、Dimension** Token

### MUI 主题定制（`src/config/theme.config.ts` + `src/types/mui.d.ts`）

- **Breakpoints**：在默认五个断点基础上新增 `xxl: 1560`
- **Palette**：`text` 扩展了 `description`、`placeholder`、`onColor`、`highlight`、`highlightHover`、`highlightPressed`、`visitedLink`、`button`、`buttonHover`、`buttonPressed`、`error`、`errorHover`、`errorPressed`。`background` 扩展了 `primary`、`disabled`、`highlight`、`semanticInfo`。新增 `neutral`（含 `black`、`white`、`transparent`）。
- **Typography variants**：20+ 自定义变体（`heading1`、`heading2`、`subtitle3`、`body1Highlight`、`body2Highlight`、`body3`、`body3Highlight`、`ctaButton1`、`ctaButton2`、`ctaIconButton`、`ctaLink`、`tabDefault`、`tabHighlight`、`inputFieldTitle`、`inputFieldPlaceholder`、`label1`、`label2`、`label3`、`searchHighlight`）— 全部在 `mui.d.ts` 模块增强中声明。
- 组件覆写（MuiCssBaseline、MuiTypography variantMapping、MuiButton、MuiInputBase、MuiDialog、MuiDialogTitle、MuiMenuItem）目前**已被注释**，但代表了预期的覆盖模式。

### i18n（`src/locales/`）

翻译 JSON 文件：`converted_en.json`、`converted_sc.json`、`converted_tc.json`。i18n 实例从 `localStorage.getItem('locale')` 初始化语言，回退到 `tc`。翻译 key 使用 snake_case，采用模块前缀约定（如 `navmenu__task`、`dialog__logout_title`）。

### API Mock（`src/mocks/`）

MSW 浏览器 Worker 已在 `src/mocks/browser.ts` 中配置。`src/mocks/handlers.ts` 中的 `handlers` 数组目前为空 — 待 API 接口确定后在此添加 REST/GraphQL handler。在开发环境中设置 `VITE_ENABLE_MOCK=true` 启用 Mock。

## 应遵循的代码模式

- **遇到 MUI 相关问题时，优先使用 `mcp__mui-mcp` 工具链查阅官方文档**，而非凭记忆回答。`.mcp.json` 中已配置 `@mui/mcp` 服务器，可用工具包括 `useMuiDocs`（获取组件文档）、`fetchDocs`（抓取指定 URL 文档）
- 所有内部导入使用 `@/` 路径别名（在 `tsconfig.app.json` 和 `vite.config.ts` 中均已配置）
- MUI 组件从其具体路径单独导入（如 `@mui/material/Box`），而非从 barrel export 导入 — 代码库已一致采用此做法
- 使用 `sx` 属性进行组件样式设置；设计 Token 直接引用（如 `tokens.colorTextHighlight`）
- 组件类型签名使用 `React.FC<Props>`，并显式设置 `displayName`
- 新增自定义 palette/typography 字段时，在 `src/types/mui.d.ts` 中通过模块增强扩展 MUI 类型
- 路由配置对象遵循 `routers/path.ts` 中的 `RouteConfig` 接口，包含 `id`、`path`、`key`（i18n key）、`icon`、`group`、`order`
- 组件遵循分层设计：`molecules/`（组合组件如 IllustrationCard）；暂无 `atoms/` 和 `organisms/`
- oxlint 配置了 React + TypeScript 插件；`typescript/no-explicit-any` 设为 error 级别
- Prettier：单引号、分号、尾逗号（all）、打印宽度 100
