import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, DepthOfField, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { SoftBoxLightRig } from './SceneLights';
import { CigaretteBox } from './CigaretteBox';
import type { CigarettePackData, Annotation } from '@/types';

interface SceneProps {
  data: CigarettePackData;
  focused: boolean;
  isMobile: boolean;
  onAnnotationClick: (ann: Annotation) => void;
}

/**
 * 主场景：产品摄影级布光 + 后期处理
 */
export function Scene({ data, focused: _focused, isMobile, onAnnotationClick }: SceneProps) {
  // 移动端适配：FOV 更大，让相机更远，盒子更完整显示
  const cameraFov = isMobile ? 45 : 35;
  const cameraZ = isMobile ? 5.5 : 5;

  return (
    <Canvas
      camera={{ position: [0, 0, cameraZ], fov: cameraFov }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
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
        minDistance={2.5}
        maxDistance={isMobile ? 8 : 10}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={isMobile ? 0.8 : 1}
      />

      {/* 后期处理：产品摄影风格 */}
      <EffectComposer enableNormalPass={false}>
        {isMobile ? <></> : (
          <DepthOfField
            focusDistance={0.01}
            focalLength={0.1}
            bokehScale={2}
            height={480}
          />
        )}
        {isMobile ? <></> : (
          <Bloom
            luminanceThreshold={0.8}
            luminanceSmoothing={0.9}
            intensity={0.6}
            mipmapBlur
          />
        )}
        {isMobile ? <></> : (
          <ChromaticAberration offset={[0.0002, 0.0002]} />
        )}
        <Vignette eskil={false} offset={0.1} darkness={0.3} />
      </EffectComposer>

      {/* 移动端处理：双击复位 */}
      {isMobile && (
        <DoubleTapReset />
      )}
    </Canvas>
  );
}

/**
 * 移动端双击复位组件
 */
function DoubleTapReset() {
  const { controls } = useThree();
  let lastTap = 0;

  const handlePointerDown = () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      if (controls) {
        // @ts-ignore - reset camera to initial position
        controls.reset();
      }
    }
    lastTap = now;
  };

  return (
    <mesh position={[0, 0, -5]} onPointerDown={handlePointerDown} visible={false}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
}
