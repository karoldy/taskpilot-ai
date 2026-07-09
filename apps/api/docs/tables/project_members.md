# `project_members`

项目成员表，记录用户与项目的多对多关系及角色。

## DDL

```sql
CREATE TABLE project_members (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id  UUID NOT NULL REFERENCES projects (id) ON DELETE CASCADE,
    user_id     UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    role        VARCHAR(20) NOT NULL DEFAULT 'member'
                CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
    joined_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (project_id, user_id)
);

CREATE INDEX idx_pm_project ON project_members (project_id);
CREATE INDEX idx_pm_user    ON project_members (user_id);
```

## 字段

| 字段         | 类型          | 约束            | 说明                                    |
| ------------ | ------------- | --------------- | --------------------------------------- |
| `id`         | `UUID`        | PK              |                                         |
| `project_id` | `UUID`        | FK → projects   |                                         |
| `user_id`    | `UUID`        | FK → users      |                                         |
| `role`       | `VARCHAR(20)` | NOT NULL, CHECK | `owner` / `admin` / `member` / `viewer` |
| `joined_at`  | `TIMESTAMPTZ` | NOT NULL        |                                         |

> **约束**: `(project_id, user_id)` 唯一，同一用户不可重复加入同一项目。

## 关联

- [projects](projects.md) — 通过 `project_id`
- [users](users.md) — 通过 `user_id`
