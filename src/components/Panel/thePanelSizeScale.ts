import { useRef, UseRefReturnType } from "@/composition/common";
import { getdocElement } from '@/helper';

export enum Position {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
  emitType = 'update:pos'
}
export type PositionType = {
  top: number;
  left: number;
  bottom: number;
  right: number;
};
export type PositionKey = keyof PositionType

const checkHorizontion = () => screen.orientation.type.includes('landscape')
/**
 * 初始化Panel大小，所有值皆为相对于父节点维度的整数百分比
 * @param {number} width 初始宽度百分比
 * @param {number} height 初始高度百分比
 * @param {HTMLElement} root 父节点
 * @returns {typeof useRef<PositionType>} 代表坐标的响应式对象
 */
export function getInitPanelPosRef(
  width: number,
  height: number,
  root: HTMLElement = getdocElement(),
): UseRefReturnType<PositionType> {
  const isHorizontion = checkHorizontion();
  if (isHorizontion) {
    [width, height] = [height, width];
  }
  const isFit = height < root.clientHeight && width < root.clientWidth
  const top = isFit ? Math.floor((root.clientHeight - height) / 2) : 0;
  const bottom = top;
  const left = isFit ? Math.floor((root.clientWidth - width) / 2) : 0;
  const right = left;
  return useRef<PositionType>({
    top,
    bottom,
    left,
    right,
  })
}
/**
 * 初始化Panel最小大小，所有值皆为相对于父节点维度的整数百分比
 * @param width 初始宽度百分比 
 * @param height 初始高度百分比 
 * @param wfactor 相对于宽高的缩小系数
 * @param root 父节点 
 * @returns 
 */
export function getMinWidthHeight(
  width: number,
  height: number,
  wfactor = 0.5,
  hfactor = 0.5,
): {
  minWidth: number,
  minHeight: number,
} {
  return {
    minWidth: Math.floor(width * wfactor),
    minHeight: Math.floor(height * hfactor),
  }
}