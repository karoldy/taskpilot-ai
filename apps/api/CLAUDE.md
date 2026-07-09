# CLAUDE.md — apps/api

本文件为 Claude Code 在 `apps/api`（NestJS + GraphQL 后端）中工作时提供指导。

## 技术栈

- **框架**：NestJS 10、TypeScript 5.x（CommonJS）
- **API 层**：GraphQL（`@nestjs/graphql` + Apollo Server 4），code-first 模式（`autoSchemaFile: true`）
- **数据库**：PostgreSQL 16 + Prisma ORM 5.x
- **认证**：JWT（`@nestjs/jwt` + `passport-jwt` + `bcryptjs`）
- **验证**：class-validator + class-transformer（DTO 装饰器）

## 在包目录下运行的命令

```bash
pnpm start:dev       # NestJS 开发模式（热重载，端口 3000）
pnpm build           # nest build → dist/
pnpm start:prod      # node dist/main
pnpm lint            # eslint {src,test}/**/*.ts --fix
pnpm format          # prettier --write src/**/*.ts
npx prisma generate  # 重新生成 Prisma Client
npx prisma migrate dev  # 数据库迁移
docker compose up -d # 启动 PostgreSQL
```

## 架构

### 入口

```
main.ts → NestFactory.create(AppModule)
  ├─ enableCors (开发阶段 origin: true)
  └─ listen(3000)
```

### 根模块（AppModule）

```
AppModule
  ├─ ConfigModule (isGlobal: true, 读取 .env)
  ├─ GraphQLModule (ApolloDriver, autoSchemaFile, introspection)
  ├─ PrismaModule (global, PrismaService extends OnModuleInit)
  ├─ AuthModule       — JWT 认证
  ├─ UsersModule       — 用户 CRUD
  ├─ ProjectsModule    — 项目 CRUD
  ├─ DepartmentsModule — 部门 CRUD
  ├─ PositionsModule   — 职位 CRUD
  ├─ SprintsModule     — Sprint CRUD
  ├─ TasksModule       — 任务 CRUD
  ├─ DocumentsModule   — 文档 CRUD
  └─ AiUsageModule     — AI 用量统计
```

### 模块内部结构（以 UsersModule 为例）

```
users/
├── users.module.ts      # @Module({ providers, exports })
├── users.resolver.ts    # @Resolver → GraphQL queries/mutations
├── users.service.ts     # @Injectable → 业务逻辑 + Prisma 查询
├── models/
│   └── user.model.ts    # @ObjectType → GraphQL 类型
└── dto/
    ├── create-user.input.ts   # @InputType + class-validator
    └── update-user.input.ts
```

新增模块时严格遵循此结构。

### Prisma

- Schema 文件：`prisma/schema.prisma`
- Migrations：`prisma/migrations/`
- 全局服务：`src/common/prisma.service.ts`（`PrismaService extends PrismaClient implements OnModuleInit`）
- 由 `PrismaModule` 全局导出，所有模块可直接注入 `PrismaService`

### GraphQL

- Code-first 模式：TypeScript 类 + 装饰器定义 schema（`@ObjectType`、`@InputType`、`@Field`、`@Resolver`）
- `autoSchemaFile: true` — schema 自动生成，不手动维护 `.graphql` 文件
- Apollo Sandbox 开发工具已启用（`introspection: true` + `ApolloServerPluginLandingPageLocalDefault`）

### 认证

- JWT 策略：`src/auth/jwt.strategy.ts`（`passport-jwt`）
- JwtAuthGuard：`src/common/guards/jwt-auth.guard.ts`
- 解密用户装饰器：`@CurrentUser()`（`src/common/decorators/current-user.decorator.ts`）
- 密码使用 `bcryptjs` 加密存储

### 分页

- 分页参数：`src/common/pagination/pagination.args.ts`（`offset` + `limit`）
- 分页模型：`src/common/pagination/paginated-response.model.ts`（泛型）
- 分页工具：`src/common/pagination/pagination.helper.ts`

## 代码模式

- 每个业务模块遵循 `resolver → service → model → dto` 分层
- DTO 使用 `class-validator` 装饰器（`@IsString()`、`@IsOptional()` 等）
- 数据库操作全部通过 `PrismaService`，不直接实例化 `PrismaClient`
- 接口返回类型使用 `@ObjectType` 装饰的 model 类
- `@CurrentUser()` 从 JWT payload 中提取当前用户信息
- GraphQL Queries 返回具体类型；Mutations 接收 `@InputType` DTO

## 环境变量

| 变量                     | 说明                 | 默认值                                                                       |
| ------------------------ | -------------------- | ---------------------------------------------------------------------------- |
| `DATABASE_URL`           | PostgreSQL 连接串    | `postgresql://taskpilot:taskpilot123@localhost:5432/taskpilot?schema=public` |
| `JWT_SECRET`             | JWT 签名密钥         | `dev-secret-change-in-production`                                            |
| `JWT_ACCESS_EXPIRES_IN`  | Access Token 有效期  | `10h`                                                                        |
| `JWT_REFRESH_EXPIRES_IN` | Refresh Token 有效期 | `7d`                                                                         |

## 数据库

```bash
docker compose up -d     # 启动 PostgreSQL（端口 5432）
npx prisma studio        # 浏览器数据管理界面
npx prisma migrate dev   # 迁移数据库
```
