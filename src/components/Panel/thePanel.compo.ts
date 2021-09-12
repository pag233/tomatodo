import { useRef, UseRefReturnType } from "@/composition/common";
import { getDocElement, getRemSize } from '@/helper/dom';
import { watch } from "@vue/runtime-core";

//Panel最大延伸位置
export const BoxBoundryOffset: number = getRemSize();

export enum Position {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
}

export enum PositionEmitType {
  update = "pos:update",
  save = "pos:save",
  restore = "pos:restore"
}

export enum MaximumEmitType {
  update = "maximum:update",
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
  root: HTMLElement = getDocElement(),
  ref: typeof useRef = useRef,
): {
  pos: UseRefReturnType<PositionType>,
  maximum: UseRefReturnType<boolean>,
  savePos: () => void,
  restorePos: () => void,
} {
  const isHorizontion = checkHorizontion();
  if (isHorizontion) {
    [width, height] = [height, width];
  }
  const isFit = height < root.clientHeight && width < root.clientWidth
  // isFit && setMaximum();

  const top = isFit ? Math.floor((root.clientHeight - height) / 2) : BoxBoundryOffset;
  const bottom = top;
  const left = isFit ? Math.floor((root.clientWidth - width) / 2) : BoxBoundryOffset;
  const right = left;

  const pos = ref<PositionType>({
    top,
    bottom,
    left,
    right,
  })

  const [posState, setPos] = pos;

  const maximum = ref(!isFit);

  const [maximumState, setMaximum] = maximum;


  const [savedPos, setSavedPos] = ref<PositionType>({
    top,
    bottom,
    left,
    right,
  })

  const savePos = () => setSavedPos(posState.value);

  const restorePos = () => {
    setMaximum(false);
    setPos(savedPos.value);
  }

  watch(maximumState, () => {
    if (maximumState.value) {
      savePos()
      setPos({
        top: BoxBoundryOffset,
        bottom: BoxBoundryOffset,
        left: BoxBoundryOffset,
        right: BoxBoundryOffset,
      })
    }
  })

  return {
    pos,
    maximum,
    savePos,
    restorePos,
  }
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
