# `positions`

职位表。

## DDL

```sql
CREATE TABLE positions (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(100) NOT NULL,
    name_sc     VARCHAR(100) NOT NULL,
    name_tc     VARCHAR(100) NOT NULL,
    description TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_pos_name ON positions (name);
```

## 字段

| 字段          | 类型           | 约束     | 说明                 |
| ------------- | -------------- | -------- | -------------------- |
| `id`          | `UUID`         | PK       |                      |
| `name`        | `VARCHAR(100)` | NOT NULL | 职位名称             |
| `name_sc`     | `VARCHAR(100)` | NOT NULL | 职位名称（简体中文） |
| `name_tc`     | `VARCHAR(100)` | NOT NULL | 职位名称（繁体中文） |
| `description` | `TEXT`         |          | 职位描述             |
| `created_at`  | `TIMESTAMPTZ`  | NOT NULL |                      |
| `updated_at`  | `TIMESTAMPTZ`  | NOT NULL |                      |

## 关联

- [users](users.md) — 一对多，用户通过 `position_id` 关联职位
