# `document_versions`

文档版本历史，每次编辑生成一个不可变快照。

## DDL

```sql
CREATE TABLE document_versions (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id    UUID NOT NULL REFERENCES documents (id) ON DELETE CASCADE,
    version_number INT NOT NULL,
    content        TEXT NOT NULL,
    created_by     UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (document_id, version_number)
);

CREATE INDEX idx_dv_document ON document_versions (document_id);
```

## 字段

| 字段             | 类型          | 约束                     | 说明         |
| ---------------- | ------------- | ------------------------ | ------------ |
| `id`             | `UUID`        | PK                       |              |
| `document_id`    | `UUID`        | FK → documents, NOT NULL |              |
| `version_number` | `INT`         | NOT NULL                 | 版本号，自增 |
| `content`        | `TEXT`        | NOT NULL                 | 该版本快照   |
| `created_by`     | `UUID`        | FK → users, NOT NULL     |              |
| `created_at`     | `TIMESTAMPTZ` | NOT NULL                 |              |

> `(document_id, version_number)` 联合唯一，保证同一文档版本号不重复。

## 关联

- [documents](documents.md) — 通过 `document_id`
- [users](users.md) — 通过 `created_by`
