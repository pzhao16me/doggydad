---
title: Git 工作流最佳实践
date: 2025-12-14
description: 学习如何使用 Git 进行高效的版本控制，包括分支策略、提交规范和协作技巧。
tags: [Git, 版本控制, 最佳实践]
---

# Git 工作流最佳实践

Git 是现代软件开发不可或缺的工具。掌握 Git 工作流能显著提升团队协作效率。

## 基础概念

### Git vs GitHub

- **Git**：分布式版本控制系统
- **GitHub**：基于 Git 的代码托管平台

### 核心概念

```
工作区（Working Directory）
    ↓ git add
暂存区（Staging Area）
    ↓ git commit
本地仓库（Local Repository）
    ↓ git push
远程仓库（Remote Repository）
```

## 常用分支策略

### 1. Git Flow

最经典的分支模型，适合发布周期较长的项目：

```bash
# 主分支
main (master)    # 生产环境代码
develop          # 开发分支

# 辅助分支
feature/*        # 功能开发
release/*        # 发布准备
hotfix/*         # 紧急修复
```

**工作流程**：

1. 从 `develop` 创建 `feature` 分支
2. 完成功能后合并回 `develop`
3. 准备发布时创建 `release` 分支
4. 测试通过后合并到 `main` 和 `develop`

### 2. GitHub Flow

更简单的模型，适合持续部署：

```bash
main             # 始终可部署
feature/*        # 功能分支
```

**步骤**：
1. 从 `main` 创建分支
2. 添加提交
3. 发起 Pull Request
4. Code Review
5. 合并到 `main`
6. 立即部署

### 3. Trunk-Based Development

极简模型，适合高频部署团队：

- 所有开发直接在 main 分支或短生命周期分支
- 使用 feature flags 控制功能发布

## 提交信息规范

好的提交信息是团队协作的基础。

### Conventional Commits 规范

```bash
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型**：

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档变更 |
| `style` | 代码格式（不影响代码运行） |
| `refactor` | 重构 |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建过程或辅助工具的变动 |

**示例**：

```bash
feat(auth): add OAuth2 login support

Implement OAuth2 authentication with Google and GitHub providers.
Users can now log in using their social accounts.

Closes #123
```

## 实用 Git 命令

### 1. 撤销操作

```bash
# 撤销工作区修改
git checkout -- <file>

# 撤销暂存区的文件
git reset HEAD <file>

# 撤销最后一次提交（保留更改）
git reset --soft HEAD^

# 撤销最后一次提交（丢弃更改）
git reset --hard HEAD^
```

### 2. 分支管理

```bash
# 创建并切换到新分支
git checkout -b feature/new-feature

# 查看所有分支
git branch -a

# 删除本地分支
git branch -d feature/old-feature

# 删除远程分支
git push origin --delete feature/old-feature
```

### 3. 合并与变基

```bash
# 合并分支（保留所有提交历史）
git merge feature/branch

# 变基（线性历史）
git rebase main

# 交互式变基（修改提交历史）
git rebase -i HEAD~3
```

### 4. 储藏（Stash）

```bash
# 储藏当前更改
git stash

# 查看储藏列表
git stash list

# 应用最近的储藏
git stash apply

# 应用并删除储藏
git stash pop
```

## 协作技巧

### Pull Request 最佳实践

1. **保持 PR 小而专注**
   - 每个 PR 只解决一个问题
   - 代码变更控制在 400 行以内

2. **写好 PR 描述**
   ```markdown
   ## 变更内容
   实现了用户登录功能
   
   ## 测试方法
   1. 访问 /login 页面
   2. 输入用户名密码
   3. 验证登录成功
   
   ## 截图
   [登录界面截图]
   ```

3. **及时响应 Code Review**
   - 24小时内回复评论
   - 对每个建议给予反馈

### Code Review 检查清单

- [ ] 代码符合团队规范
- [ ] 有足够的测试覆盖
- [ ] 没有遗留的 TODO 或调试代码
- [ ] 文档已更新
- [ ] 性能影响已评估

## 常见问题解决

### 1. 合并冲突

```bash
# 1. 拉取最新代码
git pull origin main

# 2. 手动解决冲突
# 编辑冲突文件，移除 <<<<<<<, =======, >>>>>>> 标记

# 3. 标记为已解决
git add <conflicted-file>

# 4. 完成合并
git commit
```

### 2. 误提交敏感信息

```bash
# 从历史中完全删除文件
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch <sensitive-file>" \
  --prune-empty --tag-name-filter cat -- --all

# 或使用 BFG Repo-Cleaner（更快）
bfg --delete-files <sensitive-file>
```

### 3. 找回丢失的提交

```bash
# 查看所有操作记录
git reflog

# 恢复到特定提交
git reset --hard <commit-hash>
```

## 工具推荐

### GUI 工具
- **GitKraken**：跨平台，界面美观
- **SourceTree**：免费，功能全面
- **GitHub Desktop**：简单易用

### CLI 增强
- **tig**：终端 Git 界面
- **lazygit**：CLI 交互式 Git 工具
- **git-extras**：Git 命令扩展

### Git Hooks
```bash
# pre-commit hook：检查代码格式
#!/bin/sh
npm run lint
```

## 学习资源

**在线教程**：
- [Pro Git 书籍](https://git-scm.com/book/zh/v2)（免费）
- [Learn Git Branching](https://learngitbranching.js.org/)（可视化学习）

**备忘清单**：
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

**高级技巧**：
- [Git Internals](https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain)

## 总结

掌握 Git 工作流需要时间和实践，但投资是值得的。记住以下原则：

1. ✅ 频繁提交，小步迭代
2. ✅ 写清晰的提交信息
3. ✅ 经常同步远程仓库
4. ✅ 使用分支进行功能开发
5. ✅ Code Review 是提高代码质量的关键

---

Happy Coding! 🚀
