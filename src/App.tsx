import { useState } from 'react';
import { Scene } from './components/Scene';
import { AnnotationPopup } from './components/AnnotationPopup';
import type { Annotation } from '@/types';
import type { CigarettePackData } from '@/types';
import packData from './data/zhonghua-hard.json';
import './App.css';

const typedPackData = packData as CigarettePackData;

/**
 * 根组件：管理相机聚焦状态和标注弹窗
 */
function App() {
  const [focused, setFocused] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation | null>(null);

  // 点击盒子 → 切换聚焦状态
  const handleBoxClick = () => {
    if (!focused) {
      setFocused(true);
    } else {
      setFocused(false);
      setSelectedAnnotation(null);
    }
  };

  const handleAnnotationClick = (ann: Annotation) => {
    setSelectedAnnotation(ann);
  };

  const handleCloseAnnotation = () => {
    setSelectedAnnotation(null);
  };

  // 双击 → 复位
  const handleDoubleClick = () => {
    setFocused(false);
    setSelectedAnnotation(null);
  };

  return (
    <div className="w-full h-screen overflow-hidden relative" onDoubleClick={handleDoubleClick}>
      {/* 标题栏 */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <h1 className="text-center text-[#3c342a] text-sm tracking-[0.4em] font-medium opacity-70">
          {typedPackData.brand} {typedPackData.name}
        </h1>
      </div>

      {/* 3D 场景 */}
      <div className="w-full h-full" onClick={handleBoxClick}>
        <Scene
          data={typedPackData}
          onAnnotationClick={handleAnnotationClick}
        />
      </div>

      {/* 防伪标注弹窗 */}
      <AnnotationPopup
        annotation={selectedAnnotation}
        onClose={handleCloseAnnotation}
      />

      {/* 底部提示 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#3c342a] text-xs tracking-[0.16em] opacity-45 pointer-events-none lowercase">
        drag — rotate · click — zoom in · double-click — reset
      </div>
    </div>
  );
}

export default App;
