/**
 * 演播室软箱灯光 rig
 * 6 盏方向光组成矩形软光源，模拟左侧高位柔光窗
 */
export function SoftBoxLightRig() {
  // 软箱排列：3x2 网格
  const rigCenter = [-3.0, 3.4, 3.0];
  const rigU = [1.35, 0, -0.45]; // 宽度方向
  const rigV = [0, 1.05, 0.35]; // 高度方向
  const offsets = [
    [-1, -0.5], [0, -0.5], [1, -0.5],
    [-1,  0.5], [0,  0.5], [1,  0.5],
  ];

  return (
    <group>
      {/* 主软箱光源 */}
      {offsets.map(([u, v], i) => {
        const x = rigCenter[0] + u * rigU[0] + v * rigV[0];
        const y = rigCenter[1] + u * rigU[1] + v * rigV[1];
        const z = rigCenter[2] + u * rigU[2] + v * rigV[2];
        return (
          <directionalLight
            key={i}
            position={[x, y, z]}
            color={0xdce8fa}
            intensity={0.55}
          />
        );
      })}

      {/* 右侧暖色轮廓光 */}
      <directionalLight
        position={[4.5, -1.8, -2]}
        color={0xffe8d2}
        intensity={1.5}
      />

      {/* 扫光：窄聚光灯打边缘，增强高光 */}
      <spotLight
        position={[4.2, 1.2, 1.4]}
        intensity={9}
        angle={Math.PI / 20}
        penumbra={0.95}
        decay={2}
        target-position={[0, 0, 0.12]}
      />
    </group>
  );
}
