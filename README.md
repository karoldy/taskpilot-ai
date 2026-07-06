# TaskPilot AI

AI 驱动的任务管理平台。

## 技术栈

| 类别      | 技术                             |
| --------- | -------------------------------- |
| 框架      | React 19                         |
| 语言      | TypeScript                       |
| 构建      | Vite                             |
| UI        | MUI (Material UI) 9              |
| 路由      | React Router 7                   |
| 状态管理  | Zustand 5                        |
| 国际化    | i18next + react-i18next          |
| 代码检查  | oxlint + Prettier                |
| Git Hooks | Husky + Commitlint + lint-staged |

## 目录结构

```
taskpilot-ai/
├── src/
│   ├── components/        # 通用组件
│   │   └── layout/        # 布局组件
│   ├── config/            # 应用配置（MUI 主题等）
│   ├── constants/         # 常量与枚举
│   ├── locales/           # 国际化语言包（en / sc / tc）
│   ├── modules/           # 业务模块
│   │   └── task/          # 任务模块
│   ├── routers/           # 路由配置
│   ├── stores/            # Zustand 全局状态
│   ├── tokens/            # 设计 Token（颜色、字体、间距等）
│   └── types/             # TypeScript 类型声明
├── .husky/                # Git Hooks
├── .prettierrc            # Prettier 配置
├── commitlint.config.js   # Commitlint 配置
├── tsconfig.json          # TypeScript 配置
└── vite.config.ts         # Vite 配置
```

## 环境要求

- **Node.js** >= 20
- **pnpm** >= 10

```bash
corepack enable
corepack prepare pnpm@10 --activate
```

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

## 脚本

| 命令             | 说明                       |
| ---------------- | -------------------------- |
| `pnpm dev`       | 启动 Vite 开发服务器       |
| `pnpm build`     | 类型检查 + 生产构建        |
| `pnpm typecheck` | 仅运行 TypeScript 类型检查 |
| `pnpm lint`      | 运行 oxlint 代码检查       |
| `pnpm preview`   | 预览生产构建结果           |

## Git 提交规范

本项目使用 Conventional Commits 规范，通过 husky + commitlint 强制执行。

```
<type>(<scope>): <subject>

示例：
feat(task): 添加任务创建表单
fix(auth): 修复登录超时问题
chore(deps): 更新依赖版本
```

可用的 type：`feat` `fix` `docs` `style` `refactor` `perf` `test` `chore` `revert` `build` `ci`

每次 commit 时自动执行：

- **pre-commit** → Prettier 格式化 → oxlint 检查 → TypeScript 类型检查
- **commit-msg** → Commitlint 校验提交信息格式

## 开源协议

ISC
