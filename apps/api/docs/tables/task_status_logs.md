# `task_status_logs`

任务工作流状态变更日志，审计每一次 `task_state` 流转。

## DDL

```sql
CREATE TABLE task_status_logs (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id     UUID NOT NULL REFERENCES tasks (id) ON DELETE CASCADE,
    from_state  VARCHAR(20),
    to_state    VARCHAR(20) NOT NULL,
    changed_by  UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    changed_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tsl_task       ON task_status_logs (task_id);
CREATE INDEX idx_tsl_changed_by ON task_status_logs (changed_by);
CREATE INDEX idx_tsl_time       ON task_status_logs (changed_at);
```

## 字段

| 字段         | 类型          | 约束                 | 说明                      |
| ------------ | ------------- | -------------------- | ------------------------- |
| `id`         | `UUID`        | PK                   |                           |
| `task_id`    | `UUID`        | FK → tasks, NOT NULL |                           |
| `from_state` | `VARCHAR(20)` | nullable             | 变更前状态（首次为 NULL） |
| `to_state`   | `VARCHAR(20)` | NOT NULL             | 变更后状态                |
| `changed_by` | `UUID`        | FK → users, NOT NULL | 操作人                    |
| `changed_at` | `TIMESTAMPTZ` | NOT NULL             |                           |

> 对应 [tasks](tasks.md) 的 `task_state` 字段：`todo` / `in_progress` / `review` / `done` / `cancelled`。

## 关联

- [tasks](tasks.md) — 通过 `task_id`
- [users](users.md) — 通过 `changed_by`
