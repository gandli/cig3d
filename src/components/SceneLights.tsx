/**
 * 演播室灯光 rig
 * 针对极微倒角烟盒：主光源柔边但保持形状，逆光突出轮廓
 */
export function SoftBoxLightRig() {
  return (
    <group>
      {/* 环境光 */}
      <ambientLight intensity={0.3} color={0xffffff} />

      {/* 主光源：左前方，柔和但有一定硬度，突出极微倒角形状 */}
      <directionalLight
        position={[-3.5, 3.8, 2.8]}
        color={0xe8f4ff}
        intensity={1.1}
      />

      {/* 补光：右后方打轮廓，让棱角从背景分离 */}
      <directionalLight
        position={[3.2, 1.5, -3.0]}
        color={0xfff0e6}
        intensity={0.7}
      />

      {/* 顶光：柔和打亮顶面 */}
      <directionalLight
        position={[0, 4.8, 0]}
        color={0xffffff}
        intensity={0.6}
      />

      {/* 窄聚光灯强调棱角交界 */}
      <spotLight
        position={[4.5, 3.5, 1.8]}
        intensity={6}
        angle={Math.PI / 20}
        penumbra={0.3}
        decay={2}
        target-position={[0, 0, 0]}
      />
    </group>
  );
}
