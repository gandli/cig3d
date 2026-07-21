# 数据模型文档

本项目数据模型简单，所有品牌数据存在 JSON 文件中，无数据库。

## 品牌数据 (`src/data/<brand>.json`)

```typescript
interface CigarettePackData {
  /** 品牌，如 "中华" */
  brand: string;
  /** 产品名，如 "硬" */
  name: string;
  /** 规格描述，如 "84mm 硬盒 20支" */
  spec: string;
  /** 烟盒尺寸，单位：厘米 [宽, 高, 厚] */
  dimensions: [number, number, number];
  /** 六个面纹理路径，相对于 public 目录 */
  textures: {
    front: string;
    back: string;
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  /** 防伪标注点列表 */
  annotations: {
    /** 唯一ID */
    id: string;
    /** 3D 坐标，单位：分米，中心原点 */
    position: [number, number, number];
    /** 标注标题 */
    title: string;
    /** 鉴别描述 */
    description: string;
  }[];
}
```

## 坐标说明

详见 [docs/tech-design.md](./tech-design.md#坐标系说明)

## 纹理文件

纹理文件放在 `public/textures/<brand>/`，命名规则见 [docs/texture-photography.md](./texture-photography.md)

## 目录树

```
public/
└── textures/
    └── brand-id/
        ├── front.jpg
        ├── back.jpg
        ├── left.jpg
        ├── right.jpg
        ├── top.jpg
        └── bottom.jpg

src/
└── data/
    └── brand-id.json  # 品牌配置
```

## 数据变更流程

1. 添加/修改纹理 → `public/textures/<brand>/`
2. 添加/修改 JSON → `src/data/<brand>.json`
3. 测试 → PR → 合并
