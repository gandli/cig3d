# 开发规范 - cig3d

## 技术栈约定

- 框架：React 18 + TypeScript + Vite
- 3D 渲染：React Three Fiber (@react-three/fiber) + Three.js
- 辅助组件：Drei (@react-three/drei)
- 动画：GSAP
- CSS：Tailwind CSS v4

## 设计原则

1. **数据驱动** — 品牌数据全在 JSON，加新品牌不改核心代码
2. **增量迭代** — MVP 单盒 → 逐步扩展一条/烟支
3. **占位优先** — 先用占位纹理跑通交互，后换真实照片
4. **可扩展** — 每个品牌独立配置，不硬编码

## 目录结构

```
cig3d/
├── public/
│   └── textures/          # 纹理资产，按品牌分目录
│       └── <brand-name>/  # 品牌目录，放 front/back/left/right/top/bottom.jpg
├── src/
│   ├── components/        # React 组件
│   │   ├── CigaretteBox.tsx   # 香烟盒主体组件
│   │   ├── Scene.tsx          # Three.js 场景容器
│   │   └── AnnotationPopup.tsx # 防伪标注弹窗
│   ├── data/              # 品牌 JSON 配置
│   ├── types/             # TypeScript 类型定义
│   ├── App.tsx            # 根组件
│   └── main.tsx           # 入口
├── AGENTS.md              # 开发规范（本文件）
├── DEVELOPMENT.md         # 开发流程指南
├── README.md              # 项目介绍
└── package.json
```

## 加新品牌流程

1. 在 `public/textures/<brand-id>/` 放六张图：`front.jpg back.jpg left.jpg right.jpg top.jpg bottom.jpg`
2. 在 `src/data/<brand-id>.json` 复制 `zhonghua-hard.json` 修改
3. 在 `App.tsx` 导入数据，更新品牌列表
4. 测试纹理加载和标注位置
5. PR 提交

## UI 原则

- 深色/浅色背景自动适配
- 移动端触控支持（拖拽旋转、双击放大）
- 返回按钮/重置视角方便操作
- 防伪标注不遮挡 3D 视图

## 部署

- 部署到 GitHub Pages：`npm run build` → 部署 `dist/`
- 基础路径配置：`vite.config.ts` 中设置 `base: '/cig3d/'`

## 核对清单（提交 PR 前）

- [ ] TypeScript 编译通过
- [ ] 纹理路径正确，相对 `public/`
- [ ] 标注位置坐标合理（在盒子表面）
- [ ] 文案无错别字
