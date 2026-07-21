import { useMemo } from 'react';
import * as THREE from 'three';
import type { CigarettePackData, Annotation } from '@/types';

interface CigaretteBoxProps {
  data: CigarettePackData;
  onAnnotationClick: (ann: Annotation) => void;
}

/**
 * 六面体香烟盒，每个面独立纹理
 */
export function CigaretteBox({ data, onAnnotationClick }: CigaretteBoxProps) {
  // 尺寸转成分米（Three.js 场景单位）
  const [w, h, d] = data.dimensions.map(v => v / 10) as [number, number, number];

  // 创建六个面的材质，每个面加载对应纹理
  const materials = useMemo(() => {
    const textureLoader = new THREE.TextureLoader();
    const { textures } = data;

    const createMaterial = (url: string) => {
      const texture = textureLoader.load(url);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 16;
      return new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.8,
        metalness: 0.1,
      });
    };

    return [
      createMaterial(textures.right), // +X
      createMaterial(textures.left),  // -X
      createMaterial(textures.top),   // +Y
      createMaterial(textures.bottom), // -Y
      createMaterial(textures.front), // +Z (正面)
      createMaterial(textures.back),  // -Z (背面)
    ];
  }, [data]);

  // 处理标注热点点击
  const handleAnnotationClick = (e: any, ann: Annotation) => {
    e.stopPropagation();
    onAnnotationClick(ann);
  };

  return (
    <group>
      {/* 烟盒主体 */}
      <mesh>
        <boxGeometry args={[w, h, d]} />
        {materials.map((mat, i) => (
          <meshStandardMaterial key={i} attach={`material-${i}`} {...mat} />
        ))}
      </mesh>

      {/* 防伪标注热点 */}
      {data.annotations.map((ann) => (
        <mesh
          key={ann.id}
          position={ann.position.map(p => p / 10) as [number, number, number]}
          onClick={(e) => handleAnnotationClick(e, ann)}
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ffd700" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}
