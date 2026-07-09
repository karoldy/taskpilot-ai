---
description: Stage all changes, commit with Conventional Commits, and push to remote
---

请执行以下步骤，将当前工作区的变更提交并推送到远程仓库：

## 步骤

1. **查看状态** — 运行 `git status` 了解当前变更
2. **暂存所有变更** — 运行 `git add .`
3. **生成提交信息** — 根据变更内容，按 Conventional Commits 规范自动生成中文 commit message，格式为 `<type>(<scope>): <中文描述>`
4. **提交** — 运行 `git commit -m "<生成的message>"`（不要加 `Co-Authored-By` 尾注）
5. **推送** — 运行 `git push`

## 规则

- type 从以下中选择：`feat` `fix` `docs` `style` `refactor` `perf` `test` `chore` `revert` `build` `ci`
- scope 根据变更涉及的应用/包选择：`web` `api` `common` `workspace` `project` `claude`
- 若无明显的 scope，使用 `project`
- 提交信息使用中文描述，简洁明了
- 全部步骤自动执行，无需用户逐项确认
