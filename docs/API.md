# API 文档

本项目是纯前端静态应用，**无后端 API**，所有数据本地加载。

## 模块导出

### `src/types`

```typescript
import type { CigarettePackData, Annotation } from '@/types';
```

类型定义见 [DB.md](./DB.md)。

### 组件 API

#### `CigaretteBox`

```tsx
interface CigaretteBoxProps {
  data: CigarettePackData;       // 品牌数据
  focused: boolean;              // 是否聚焦
  onAnnotationClick: (ann: Annotation) => void; // 点击标注回调
}
```

#### `Scene`

```tsx
interface SceneProps {
  children: React.ReactNode;
}
```

包裹 Three.js 场景，处理灯光、环境、后期。

#### `AnnotationPopup`

```tsx
interface AnnotationPopupProps {
  annotation: Annotation | null;  // 当前选中标注，null 不显示
  onClose: () => void;           // 关闭回调
}
```

## 纹理加载

Three.js 自动从 `public/` 加载纹理，路径按 JSON 配置，不需要特殊 API。

## 外部依赖 API

- React Three Fiber: https://docs.pmnd.rs/react-three-fiber/
- Drei: https://github.com/pmndrs/drei
- GSAP: https://greensock.com/docs/
- Three.js: https://threejs.org/docs/
