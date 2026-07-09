# `documents`

文档表，支持项目文档和个人文档（`project_id` 为 NULL）。

## DDL

```sql
CREATE TABLE documents (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id    UUID REFERENCES projects (id) ON DELETE SET NULL,
    document_code VARCHAR(30) NOT NULL UNIQUE,
    title         VARCHAR(500) NOT NULL,
    content     TEXT NOT NULL DEFAULT '',
    creator_id  UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    updated_by  UUID REFERENCES users (id) ON DELETE SET NULL,
    status      BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_docs_project      ON documents (project_id);
CREATE INDEX idx_docs_doc_code     ON documents (document_code);
CREATE INDEX idx_docs_creator      ON documents (creator_id);
CREATE INDEX idx_docs_status     ON documents (status) WHERE status = TRUE;
CREATE INDEX idx_docs_updated_at ON documents (updated_at DESC);
```

## 字段

| 字段            | 类型           | 约束                    | 说明                         |
| --------------- | -------------- | ----------------------- | ---------------------------- |
| `id`            | `UUID`         | PK                      |                              |
| `project_id`    | `UUID`         | FK → projects, nullable | 所属项目（NULL = 个人文档）  |
| `document_code` | `VARCHAR(30)`  | UNIQUE, NOT NULL        | 文档编码，如 `EC-DOC-1`      |
| `title`         | `VARCHAR(500)` | NOT NULL                |                              |
| `content`       | `TEXT`         | NOT NULL                | Markdown / 富文本            |
| `creator_id`    | `UUID`         | FK → users, NOT NULL    | 创建者                       |
| `updated_by`    | `UUID`         | FK → users              | 最后修改人                   |
| `status`        | `BOOLEAN`      | NOT NULL, DEFAULT TRUE  | `TRUE` 正常 / `FALSE` 已删除 |
| `created_at`    | `TIMESTAMPTZ`  | NOT NULL                |                              |
| `updated_at`    | `TIMESTAMPTZ`  | NOT NULL                |                              |

> 查询默认过滤 `WHERE status = TRUE`，删除操作改为 `UPDATE SET status = FALSE`。

## 关联

- [projects](projects.md) — 通过 `project_id`（nullable）
- [users](users.md) — 通过 `creator_id` / `updated_by`
- [document_versions](document_versions.md) — 一对多
