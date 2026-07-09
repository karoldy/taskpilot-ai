# `sprints`

Sprint 迭代表，归属于项目，用于规划阶段性开发周期。

## DDL

```sql
CREATE TABLE sprints (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id  UUID NOT NULL REFERENCES projects (id) ON DELETE CASCADE,
    name        VARCHAR(200) NOT NULL,
    name_sc     VARCHAR(200) NOT NULL,
    name_tc     VARCHAR(200) NOT NULL,
    goal        TEXT,
    status      VARCHAR(20) NOT NULL DEFAULT 'planning'
                CHECK (status IN ('planning', 'active', 'completed', 'cancelled')),
    start_date  DATE NOT NULL,
    end_date    DATE NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT sprints_dates_check CHECK (end_date >= start_date)
);

CREATE INDEX idx_sprints_project ON sprints (project_id);
CREATE INDEX idx_sprints_status  ON sprints (status);
CREATE INDEX idx_sprints_dates   ON sprints (start_date, end_date);
```

## 字段

| 字段         | 类型           | 约束                    | 说明                                              |
| ------------ | -------------- | ----------------------- | ------------------------------------------------- |
| `id`         | `UUID`         | PK                      |                                                   |
| `project_id` | `UUID`         | FK → projects, NOT NULL | 所属项目                                          |
| `name`       | `VARCHAR(200)` | NOT NULL                | Sprint 名称                                       |
| `name_sc`    | `VARCHAR(200)` | NOT NULL                | Sprint 名称（简体中文）                           |
| `name_tc`    | `VARCHAR(200)` | NOT NULL                | Sprint 名称（繁体中文）                           |
| `goal`       | `TEXT`         |                         | Sprint 目标                                       |
| `status`     | `VARCHAR(20)`  | NOT NULL, CHECK         | `planning` / `active` / `completed` / `cancelled` |
| `start_date` | `DATE`         | NOT NULL                | 开始日期                                          |
| `end_date`   | `DATE`         | NOT NULL                | 结束日期                                          |
| `created_at` | `TIMESTAMPTZ`  | NOT NULL                |                                                   |
| `updated_at` | `TIMESTAMPTZ`  | NOT NULL                |                                                   |

> **约束**: `end_date >= start_date`，Sprint 结束日期不能早于开始日期。

## 关联

- [projects](projects.md) — 通过 `project_id`
- [tasks](tasks.md) — 一对多，任务可通过 `sprint_id` 归属到 Sprint
