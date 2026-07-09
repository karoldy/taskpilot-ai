# CLAUDE.md — apps/web

本文件为 Claude Code 在 `apps/web`（Vite + React 前端）中工作时提供指导。

## 技术栈

- **框架**：React 19、TypeScript 6（strict，`verbatimModuleSyntax`）
- **构建**：Vite 8 + `@vitejs/plugin-react`
- **模块系统**：ESM（`"type": "module"`）
- **UI**：MUI (Material UI) 9 + Emotion
- **路由**：React Router 7（createBrowserRouter + 懒加载）
- **状态管理**：Zustand 5
- **GraphQL**：Apollo Client 4 + GraphQL Codegen
- **i18n**：i18next + react-i18next（en / sc / tc）
- **测试**：Vitest + Playwright（Storybook 集成）
- **Lint**：oxlint（`typescript/no-explicit-any` = error）

## 在包目录下运行的命令

```bash
pnpm dev              # Vite 开发服务器（端口 5170）
pnpm build            # tsc -b + vite build
pnpm typecheck        # tsc -b（不生成输出）
pnpm lint             # oxlint
pnpm preview          # 预览生产构建
pnpm codegen          # GraphQL Codegen（需要后端运行）
pnpm storybook        # Storybook（端口 6006）
pnpm build-storybook  # Storybook 静态站点
```

## 架构

### 启动流程

```
main.tsx → App
  ├─ ApolloProvider
  ├─ I18nextProvider
  ├─ ThemeProvider (MUI)
  ├─ CssBaseline
  └─ RouterProvider (createBrowserRouter)
```

- MSW 在 `main.tsx` 中条件启用（`VITE_ENABLE_MOCK === 'true'`）
- 路由 `/` 重定向到 `/tasks`

### 组件层级

```
Layout (components/layout/index.tsx)
  ├─ Navbar — 固定顶栏，滚动联动（渐变 + 模糊 + 阴影）
  ├─ <Outlet /> — 页面内容
  └─ Footer

Header — 页面级横幅，含背景图片，适配 Navbar 高度
NotFound / ErrorBoundary — 通用错误/404 页面
IllustrationCard (molecules/) — 通过 type/size/name 动态加载 SVG
FilterCard (molecules/) — 任务筛选卡片
Table (molecules/) — 通用数据表格
GraphQLErrorDialog (molecules/) — GraphQL 错误弹窗
```

### 模块结构

```
src/modules/<name>/page/<pageName>/index.tsx
```

当前模块：`task`（任务）、`auth`（认证/登录）、`project`（项目）

### 路由

- `src/routers/index.tsx` — createBrowserRouter，每个路由配错误边界，组件通过 `lazy()` 懒加载
- `src/routers/path.ts` — `RouteConfig[]` 定义所有菜单模块元数据
- 目前仅 `/tasks` 已接入路由

### 状态管理

| Store          | 用途                                             |
| -------------- | ------------------------------------------------ |
| `useAppStore`  | 侧边栏开关、主题（light/dark）、语言（en/sc/tc） |
| `useTaskStore` | 任务 CRUD、筛选、计数                            |

Selector 以 getter 函数形式实现在 store 上（如 `filteredTasks()`）。

### 设计 Token

`src/tokens/base/` → 聚合导出为纯 JS 对象，被 MUI 主题和 `sx` 属性直接消费：

- Color（500+ 语义化颜色）、Typography、Space、Border radius、Shadow、Gradient、Dimension

### MUI 主题

`src/config/theme.config.ts` + `src/types/mui.d.ts`（模块增强）

- 新增 `xxl: 1560` 断点
- `text` palette 扩展：description、placeholder、onColor、highlight 等
- 20+ 自定义 Typography variants（heading1~~3、body1~~3、ctaButton 等）

### i18n

`src/locales/converted_{en,sc,tc}.json`，key 使用 snake_case + 模块前缀。

### API Mock (MSW)

`src/mocks/browser.ts` + `src/mocks/handlers.ts`（handlers 目前为空），通过 `VITE_ENABLE_MOCK` 控制。

### GraphQL

- Apollo Client 配置：`src/config/apollo.config.ts`
- Operations：`src/graphql/operations/`（query/mutation）+ `src/graphql/fragments/`
- Codegen 输出：`src/generated/graphql.ts` + `src/generated/graphql-types.ts`
- Apollo 缓存负责服务端数据；Zustand 仅管理纯 UI 状态

## 代码模式

- 所有内部导入使用 `@/` 路径别名
- MUI 组件从具体路径导入（如 `@mui/material/Box`），不用 barrel export
- 使用 `sx` 属性设置样式，直接引用设计 Token
- 组件类型签名 `React.FC<Props>` + 显式 `displayName`
- 新增 palette/typography 字段时，在 `src/types/mui.d.ts` 中做模块增强
- 遵循 `molecules/` 分层；Story 放在 `src/stories/`
- Prettier：单引号、分号、尾逗号（all）、打印宽度 100

## 环境变量

| 变量               | 说明              | 默认值                          |
| ------------------ | ----------------- | ------------------------------- |
| `VITE_GRAPHQL_URI` | GraphQL API 端点  | `http://localhost:3000/graphql` |
| `VITE_ENABLE_MOCK` | 启用 MSW API Mock | `false`                         |
