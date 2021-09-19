import { computed, watch, provide, readonly, inject, Ref } from "@vue/runtime-core";
import { useRef, makeSetValueBetween } from "@/composition/common";
import { getDocElement, getRemSize } from '@/composition/dom';

//Panel最大延伸位置
export const BoxBoundryOffset: number = getRemSize();

export enum Position {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
}

export type PositionType = {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

export type PositionKey = keyof PositionType


export enum PositionEmitType {
  update = "pos:update",
  save = "pos:save",
  restore = "pos:restore",
}

export enum MaximumEmitType {
  update = "maximum:update",
}

const checkHorizontion = () => screen.orientation.type.includes('landscape')


export const PanelPosInfoInjectKey = Symbol('posInfo');
export const PanelBreakPointsInjectKey = Symbol('posBreakPoints');

interface MinMax {
  min: number
  max: number
}

export interface BreakPointsType {
  sidebar: MinMax
  drawer: MinMax
}

export interface BreakPointsInjectType {
  sideBarBreak: Ref<boolean>,
  drawerBreak: Ref<boolean>,
}

/**
 * 初始化Panel大小，像素值
 * @param {number} width 初始宽度
 * @param {number} height 初始高度
 * @param {HTMLElement} root 父节点 
 * @returns 代表坐标的响应式对象
 */
export function initPanelPosInfo(
  width: number,
  height: number,
  breakPoints: BreakPointsType,
  root: HTMLElement = getDocElement(),
): typeof posInfo {
  const mwFactor = 0.5;
  const mhFactor = 0.5;
  const minWidth = Math.floor(width * mwFactor);
  const minHeight = Math.floor(height * mhFactor);

  const isHorizontion = checkHorizontion();
  if (isHorizontion) {
    [width, height] = [height, width];
  }
  const isClientFit = height < root.clientHeight && width < root.clientWidth
  const top = isClientFit ? Math.floor((root.clientHeight - height) / 2) : BoxBoundryOffset;
  const bottom = top;
  const left = isClientFit ? Math.floor((root.clientWidth - width) / 2) : BoxBoundryOffset;
  const right = left;

  const position = useRef<PositionType>({
    top,
    bottom,
    left,
    right,
  })
  const [pos, setPos] = position;

  const [savedPos, setSavedPos] = useRef<PositionType>({
    top,
    bottom,
    left,
    right,
  })
  const savePos = () => setSavedPos(pos.value);
  const restorePos = () => {
    setMaximum(false);
    setPos(savedPos.value);
  }

  const maximum = useRef(!isClientFit);
  const [isMaximum, setMaximum] = maximum;
  watch(isMaximum, () => {
    //当最大化时保存当前位置信息
    if (isMaximum.value) {
      savePos()
      setPos({
        top: BoxBoundryOffset,
        bottom: BoxBoundryOffset,
        left: BoxBoundryOffset,
        right: BoxBoundryOffset,
      })
    }
  })

  const panelWidth = computed(() => (getDocElement().clientWidth - pos.value.left - pos.value.right))

  const sideBarMinWidth = breakPoints.sidebar.min
  const sideBarMaxWidth = breakPoints.sidebar.max

  const [barWidth, setBWidth] = useRef(sideBarMinWidth as number);
  const setBarWidth = makeSetValueBetween(setBWidth, sideBarMinWidth, sideBarMaxWidth);

  const minDrawerWidth = breakPoints.drawer.min;
  const maxDrawerWidth = breakPoints.drawer.max;

  const [drawerWidth, setDWidth] = useRef(minDrawerWidth as number);
  const setDrawerWidth = makeSetValueBetween(setDWidth, minDrawerWidth, maxDrawerWidth);

  const [sideBarBreak, setSideBarBreak] = useRef(false as boolean);

  const [drawerBreak, setDrawerBreak] = useRef(false as boolean);
  const [drawerShow, setDrawerShow] = useRef(false as boolean);

  watch(drawerBreak, () => {
    if (drawerBreak.value) {
      drawerShow.value = false;
    }
  });

  watch(panelWidth, () => {
    if (panelWidth.value <= sideBarMinWidth + minWidth) {
      setSideBarBreak(true)
    } else {
      setSideBarBreak(false)
    }
    if (panelWidth.value <= sideBarMinWidth + minDrawerWidth + minWidth) {
      setDrawerBreak(true);
    } else {
      setDrawerBreak(false);
    }
  })

  provide(PanelPosInfoInjectKey, readonly(pos));
  provide(PanelBreakPointsInjectKey, readonly({
    sideBarBreak,
    drawerBreak,
  }))

  const posInfo = {
    position: {
      pos,
      setPos,
      savePos,
      restorePos,
      minWidth,
      minHeight,
    },
    maximum: {
      isMaximum, setMaximum
    },
    sideBar: {
      barWidth,
      setBarWidth,
    },
    drawer: {
      drawerBreak,
      drawerShow,
      setDrawerShow,
      drawerWidth,
      setDrawerWidth,
    }
  }

  return posInfo
}

function useInject<T>(key: symbol): () => T {
  return function () {
    const injectValue = inject<T>(key)
    if (!injectValue) throw new Error('Provide value undefined using inject key: ' + key.description)
    return injectValue;
  }
}

export const useInjectPanelPosInfo = useInject<Readonly<Ref<PositionType>>>(PanelPosInfoInjectKey)

export const useInjectPanelBreakPoints = useInject<Readonly<BreakPointsInjectType>>(PanelBreakPointsInjectKey);