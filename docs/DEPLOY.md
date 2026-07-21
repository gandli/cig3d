# 部署文档

## 生产部署（GitHub Pages）

### 自动部署（推荐）

本项目使用 GitHub Actions 自动部署：

1. 推送代码到 `main` 分支
2. GitHub Actions 自动构建
3. 部署到 `gh-pages` 分支
4. 站点自动更新：`https://gandli.github.io/cig3d/`

### 配置

在 `vite.config.ts` 中已配置：
```typescript
base: '/cig3d/'
```

如果你的仓库名不同，修改这里。

### 本地手动构建部署

```bash
# 构建
npm run build

# 部署到 GitHub Pages（使用 gh-pages 包）
npx gh-pages -d dist
```

## 本地开发部署

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:5173/cig3d
```

## 其他部署方式

### Cloudflare Pages

1. 绑定 GitHub 仓库
2. 构建命令：`npm run build`
3. 输出目录：`dist`
4. 部署完成

### Vercel / Netlify

直接导入 GitHub 仓库，默认配置即可部署，无需额外修改。

## 域名配置

如果使用自定义域名，修改 `vite.config.ts` 中的 `base` 为你的路径：
```typescript
base: '/'  // 自定义域名根路径
```
