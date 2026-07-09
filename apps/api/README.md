# apps/api

TaskPilot AI 后端 — NestJS 10 + GraphQL + PostgreSQL。

## 本地开发

```bash
# 1. 启动 PostgreSQL
docker compose up -d

# 2. 初始化数据库
npx prisma migrate dev
npx prisma generate

# 3. 启动服务
pnpm start:dev    # 开发模式 → http://localhost:3000/graphql
```

### 从 monorepo 根目录运行

```bash
pnpm dev:api      # 启动 NestJS 开发服务器
pnpm db:migrate   # 运行数据库迁移
pnpm db:generate  # 生成 Prisma Client
pnpm db:studio    # Prisma Studio 数据库浏览器
```

## 技术栈

NestJS 10 / TypeScript 5 / GraphQL (Apollo Server 4) / PostgreSQL 16 / Prisma 5 / JWT + Passport

## 目录结构

```
apps/api/
├── src/
│   ├── main.ts             # 应用入口
│   ├── app.module.ts       # 根模块
│   ├── auth/               # 认证（JWT + 注册/登录/刷新）
│   ├── users/              # 用户管理
│   ├── projects/           # 项目管理
│   ├── tasks/              # 任务管理
│   ├── sprints/            # Sprint 管理
│   ├── documents/          # 文档管理
│   ├── departments/        # 部门管理
│   ├── positions/          # 职位管理
│   ├── ai-usage/           # AI 用量统计
│   └── common/             # 公共服务（Prisma、分页、守卫）
├── prisma/
│   ├── schema.prisma       # 数据库 Schema
│   └── migrations/         # 迁移历史
├── docs/                   # 数据库设计文档
├── docker-compose.yml      # PostgreSQL 本地环境
└── nest-cli.json
```

## 脚本

| 命令              | 说明                            |
| ----------------- | ------------------------------- |
| `pnpm start:dev`  | NestJS 开发模式（热重载，3000） |
| `pnpm build`      | nest build → dist/              |
| `pnpm start:prod` | node dist/main                  |
| `pnpm lint`       | eslint + fix                    |
| `pnpm format`     | prettier                        |
