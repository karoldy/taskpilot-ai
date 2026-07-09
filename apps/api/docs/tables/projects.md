# `projects`

项目表。

## DDL

```sql
CREATE TABLE projects (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name           VARCHAR(200) NOT NULL,
    name_sc          VARCHAR(200) NOT NULL,
    name_tc          VARCHAR(200) NOT NULL,
    project_code   VARCHAR(20) NOT NULL UNIQUE,
    description    TEXT,
    status         BOOLEAN NOT NULL DEFAULT TRUE,
    project_status VARCHAR(20) NOT NULL DEFAULT 'active'
                   CHECK (project_status IN ('active', 'archived', 'completed')),
    owner_id    UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_owner          ON projects (owner_id);
CREATE INDEX idx_projects_status         ON projects (status);
CREATE INDEX idx_projects_project_status ON projects (project_status);
```

## 字段

| 字段             | 类型           | 约束                   | 说明                                |
| ---------------- | -------------- | ---------------------- | ----------------------------------- |
| `id`             | `UUID`         | PK                     |                                     |
| `name`           | `VARCHAR(200)` | NOT NULL               | 项目名称                            |
| `name_sc`        | `VARCHAR(200)` | NOT NULL               | 项目名称(中文简体)                  |
| `name_tc`        | `VARCHAR(200)` | NOT NULL               | 项目名称(中文繁体)                  |
| `project_code`   | `VARCHAR(20)`  | UNIQUE, NOT NULL       | 项目编码，如 `EC`（电商）           |
| `description`    | `TEXT`         |                        | 项目描述                            |
| `status`         | `BOOLEAN`      | NOT NULL, DEFAULT TRUE | `TRUE` 正常 / `FALSE` 已删除        |
| `project_status` | `VARCHAR(20)`  | NOT NULL, CHECK        | `active` / `archived` / `completed` |
| `owner_id`       | `UUID`         | FK → users, NOT NULL   | 项目负责人                          |
| `created_at`     | `TIMESTAMPTZ`  | NOT NULL               |                                     |
| `updated_at`     | `TIMESTAMPTZ`  | NOT NULL               |                                     |

> 查询默认过滤 `WHERE status = TRUE`，删除操作改为 `UPDATE SET status = FALSE`。

## 关联

- [users](users.md) — 通过 `owner_id`
- [project_members](project_members.md) — 一对多
- [sprints](sprints.md) — 一对多
- [tasks](tasks.md) — 一对多
- [documents](documents.md) — 一对多
- [ai_usage_records](ai_usage_records.md) — 一对多
