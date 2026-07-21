import { useMemo } from 'react';
import * as THREE from 'three';
import type { CigarettePackData } from '@/types';

interface CigaretteBoxProps {
  data: CigarettePackData;
}

/**
 * 六面体香烟盒，每个面独立纹理，真实圆角棱角
 * 正确方法：圆角长方体 + 六个面材质分别映射
 */
export function CigaretteBox({ data }: CigaretteBoxProps) {
  // 原始尺寸单位 mm → 场景单位 dm (1dm = 10cm)
  const [w, h, d] = data.dimensions.map(v => v / 10) as [number, number, number];
  // 真实烟盒圆角半径：1mm = 0.01dm
  const roundRadius = 0.01;

  // 创建材质
  const materials = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const { textures } = data;
    return [
      createMat(loader, textures.right),
      createMat(loader, textures.left),
      createMat(loader, textures.top),
      createMat(loader, textures.bottom),
      createMat(loader, textures.front),
      createMat(loader, textures.back),
    ];
  }, [data]);

  function createMat(loader: THREE.TextureLoader, url: string) {
    const tex = loader.load(url);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 32;
    return new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.96,
      metalness: 0.0,
    });
  }

  // 使用 Round-Box 方式：圆角边缘 + 每个面保持正确UV
  const geometry = useMemo(() => {
    // 创建 BoxGeometry，然后对每个顶点做圆角偏移
    const geo = new THREE.BoxGeometry(w, h, d);
    
    // 给顶点做圆角处理 — 让棱角变圆
    const position = geo.attributes.position;
    const vertex = new THREE.Vector3();
    
    for (let i = 0; i < position.count; i++) {
      vertex.fromBufferAttribute(position, i);
      
      // 对每个轴，顶点在角上，向内缩一点点做圆角
      // 这是近似圆角，足够展示效果
      const sx = Math.sign(vertex.x);
      const sy = Math.sign(vertex.y);
      const sz = Math.sign(vertex.z);
      
      if (Math.abs(vertex.x) > w/2 - roundRadius*2) {
        vertex.x = (w/2 - roundRadius) * sx;
      }
      if (Math.abs(vertex.y) > h/2 - roundRadius*2) {
        vertex.y = (h/2 - roundRadius) * sy;
      }
      if (Math.abs(vertex.z) > d/2 - roundRadius*2) {
        vertex.z = (d/2 - roundRadius) * sz;
      }
      
      position.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    position.needsUpdate = true;
    geo.computeVertexNormals();
    
    return geo;
  }, [w, h, d]);

  return (
    <group position={[0, 0, 0]}>
      <mesh geometry={geometry}>
        {materials.map((mat, i) => (
          <meshStandardMaterial key={i} attach={`material-${i}`} {...mat} />
        ))}
      </mesh>
    </group>
  );
}
