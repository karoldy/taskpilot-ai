# TaskPilot AI

AI 驱动的项目任务管理平台 — pnpm monorepo 全栈项目。

## 项目结构

```
taskpilot-ai/
├── apps/
│   ├── web/                    # 前端：Vite + React 19
│   │   ├── src/                # 源码
│   │   │   ├── assets/         # 静态资源（图片、SVG 插图）
│   │   │   ├── components/     # 通用组件（layout / molecules）
│   │   │   ├── config/         # 应用配置（MUI 主题、Apollo Client）
│   │   │   ├── locales/        # 国际化语言包（en / sc / tc）
│   │   │   ├── mocks/          # MSW API Mock
│   │   │   ├── modules/        # 业务模块（task / auth / project）
│   │   │   ├── routers/        # 路由配置
│   │   │   ├── stores/         # Zustand 全局状态
│   │   │   ├── styles/         # 全局 SCSS 样式
│   │   │   ├── tokens/         # 设计 Token
│   │   │   └── types/          # TypeScript 类型声明
│   │   ├── .storybook/         # Storybook 配置
│   │   ├── public/             # 静态文件（含 MSW worker）
│   │   ├── index.html          # HTML 入口
│   │   └── vite.config.ts      # Vite 配置
│   └── api/                    # 后端：NestJS + GraphQL
│       ├── src/                # 源码
│       │   ├── auth/           # JWT 认证模块
│       │   ├── users/          # 用户模块
│       │   ├── projects/       # 项目模块
│       │   ├── tasks/          # 任务模块
│       │   ├── sprints/        # Sprint 模块
│       │   ├── documents/      # 文档模块
│       │   ├── departments/    # 部门模块
│       │   ├── positions/      # 职位模块
│       │   ├── ai-usage/       # AI 用量统计
│       │   └── common/         # 公共服务（Prisma、分页、守卫等）
│       ├── prisma/             # Prisma Schema + Migrations
│       ├── docs/               # 数据库设计文档
│       ├── docker-compose.yml  # PostgreSQL 本地环境
│       └── nest-cli.json       # NestJS CLI 配置
├── .husky/                     # Git Hooks
├── .prettierrc                 # Prettier 配置
├── .oxlintrc.json              # oxlint 配置
├── commitlint.config.cjs       # Commitlint 配置
├── pnpm-workspace.yaml         # pnpm workspace 定义
├── pnpm-approve.json           # pnpm build script 审批
├── package.json                # workspace 根配置
├── tsconfig.json               # TypeScript 项目引用
└── CLAUDE.md                   # Claude Code 指引
```

## 技术栈

### 前端（`apps/web`）

| 类别     | 技术                                    |
| -------- | --------------------------------------- |
| 框架     | React 19                                |
| 语言     | TypeScript 6                            |
| 构建     | Vite 8                                  |
| UI       | MUI (Material UI) 9 + Emotion           |
| 路由     | React Router 7                          |
| 状态管理 | Zustand 5                               |
| GraphQL  | Apollo Client 4 + GraphQL Codegen       |
| 国际化   | i18next + react-i18next（en / sc / tc） |
| 图标     | lucide-react                            |
| API Mock | MSW 2                                   |
| 组件开发 | Storybook 10                            |
| 测试     | Vitest + Playwright                     |
| 样式     | Sass + Design Token 系统                |

### 后端（`apps/api`）

| 类别   | 技术                                |
| ------ | ----------------------------------- |
| 框架   | NestJS 10                           |
| 语言   | TypeScript 5                        |
| API 层 | GraphQL（Apollo Server 4）          |
| 数据库 | PostgreSQL 16                       |
| ORM    | Prisma 5                            |
| 认证   | JWT（passport-jwt + bcrypt）        |
| 验证   | class-validator + class-transformer |

## 环境要求

- **Node.js** >= 20
- **pnpm** >= 10
- **PostgreSQL** >= 16（后端开发需要）

```bash
corepack enable
corepack prepare pnpm@10 --activate
```

## 快速开始

```bash
# 1. 安装所有依赖
pnpm install

# 2. 启动 PostgreSQL（Docker）
cd apps/api && docker compose up -d

# 3. 初始化数据库
pnpm db:migrate
pnpm db:generate

# 4. 启动开发服务
pnpm dev          # 前端 → http://localhost:5170
pnpm dev:api      # 后端 → http://localhost:3000/graphql
```

## 常用命令

### 前端（web）

| 命令                   | 说明                               |
| ---------------------- | ---------------------------------- |
| `pnpm dev`             | 启动 Vite 开发服务器（端口 5170）  |
| `pnpm build`           | TypeScript 类型检查 + 生产构建     |
| `pnpm typecheck`       | 仅运行 `tsc -b` 类型检查           |
| `pnpm lint`            | 运行 oxlint 代码检查               |
| `pnpm preview`         | 预览生产构建                       |
| `pnpm codegen`         | 根据后端 schema 生成 GraphQL hooks |
| `pnpm storybook`       | 启动 Storybook（端口 6006）        |
| `pnpm build-storybook` | 构建 Storybook 静态站点            |

### 后端（api）

| 命令               | 说明                                |
| ------------------ | ----------------------------------- |
| `pnpm dev:api`     | 启动 NestJS 开发服务器（端口 3000） |
| `pnpm build:api`   | 编译 NestJS 项目                    |
| `pnpm start:api`   | 启动生产模式                        |
| `pnpm format:api`  | 格式化源码（prettier）              |
| `pnpm db:migrate`  | 运行数据库迁移                      |
| `pnpm db:generate` | 生成 Prisma Client                  |
| `pnpm db:studio`   | 启动 Prisma Studio 数据库浏览器     |

## Storybook

组件开发使用 Storybook 10，已配置：

- **MUI 主题同步** — 自动注入项目自定义主题
- **i18n 支持** — 翻译在 Story 中正常使用
- **响应式视口** — 工具栏切换 XS / SM / MD / LG / XL / XXL 断点
- **全局样式** — `apps/web/src/styles/index.scss` 在 Story 中生效
- **无障碍检查** — 通过 `@storybook/addon-a11y` 自动检测

```bash
pnpm storybook        # 启动 → http://localhost:6006
pnpm build-storybook  # 构建静态站点
```

## Git 提交规范

使用 Conventional Commits 规范，通过 husky + commitlint 强制执行。

```
<type>(<scope>): <subject>

示例：
feat(task): 添加任务创建表单
fix(auth): 修复登录超时问题
refactor(project): restructure into pnpm monorepo with apps/web
```

可用 type：`feat` `fix` `docs` `style` `refactor` `perf` `test` `chore` `revert` `build` `ci`

每次 commit 自动执行：

- **pre-commit** — `apps/web/**`：prettier → oxlint → tsc -b；`apps/api/**`：prettier
- **commit-msg** — commitlint 校验提交信息格式

## 开源协议

ISC
