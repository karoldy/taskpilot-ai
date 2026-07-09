# `users`

用户表。

## DDL

```sql
CREATE TABLE users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,

    name_zh       VARCHAR(100),
    name_en       VARCHAR(200),
    display_name  VARCHAR(100) NOT NULL,

    department_id UUID REFERENCES departments (id) ON DELETE SET NULL,
    position_id   UUID REFERENCES positions (id) ON DELETE SET NULL,

    role          VARCHAR(20) NOT NULL DEFAULT 'member'
                  CHECK (role IN ('super_admin', 'admin', 'member')),

    avatar_url    TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status         BOOLEAN NOT NULL DEFAULT TRUE,
);

CREATE INDEX idx_users_email      ON users (email);
CREATE INDEX idx_users_role       ON users (role);
CREATE INDEX idx_users_dept       ON users (department_id);
CREATE INDEX idx_users_pos        ON users (position_id);
```

## 字段

| 字段            | 类型           | 约束                   | 说明                                         |
| --------------- | -------------- | ---------------------- | -------------------------------------------- |
| `id`            | `UUID`         | PK                     |                                              |
| `email`         | `VARCHAR(255)` | UNIQUE, NOT NULL       | 登录凭证                                     |
| `password_hash` | `VARCHAR(255)` | NOT NULL               | bcrypt hash                                  |
| `name_zh`       | `VARCHAR(100)` |                        | 中文姓名                                     |
| `name_en`       | `VARCHAR(200)` |                        | 英文姓名                                     |
| `display_name`  | `VARCHAR(100)` | NOT NULL               | 显示名称（默认取 `name_zh` 或 `name_en`）    |
| `department_id` | `UUID`         | FK → departments       | 所属部门                                     |
| `position_id`   | `UUID`         | FK → positions         | 职位                                         |
| `role`          | `VARCHAR(20)`  | NOT NULL, CHECK        | 系统角色：`super_admin` / `admin` / `member` |
| `avatar_url`    | `TEXT`         |                        | 头像链接                                     |
| `created_at`    | `TIMESTAMPTZ`  | NOT NULL               |                                              |
| `updated_at`    | `TIMESTAMPTZ`  | NOT NULL               |                                              |
| `status`        | `BOOLEAN`      | NOT NULL, DEFAULT TRUE | `TRUE` 正常 / `FALSE` 已删除                 |

> `role` 是系统级角色，与 [project_members](project_members.md) 中的项目级角色（owner/admin/member/viewer）相互独立。

## 关联

- [departments](departments.md) — 通过 `department_id`
- [positions](positions.md) — 通过 `position_id`
- [projects](projects.md) — 项目负责人、创建者
- [project_members](project_members.md) — 项目成员
- [tasks](tasks.md) — 任务创建人、负责人
- [task_comments](task_comments.md) — 评论作者
- [task_status_logs](task_status_logs.md) — 状态变更操作人
- [documents](documents.md) — 文档创建者、修改人
- [document_versions](document_versions.md) — 版本创建者
- [ai_usage_records](ai_usage_records.md) — AI 调用用户
