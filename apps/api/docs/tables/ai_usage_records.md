# `ai_usage_records`

AI 调用记录表，按用户记录每次 AI 请求的 token 用量和费用。

## DDL

```sql
CREATE TABLE ai_usage_records (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id           UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    project_id        UUID REFERENCES projects (id) ON DELETE SET NULL,
    task_id           UUID REFERENCES tasks (id) ON DELETE SET NULL,

    provider          VARCHAR(50) NOT NULL,
    model_name        VARCHAR(100) NOT NULL,
    request_type      VARCHAR(30) NOT NULL DEFAULT 'chat'
                      CHECK (request_type IN ('chat', 'completion', 'embedding', 'image', 'audio')),

    prompt_tokens     INT NOT NULL DEFAULT 0,
    completion_tokens INT NOT NULL DEFAULT 0,

    estimated_cost    DECIMAL(10, 6) NOT NULL DEFAULT 0,
    request_duration_ms INT,

    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_aur_user      ON ai_usage_records (user_id);
CREATE INDEX idx_aur_project   ON ai_usage_records (project_id);
CREATE INDEX idx_aur_task      ON ai_usage_records (task_id);
CREATE INDEX idx_aur_model     ON ai_usage_records (model_name);
CREATE INDEX idx_aur_time      ON ai_usage_records (created_at DESC);
CREATE INDEX idx_aur_user_time ON ai_usage_records (user_id, created_at DESC);
```

## 字段

| 字段                  | 类型            | 约束                    | 说明                                                    |
| --------------------- | --------------- | ----------------------- | ------------------------------------------------------- |
| `id`                  | `UUID`          | PK                      |                                                         |
| `user_id`             | `UUID`          | FK → users, NOT NULL    | 调用 AI 的用户                                          |
| `project_id`          | `UUID`          | FK → projects, nullable | 关联项目                                                |
| `task_id`             | `UUID`          | FK → tasks, nullable    | 关联任务                                                |
| `provider`            | `VARCHAR(50)`   | NOT NULL                | `openai` / `anthropic` / `google` 等                    |
| `model_name`          | `VARCHAR(100)`  | NOT NULL                | `gpt-4o` / `claude-sonnet-5` 等                         |
| `request_type`        | `VARCHAR(30)`   | NOT NULL, CHECK         | `chat` / `completion` / `embedding` / `image` / `audio` |
| `prompt_tokens`       | `INT`           | NOT NULL                | 输入 token 数                                           |
| `completion_tokens`   | `INT`           | NOT NULL                | 输出 token 数                                           |
| `estimated_cost`      | `DECIMAL(10,6)` | NOT NULL                | 估算费用（美元）                                        |
| `request_duration_ms` | `INT`           |                         | 请求耗时（毫秒）                                        |
| `created_at`          | `TIMESTAMPTZ`   | NOT NULL                |                                                         |

## 关联

- [users](users.md) — 通过 `user_id`
- [projects](projects.md) — 通过 `project_id`（nullable）
- [tasks](tasks.md) — 通过 `task_id`（nullable）
