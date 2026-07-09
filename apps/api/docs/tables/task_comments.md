# `task_comments`

任务评论表，Markdown 格式内容。

## DDL

```sql
CREATE TABLE task_comments (
    id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id   UUID NOT NULL REFERENCES tasks (id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    content   TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tc_task   ON task_comments (task_id);
CREATE INDEX idx_tc_author ON task_comments (author_id);
```

## 字段

| 字段         | 类型          | 约束                 | 说明          |
| ------------ | ------------- | -------------------- | ------------- |
| `id`         | `UUID`        | PK                   |               |
| `task_id`    | `UUID`        | FK → tasks, NOT NULL |               |
| `author_id`  | `UUID`        | FK → users, NOT NULL |               |
| `content`    | `TEXT`        | NOT NULL             | Markdown 内容 |
| `created_at` | `TIMESTAMPTZ` | NOT NULL             |               |
| `updated_at` | `TIMESTAMPTZ` | NOT NULL             |               |

## 关联

- [tasks](tasks.md) — 通过 `task_id`
- [users](users.md) — 通过 `author_id`
