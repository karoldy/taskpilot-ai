# `tasks`

任务表，核心实体，支持子任务、Sprint 归属、状态流转、优先级。

## DDL

```sql
CREATE TABLE tasks (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id    UUID NOT NULL REFERENCES projects (id) ON DELETE CASCADE,
    task_code     VARCHAR(30) NOT NULL UNIQUE,
    sprint_id     UUID REFERENCES sprints (id) ON DELETE SET NULL,
    parent_task_id UUID REFERENCES tasks (id) ON DELETE SET NULL,
    title         VARCHAR(500) NOT NULL,
    description   TEXT,

    status        BOOLEAN NOT NULL DEFAULT TRUE,
    task_state    VARCHAR(20) NOT NULL DEFAULT 'todo'
                  CHECK (task_state IN ('todo', 'in_progress', 'review', 'done', 'cancelled')),
    priority      VARCHAR(10) NOT NULL DEFAULT 'medium'
                  CHECK (priority IN ('urgent', 'high', 'medium', 'low')),

    creator_id    UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    assignee_id   UUID REFERENCES users (id) ON DELETE SET NULL,

    due_date      TIMESTAMPTZ,
    started_at    TIMESTAMPTZ,
    completed_at  TIMESTAMPTZ,

    metadata      JSONB DEFAULT '{}',

    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tasks_project      ON tasks (project_id);
CREATE INDEX idx_tasks_task_code    ON tasks (task_code);
CREATE INDEX idx_tasks_sprint       ON tasks (sprint_id);
CREATE INDEX idx_tasks_parent       ON tasks (parent_task_id);
CREATE INDEX idx_tasks_status       ON tasks (status);
CREATE INDEX idx_tasks_task_state   ON tasks (task_state);
CREATE INDEX idx_tasks_priority     ON tasks (priority);
CREATE INDEX idx_tasks_creator      ON tasks (creator_id);
CREATE INDEX idx_tasks_assignee     ON tasks (assignee_id);
CREATE INDEX idx_tasks_due_date     ON tasks (due_date);
```

## 字段

| 字段             | 类型           | 约束                    | 说明                                                     |
| ---------------- | -------------- | ----------------------- | -------------------------------------------------------- |
| `id`             | `UUID`         | PK                      |                                                          |
| `project_id`     | `UUID`         | FK → projects, NOT NULL | 所属项目                                                 |
| `task_code`      | `VARCHAR(30)`  | UNIQUE, NOT NULL        | 任务编码，如 `EC-1`                                      |
| `sprint_id`      | `UUID`         | FK → sprints, nullable  | 所属 Sprint                                              |
| `parent_task_id` | `UUID`         | FK → tasks, nullable    | 父任务（子任务）                                         |
| `title`          | `VARCHAR(500)` | NOT NULL                | 任务标题                                                 |
| `description`    | `TEXT`         |                         | 任务描述                                                 |
| `status`         | `BOOLEAN`      | NOT NULL, DEFAULT TRUE  | `TRUE` 正常 / `FALSE` 已作废删除                         |
| `task_state`     | `VARCHAR(20)`  | NOT NULL, CHECK         | `todo` / `in_progress` / `review` / `done` / `cancelled` |
| `priority`       | `VARCHAR(10)`  | NOT NULL, CHECK         | `urgent` / `high` / `medium` / `low`                     |
| `creator_id`     | `UUID`         | FK → users, NOT NULL    | 创建人                                                   |
| `assignee_id`    | `UUID`         | FK → users              | 负责人                                                   |
| `due_date`       | `TIMESTAMPTZ`  |                         | 截止日期                                                 |
| `started_at`     | `TIMESTAMPTZ`  |                         | 开始时间                                                 |
| `completed_at`   | `TIMESTAMPTZ`  |                         | 完成时间                                                 |
| `metadata`       | `JSONB`        | DEFAULT `{}`            | 扩展字段（标签、自定义字段等）                           |
| `created_at`     | `TIMESTAMPTZ`  | NOT NULL                |                                                          |
| `updated_at`     | `TIMESTAMPTZ`  | NOT NULL                |                                                          |

> `status = FALSE` 即作废（等同删除），查询默认过滤 `WHERE status = TRUE`。`task_state` 用于工作流状态追踪。

## 关联

- [projects](projects.md) — 通过 `project_id`
- [sprints](sprints.md) — 通过 `sprint_id`
- [tasks](tasks.md) — 自引用 `parent_task_id`，构建子任务树
- [users](users.md) — 通过 `creator_id` / `assignee_id`
- [task_comments](task_comments.md) — 一对多
- [task_status_logs](task_status_logs.md) — 一对多
- [ai_usage_records](ai_usage_records.md) — 一对多
