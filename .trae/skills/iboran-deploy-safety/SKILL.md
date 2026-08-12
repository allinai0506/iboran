---
name: "iboran-deploy-safety"
description: "防呆清单：小改动部署到 iboran 官网前的必检项，避免简单任务被复杂化。当用户要求部署到官网、推送生产、修改 Footer/组件外链等小改动时必须调用。"
---

# iboran 小改动部署防呆清单

本技能沉淀自 2026-08-07 一次"加 2 处外链耗时数小时"的教训。真正代码改动只占 5% 时间，95% 浪费在错误路径上。下面 6 项必检，任一未通过都不应开始动手。

## 部署架构（先读这一段）

**iboran 官网部署方式 = SSH 直连服务器，不走 GitHub Actions。**

- 本地代码：`/Users/user/iboran`（macOS）
- 生产服务器：`root@47.111.2.171`，App 目录 `/opt/iboran`
- 部署链路：本地 `rsync` 源码到服务器 → 服务器 `docker build` 构建 Linux 镜像 → `docker compose` 重启容器
- GitHub 仓库 `allinai0506/iboran`：仅作为代码历史/备份源，**push 后不会自动部署**（仓库没配置 Actions secrets）
- `./deploy-prod.sh` 脚本：即上述 rsync + docker build + restart 流程的封装，可使用，但其本地 TypeScript check 步骤依赖 `pnpm install`，若未安装会失败，可跳过

**关键事实**：不要假设 `git push origin main` 后生产会自动更新。必须显式执行 rsync + 服务器 build。

## 触发场景

- 用户说"部署到官网"、"推送生产"、"上线"
- 修改 Footer / 导航 / 外链等小 UI 改动
- 任何涉及生产环境发布的任务

## 必检清单（按顺序执行）

### 1. 确认实际使用的组件（最重要）

**问题**：iboran 有两套 Footer，改错等于白做：
- `src/Footer/Component.tsx` — Payload CMS 默认 Footer（**未使用**）
- `src/components/Footer/index.tsx` — 自定义 Footer（**实际使用**）

**检查方法**：grep layout.tsx 的 import 语句，确认实际导入路径
```bash
grep -n "Footer" src/app/\(frontend\)/layout.tsx
```
看到 `import { Footer } from '@/components/Footer'` 才能改 `src/components/Footer/index.tsx`。

**通用原则**：修改任何组件前，先 grep 确认它被哪里导入使用。不要假设"同名文件就是被用的那个"。

### 2. 确认 Git remote（仅用于代码历史同步）

**问题**：origin 仓库可能失效，commit/push 会失败。

**检查方法**：
```bash
git remote -v
git ls-remote origin main 2>&1 | head -3
```

**当前配置**：
- `origin` → `git@github-allinai:allinai0506/iboran.git`（SSH 别名）

**注意**：push 到 origin 只是同步代码历史，**不会触发生产部署**。生产部署必须走步骤 5 的 SSH 直连流程。

### 3. 认证方式：SSH 优先，禁用 PAT

**问题**：使用 Classic PAT（`ghp_xxx`）是高危操作，明文发送且权限过大。

**规则**：
- ✅ GitHub 使用 SSH key（`~/.ssh/id_ed25519_allinai`）+ `~/.ssh/config` 别名 `github-allinai`
- ✅ 生产服务器使用本机已配置的 SSH key 直连 `root@47.111.2.171`
- ❌ 永不使用 PAT，尤其是 Classic PAT
- 若用户主动提供 PAT，**拒绝并引导配置 SSH**

**验证 SSH 可用**：
```bash
ssh -T git@github-allinai 2>&1 | head -3          # GitHub
ssh root@47.111.2.171 'echo OK'                    # 生产服务器
```

### 4. 简单任务不用 worktree

**问题**：2026-08-07 为加 2 行外链创建了 `/tmp/iboran-deploy` worktree，导致代码分散，事后要手动同步回主目录。

**规则**：
- 改动 < 5 文件 → 直接在主工作目录 `/Users/user/iboran` 的 `main` 分支操作
- worktree 仅用于：长期并行开发、破坏性实验、多 agent 协作
- 简单改动用 worktree 纯属增加复杂度

### 5. 部署：SSH 直连服务器 rsync + Docker build（唯一真实路径）

**这是 iboran 官网部署的唯一真实路径，不走 GitHub Actions。**

```bash
cd /Users/user/iboran

# 1. rsync 同步源码到服务器（排除 .git/.env/.next/node_modules 等）
rsync -az --delete \
  --exclude='.git' --exclude='.env' --exclude='.env.*' \
  --exclude='.next' --exclude='node_modules' --exclude='.pnpm-store' \
  --exclude='tmp' --exclude='backups' --exclude='*.log' --exclude='*.tar*' --exclude='*.zip' \
  ./ root@47.111.2.171:/opt/iboran/

# 2. 服务器上构建 Docker 镜像并重启（--network host 是必需的，build 时连 MongoDB）
ssh root@47.111.2.171 'set -e; cd /opt/iboran; \
  docker build --network host \
    --build-arg NEXT_PUBLIC_SERVER_URL=https://www.iboran.com \
    -t iboran-app:latest . ; \
  docker compose -f docker-compose.prod.yml up -d --no-build app ; \
  sleep 10; \
  docker ps --filter name=iboran-app --format "table {{.Names}}\t{{.Status}}"'
```

**关于 `./deploy-prod.sh`**：
- 该脚本就是上述 rsync + docker build + restart 流程的封装
- 但它第 1 步会先跑 `pnpm exec tsc --noEmit`，若本地依赖未安装会失败
- 失败时可直接用上面的命令绕过 TS check（服务器 build 会做完整检查）

**为什么不用 GitHub Actions**：
- allinai0506/iboran 仓库未配置 Actions secrets（SSH_PRIVATE_KEY、SERVER_HOST 等）
- 即使配置，当前流程 SSH 直连更直接、可控
- 代码 push 到 GitHub 仅作历史备份，不参与部署

### 6. 服务器基础设施预检（可选，部署异常时执行）

若部署失败或服务器异常，先检查：

```bash
# 磁盘空间（< 5GB 需先清理）
ssh root@47.111.2.171 'df -h / | tail -1'

# MongoDB 健康
ssh root@47.111.2.171 'docker ps --filter name=iboran-mongo --format "{{.Status}}"'

# App 容器健康
ssh root@47.111.2.171 'docker ps --filter name=iboran-app --format "{{.Status}}"'
```

**已知陷阱**：
- 磁盘 100% 满 → Docker 构建失败、MongoDB 崩溃
- MongoDB WiredTiger 损坏 → 需 `mongod --repair`（见 DEPLOYMENT.md）
- 清理磁盘：`docker system prune -a -f --volumes`（注意会删未用镜像）

## 标准小改动部署流程

通过以上 6 项检查后，执行：

```bash
cd /Users/user/iboran

# 1. 确认在 main 分支且工作区状态
git branch --show-current
git status

# 2. 改动代码（仅暂存目标文件，不用 git add -A）
git add src/components/Footer/index.tsx
git commit -m "feat: add digivoucher external link"

# 3. 推送到 origin（仅同步代码历史，不会触发部署）
git push origin main

# 4. SSH 直连服务器部署（rsync + Docker build + restart）
rsync -az --delete \
  --exclude='.git' --exclude='.env' --exclude='.env.*' \
  --exclude='.next' --exclude='node_modules' --exclude='.pnpm-store' \
  --exclude='tmp' --exclude='backups' --exclude='*.log' --exclude='*.tar*' --exclude='*.zip' \
  ./ root@47.111.2.171:/opt/iboran/
ssh root@47.111.2.171 'set -e; cd /opt/iboran; \
  docker build --network host \
    --build-arg NEXT_PUBLIC_SERVER_URL=https://www.iboran.com \
    -t iboran-app:latest . ; \
  docker compose -f docker-compose.prod.yml up -d --no-build app ; \
  sleep 10'

# 5. 验证生产（关键：必须检查具体改动，不要只看 HTTP 200！）
# 示例 1：验证 Footer 外链
curl -s https://www.iboran.com/ | grep -c "digivoucher"
# 示例 2：验证 CTA 按钮 CSS 类
curl -s https://www.iboran.com/solution/electronic-archives | python3 -c "
import sys, re
html = sys.stdin.read()
for label in ['免费预约产品演示', '下载管理白皮书', '访问数智凭证平台']:
    p = html.find(label)
    before = html[max(0,p-600):p]
    m = list(re.finditer(r'class=\"([^\"]+)\"', before))
    cls = m[-1].group(1) if m else ''
    print(f'{label}: whitespace-nowrap={\"whitespace-nowrap\" in cls}')"
```

## 反模式（禁止）

1. **未确认组件就改** — 改完发现改了未使用的文件
2. **用 PAT 认证** — 高危，明文发送
3. **简单任务用 worktree** — 增加不必要的复杂度
4. **只 push 不部署** — 以为 `git push origin main` 后生产会自动更新（iboran 不走 GitHub Actions 部署，push 只是同步代码历史）
5. **git add -A / git add .** — 可能误提交 .env、secrets
6. **服务器磁盘满才报警** — 应预检
7. **只验证 HTTP 200，不验证具体改动** — 2026-08-08 教训：推送成功了但代码没同步到服务器，只看 200 以为部署好了，实际是旧缓存。必须 grep 验证新增 class/label。

## 历史教训

- **2026-08-07**：加 2 处外链耗时数小时。根因：改错 Footer 组件 + PAT 认证 + 不必要 worktree + MongoDB 损坏 + 磁盘满 + 未走标准部署流程。教训：简单任务也必须走防呆清单。
- **2026-08-08**：加 CSS class 以为部署了，实际是 `git push origin main` 后以为 GitHub Actions 会自动部署，但 allinai0506 仓库根本没配置 Actions secrets，文件没同步到服务器，HTTP 200 只是旧缓存。教训：iboran 部署方式是 SSH 直连服务器（rsync + Docker build），不走 GitHub Actions；验证必须检查具体改动（grep class/label），不能只看 HTTP 状态码。
