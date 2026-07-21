/**
 * 单包香烟包装数据
 */
export interface CigarettePackData {
  /** 品牌名称，如 "中华" */
  brand: string;
  /** 产品名称，如 "硬" */
  name: string;
  /** 规格描述，如 "84mm 硬盒 20支" */
  spec: string;
  /** 烟盒尺寸，单位：厘米 [宽, 高, 厚] */
  dimensions: [number, number, number];
  /** 六个面纹理路径，相对 public 目录 */
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
    id: string;
    /** 标注点在 3D 空间的坐标 */
    position: [number, number, number];
    /** 标注标题，如 "中华防伪标志" */
    title: string;
    /** 鉴别描述，说明真伪差异 */
    description: string;
  }[];
}
