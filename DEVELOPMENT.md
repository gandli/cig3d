# 开发指南 - cig3d

## 环境准备

确保本地已安装：
- Node.js 18+
- npm / yarn / pnpm

## 初始化项目

```bash
# 克隆
git clone https://github.com/gandli/cig3d.git
cd cig3d

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 项目架构

### 核心组件

- **`App.tsx`** — 入口，管理品牌数据、相机聚焦状态、弹窗状态
- **`Scene.tsx`** — Three.js 场景容器，设置灯光、环境、后期处理
- **`CigaretteBox.tsx`** — 香烟盒六面体，加载纹理、处理点击交互、渲染标注热点
- **`AnnotationPopup.tsx`** — HTML 弹窗，展示防伪标注详情

### 纹理坐标说明

烟盒坐标系（单位：分米，方便对齐）：
- 原点在盒子中心
- X：左 → 右，范围 `-width/2` ~ `+width/2`
- Y：下 → 上，范围 `-height/2` ~ `+height/2`
- Z：后 → 前，范围 `-depth/2` ~ `+depth/2`

## 常见问题

### 纹理不显示？
- 检查路径是否正确：JSON 里的路径是相对于 `public/` 的，所以写 `textures/brand/file.jpg`
- 检查图片格式，推荐 JPEG，文件大小控制在 1MB 以内
- 检查大小写，GitHub Pages 大小写敏感

### 标注点位置不对？
- 对照坐标系调整 JSON 中的 `position`
- 可以先在开发模式打开浏览器 DevTools 控制台 log 坐标调试

## 占位纹理说明

首版开发时，`public/textures/zhonghua-hard/` 下没有真实照片，用占位纹理：
- 每个面生成纯色 PNG，上面标出面名称（front/back/...）
- 交互功能先跑通，你补全照片后直接替换文件即可，无需改代码

## 性能优化建议

- 纹理尺寸：推荐 1024x2048（烟盒竖长方形），不超过 2048x2048
- JPEG 质量 80% 足够，平衡质量和体积
- 多品牌切换时，可按需动态加载纹理

## 提交 PR

- 每个品牌一个 PR，方便合并
- PR 标题：`feat: add <brand> <name>`
- 确认纹理版权合法（你自己拍摄的没问题）
