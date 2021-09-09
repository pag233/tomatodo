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

export function getInitPanelPosRef(
  width: number,
  height: number,
  root: HTMLElement = getdocElement(),
): UseRefReturnType<PositionType> {
  const isHorizontion = checkHorizontion();
  const top = root.clientHeight * (50 - Math.floor((isHorizontion ? width : height) / 2)) * 0.01;
  const bottom = top;
  const left = root.clientWidth * (50 - Math.floor((!isHorizontion ? width : height) / 2)) * 0.01;
  const right = left;
  return useRef<PositionType>({
    top,
    bottom,
    left,
    right,
  })
}

export function getMinWidthHeight(
  width: number,
  height: number,
  root: HTMLElement = getdocElement()
): {
  minWidth: number,
  minHeight: number,
} {
  const factor = 1.5;
  return {
    minWidth: Math.floor(root.clientWidth * width / factor * 0.01),
    minHeight: Math.floor(root.clientHeight * height / factor * 0.01),
  }
}