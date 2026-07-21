import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, DepthOfField, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { SoftBoxLightRig } from './SceneLights';
import { CigaretteBox } from './CigaretteBox';
import type { CigarettePackData, Annotation } from '@/types';

interface SceneProps {
  data: CigarettePackData;
  onAnnotationClick: (ann: Annotation) => void;
}

/**
 * 主场景：产品摄影级布光 + 后期处理
 */
export function Scene({ data, onAnnotationClick }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 35 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
      }}
    >
      <color attach="background" args={['#d6d0c6']} />

      {/* 演播室灯光 */}
      <SoftBoxLightRig />

      {/* 背景环境 — 大理石渐变地板 */}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[46, 46]} />
        <meshBasicMaterial color="#e8e4dc" />
      </mesh>

      {/* 烟盒主体 */}
      <CigaretteBox data={data} onAnnotationClick={onAnnotationClick} />

      {/* 交互控制：拖拽旋转缩放 */}
      <OrbitControls
        enablePan={false}
        minDistance={2}
        maxDistance={10}
      />

      {/* 后期处理：产品摄影风格 */}
      <EffectComposer enableNormalPass={false}>
        <DepthOfField
          focusDistance={0.01}
          focalLength={0.1}
          bokehScale={2}
          height={480}
        />
        <Bloom
          luminanceThreshold={0.8}
          luminanceSmoothing={0.9}
          intensity={0.6}
          mipmapBlur
        />
        <ChromaticAberration offset={[0.0002, 0.0002]} />
        <Vignette eskil={false} offset={0.1} darkness={0.3} />
      </EffectComposer>
    </Canvas>
  );
}
