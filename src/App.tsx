import { useState, useEffect } from 'react';
import { Scene } from './components/Scene';
import type { CigarettePackData } from '@/types';
import packData from './data/zhonghua-hard.json';
import './App.css';

const typedPackData = packData as CigarettePackData;

/**
 * 设备类型检测
 */
function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}

/**
 * 根组件：管理相机聚焦状态
 */
function App() {
  const [focused, setFocused] = useState(false);
  const isMobile = useMobile();

  // 点击盒子 → 切换聚焦状态
  const handleBoxClick = () => {
    if (!focused) {
      setFocused(true);
    } else {
      setFocused(false);
    }
  };

  // 双击 → 复位
  const handleDoubleClick = () => {
    setFocused(false);
  };

  return (
    <div className="w-full h-screen overflow-hidden relative safe-top safe-bottom" onDoubleClick={handleDoubleClick}>
      {/* 顶部标题栏 */}
      <div className="absolute top-4 left-0 right-0 z-10 pointer-events-none px-4">
        <h1 className="text-center text-cig-text text-sm md:text-base tracking-[0.4em] font-medium opacity-70">
          {typedPackData.brand} {typedPackData.name}
        </h1>
      </div>

      {/* 3D 场景 */}
      <div className="w-full h-full" onClick={handleBoxClick}>
        <Scene
          data={typedPackData}
          focused={focused}
          isMobile={isMobile}
        />
      </div>

      {/* 重置视角按钮 */}
      <button
        onClick={handleDoubleClick}
        className="absolute top-4 right-4 z-10 text-cig-text text-[10px] md:text-xs tracking-[0.12em] opacity-50 hover:opacity-80 transition-opacity px-3 py-1.5 rounded-full border border-cig-text/20 bg-white/30 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cig-text/40"
        aria-label="重置视角"
      >
        重置
      </button>

      {/* 底部提示 */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-cig-text text-[10px] md:text-xs tracking-[0.12em] md:tracking-[0.16em] opacity-45 pointer-events-none lowercase whitespace-nowrap">
        {isMobile ? 'swipe — rotate · tap — zoom · double-tap — reset' : 'drag — rotate · click — zoom in · double-click — reset'}
      </div>
    </div>
  );
}

export default App;
