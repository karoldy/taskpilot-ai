# `departments`

部门表，支持层级结构（父子部门）。

## DDL

```sql
CREATE TABLE departments (
    id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name                 VARCHAR(100) NOT NULL,
    name_sc              VARCHAR(100) NOT NULL,
    name_tc              VARCHAR(100) NOT NULL,
    description          TEXT,
    parent_department_id UUID REFERENCES departments (id) ON DELETE SET NULL,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_dept_parent ON departments (parent_department_id);
CREATE INDEX idx_dept_name   ON departments (name);
```

## 字段

| 字段                   | 类型           | 约束                       | 说明                        |
| ---------------------- | -------------- | -------------------------- | --------------------------- |
| `id`                   | `UUID`         | PK                         |                             |
| `name`                 | `VARCHAR(100)` | NOT NULL                   | 部门名称                    |
| `name_sc`              | `VARCHAR(100)` | NOT NULL                   | 部门名称（简体中文）        |
| `name_tc`              | `VARCHAR(100)` | NOT NULL                   | 部门名称（繁体中文）        |
| `description`          | `TEXT`         |                            | 部门描述                    |
| `parent_department_id` | `UUID`         | FK → departments, nullable | 上级部门（NULL = 顶级部门） |
| `created_at`           | `TIMESTAMPTZ`  | NOT NULL                   |                             |
| `updated_at`           | `TIMESTAMPTZ`  | NOT NULL                   |                             |

## 关联

- [departments](departments.md) — 自引用 `parent_department_id`，构建部门树
- [users](users.md) — 一对多，用户通过 `department_id` 归属部门
