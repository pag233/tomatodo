import { ref, Ref, ComputedRef } from "vue";
import { computed, watch, provide, readonly, inject } from "@vue/runtime-core";
import { useRef } from "@/composition/common";
import { getDocElement, getRemSize } from '@/composition/dom';
import { useWatchBreakPoint } from "@/composition/useWatchBreakPoint";

import { panelBreakPoints } from "./thePanelBreakPoint";


//Panel最大延伸位置
export const BoxBoundryOffset: number = getRemSize();

export type PositionType = {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

export type PositionKey = keyof PositionType

export enum Position {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
}

export enum PositionEmitType {
  update = "pos:update",
  save = "pos:save",
  restore = "pos:restore",
}

export enum MaximumEmitType {
  update = "maximum:update",
}

const checkHorizontion = () => screen.orientation.type.includes('landscape')
/**
 * 初始化Panel大小，像素值
 * @param {number} width 初始宽度
 * @param {number} height 初始高度
 * @param {HTMLElement} root 父节点 
 * @returns 代表坐标的响应式对象
 */

export type PanelPosInfo = ReturnType<typeof initPanelPosInfo>

export const PanelWidthInjectKey = Symbol('posWidth');
export const PanelPosLeftInjectKey = Symbol('posLeft');
export const PanelPosRightInjectKey = Symbol('posRight');

export function initPanelPosInfo(
  width: number,
  height: number,
  root: HTMLElement = getDocElement(),
): typeof posInfo {
  const isHorizontion = checkHorizontion();
  if (isHorizontion) {
    [width, height] = [height, width];
  }
  const isFit = height < root.clientHeight && width < root.clientWidth

  const top = isFit ? Math.floor((root.clientHeight - height) / 2) : BoxBoundryOffset;
  const bottom = top;
  const left = isFit ? Math.floor((root.clientWidth - width) / 2) : BoxBoundryOffset;
  const right = left;

  const pos = useRef<PositionType>({
    top,
    bottom,
    left,
    right,
  })

  const [posState, setPos] = pos;

  const maximum = useRef(!isFit);

  const [maximumState, setMaximum] = maximum;

  const [savedPos, setSavedPos] = useRef<PositionType>({
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
    //当最大化时保存当前位置信息
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

  const panelWidth = computed(() => (getDocElement().clientWidth - posState.value.left - posState.value.right))

  const posLeft = computed(() => posState.value.left);
  const posRight = computed(() => posState.value.right);

  const posInfo = {
    pos,
    maximum,
    savePos,
    restorePos,
    panelWidth,
  }

  provide(PanelWidthInjectKey, readonly(panelWidth));
  provide(PanelPosLeftInjectKey, readonly(posLeft));
  provide(PanelPosRightInjectKey, readonly(posRight));


  return posInfo
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

export const BarMinMaxWidthInjectkey = Symbol('barMinMaxWidth');
/**
 * 调整左侧SideBar宽度，并设置最大最小调整范围
 */
export function useSideBarWidth(initalWidth = 200, barMinWidth = 180, barMaxWidth = 600): [Ref<number>, (width: number) => void] {
  provide(BarMinMaxWidthInjectkey, [barMinWidth, barMaxWidth]);
  const [barWidth, setWidth] = useRef(initalWidth as number);
  const setBarWidth = (width: number) => {
    if (width < barMaxWidth && width > barMinWidth) {
      setWidth(width);
      return;
    }
    if (width > barMaxWidth) {
      setWidth(barMaxWidth)
    } else {
      setWidth(barMinWidth)
    }
  }
  return [
    barWidth, setBarWidth
  ]
}

export const ShowDrawerKey = Symbol('ShowDrawer');
/**
 * 
 * @param panelWidth Panel宽度，以判断出Draewr何时折叠。
 * @returns 
 */
export function initDrawerDisplayInfo(panelWidth: ComputedRef<number>): typeof drawerDisplayInfo {

  const breakPoints = panelBreakPoints;

  const drawerBreak = useWatchBreakPoint(
    breakPoints.content,
    panelWidth
  );

  provide(ShowDrawerKey, drawerBreak);

  const showDrawer = ref(false);

  function setShowDrawer(value: boolean) {
    showDrawer.value = value;
  }

  watch(drawerBreak, () => {
    if (drawerBreak.value) {
      showDrawer.value = false;
    }
  });

  const drawerDisplayInfo = {
    showDrawer,
    setShowDrawer,
  }

  return drawerDisplayInfo
}
/**
 * @param errMsg 当inject返回undefinded时抛出的错误信息
 * @returns {boolean} 返回drawer是否折叠
 */
export function getInjectDrawerBreak(errMsg?: string): boolean {
  const drawerBreak = inject(ShowDrawerKey);
  if (!drawerBreak) throw new Error(errMsg ? errMsg + " " : "" + 'component provide value undefined using key: ' + ShowDrawerKey.description);
  return drawerBreak as boolean
}