# cig3d

> 中国香烟 3D 交互式真伪鉴别工具 · 基于 React Three Fiber

## 介绍

cig3d 是一个开放的 Web 3D 项目，通过交互式 3D 模型展示中国常见香烟包装，帮助用户对比鉴别真伪。项目采用数据驱动设计，可方便扩展添加更多品牌。

### 核心特性

- 📦 **数据驱动纹理系统** — 每个品牌通过 JSON 配置包装六面纹理，增量扩展无需改代码
- 🎨 **产品摄影级渲染** — 演播室光影 + PBR 材质 + 后期处理，还原真实包装细节
- 🔍 **交互式鉴别** — 点击聚焦放大、拖拽旋转查看、防伪点热点标注
- 🚀 **现代技术栈** — Vite + React + TypeScript + React Three Fiber + GSAP

## 快速开始

```bash
# 克隆项目
git clone https://github.com/gandli/cig3d.git
cd cig3d

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```text
cig3d/
├── public/
│   └── textures/          # 包装纹理资产
│       └── zhonghua-hard/  # 中华（硬）纹理
│           ├── front.jpg
│           ├── back.jpg
│           ├── left.jpg
│           ├── right.jpg
│           ├── top.jpg
│           └── bottom.jpg
├── src/
│   ├── components/        # React 组件
│   │   ├── CigaretteBox.tsx    # 香烟盒组件
│   │   ├── Scene.tsx           # Three.js 场景
│   │   └── AnnotationPopup.tsx # 防伪标注弹窗
│   ├── data/              # 品牌数据
│   │   └── zhonghua-hard.json  # 中华（硬）配置
│   ├── types/            # TypeScript 类型定义
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
└── README.md
```

## 数据格式

每个品牌一个 JSON 配置文件，定义纹理和防伪标注：

```typescript
interface CigarettePackData {
  brand: string;
  name: string;
  spec: string;
  dimensions: [number, number, number]; // 宽高深，单位厘米
  textures: {
    front: string;
    back: string;
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  annotations: {
    id: string;
    position: [number, number, number]; // 3D 坐标
    title: string;
    description: string;
  }[];
}
```

## Roadmap

- [x] MVP：中华（硬）单盒六面体展示 + 交互 + 防伪标注
- [ ] 一条烟展开 → 10 盒排列
- [ ] 单盒开盖 → 展示内部 20 支香烟
- [ ] 品牌选择器 → 多品牌切换
- [ ] 移动端适配

## 贡献

欢迎贡献！你可以：
- 提供更多品牌包装高清照片
- 修正防伪鉴别要点
- 改进交互和渲染效果

## 免责声明

本项目仅用于教育和技术研究目的。所有品牌商标归原公司所有。

## 许可

MIT
