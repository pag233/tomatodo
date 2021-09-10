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
 * 初始化Panel大小，像素值
 * @param {number} width 初始宽度
 * @param {number} height 初始高度
 * @param {HTMLElement} root 父节点
 * @returns 代表坐标的响应式对象
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
 * 初始化Panel最小大小
 * @param width 初始宽
 * @param height 初始高
 * @param wfactor 相对于宽的缩小系数
 * @param hfactor 相对于高的缩小系数
 * @param root 父节点 
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