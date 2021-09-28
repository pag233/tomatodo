import { SetStateArgsType } from "@/composition/common";
import {
  getBodyElement,
  makeMouseDownHandler,
  MouseDownHandlerType,
  MouseMoveHandlerType,
} from "@/composition/dom";
import { EmitFnType } from '@/composition/types';
import { throttle } from 'lodash'
import { PositionType, PositionKey, Position, PositionEmitType, MaximumEmitType, BoxBoundryOffset } from './thePanelPosInfo'

type BoundryCheckerType = (e: MouseEvent, pos: PositionType) => boolean
/**
 * 生成不同方向的mousemove回调函数
 * @param emitFn 
 * @param direction 位置方向
 * @param offset 设置相应direction位置属性大小的函数
 * @param updatePosEmitType emit event类型 
 * @param maximumEmitType emit event类型 
 */
function makeResizeBarResizeMouseMoveHandler(
  emitFn: EmitFnType<SetStateArgsType<PositionType>>,
  direction: PositionKey,
  offset: (e: MouseEvent, pos: PositionType) => number,
  updatePosEmitType: string = PositionEmitType.update,
  maximumEmitType: string = MaximumEmitType.update,
) {
  return throttle(function (e: MouseEvent) {
    // console.log('x: ' + e.clientX);
    // console.log("y: " + e.clientY);
    emitFn(updatePosEmitType, (pos) => {
      return ({
        ...pos,
        [direction]: offset(e, pos)
      })
    });
    emitFn(maximumEmitType);
  }, 70)
}

/**
 * @param isOutOfBox 边界检测
 * @param positiion 设置位置属性大小的函数
 */
function makeResizeBarRepositionMouseMoveHandler(
  emitFn: EmitFnType<SetStateArgsType<PositionType>>,
  isOutOfBox: BoundryCheckerType,
  positiion: (e: MouseEvent, pos: PositionType) => PositionType,
  emitType = PositionEmitType.update,
) {
  return throttle(function (e: MouseEvent) {
    // console.log('x: ' + e.clientX);
    // console.log("y: " + e.clientY);
    emitFn(emitType, (pos) =>
      isOutOfBox(e, pos) ? {
        ...positiion(e, pos)
      } : { ...pos }
    )
  }, 70)
}

function makeResizeBarMouseDownHandler(
  mouseMoveHandler: MouseMoveHandlerType,
) {
  return makeMouseDownHandler(mouseMoveHandler,
    (elem) => {
      elem.style.cursor = 'grabbing'
    },
    (elem) => {
      elem.style.cursor = 'default'
    },
  )
}

/**
 * 返回各个方向的mousedown回调
 * @param emit emit方法
 * @param minWidth 
 * @param minHeigh 
 * @param registeeElem 父节点
 * @returns 各个方向的mousedown回调
 */

export function getResizeBarMouseDownHandlers(
  emit: EmitFnType<SetStateArgsType<PositionType>>,
  minWidth: number,
  minHeigh: number,
  registeeElem: HTMLElement = getBodyElement(),
  boxBoundry: number = BoxBoundryOffset,
): {
  left: MouseDownHandlerType,
  right: MouseDownHandlerType
  top: MouseDownHandlerType,
  bottom: MouseDownHandlerType,
} {

  const left = makeResizeBarMouseDownHandler(
    makeResizeBarResizeMouseMoveHandler(
      emit,
      Position.left,
      //是否达到最小宽度临界
      (e, pos) => {
        if (registeeElem.clientWidth - pos.right - minWidth > e.clientX && e.clientX > boxBoundry) {
          return e.clientX
        } else if (e.clientX <= boxBoundry) {
          return boxBoundry
        } else {
          return registeeElem.clientWidth - pos.right - minWidth
        }
      }
    ),
  )
  const right = makeResizeBarMouseDownHandler(
    makeResizeBarResizeMouseMoveHandler(
      emit,
      Position.right,
      (e, pos) => {
        if (pos.left + minWidth < e.clientX && registeeElem.clientWidth - boxBoundry > e.clientX) {
          return registeeElem.clientWidth - e.clientX
        } else if (registeeElem.clientWidth - boxBoundry <= e.clientX) {
          return boxBoundry
        } else {
          return registeeElem.clientWidth - pos.left - minWidth;
        }
      }
    ),
  )
  const top = makeResizeBarMouseDownHandler(
    makeResizeBarRepositionMouseMoveHandler(
      emit,
      //上下左右边界判定
      (e, pos) => e.clientY > boxBoundry &&
        (pos.bottom + pos.top - e.clientY > boxBoundry || e.clientY < pos.top) &&
        (e.clientX - (registeeElem.clientWidth - pos.right - pos.left) / 2) > boxBoundry &&
        (registeeElem.clientWidth + pos.left + pos.right - 2 * e.clientX) / 2 > boxBoundry
      // registeeElem.clientWidth - (e.clientX + (registeeElem.clientWidth - pos.right - pos.left) / 2) > boxBoundryOffset
      ,
      //移动时计算并设置相应位置属性
      (e, pos) => {
        const mid_line = (registeeElem.clientWidth - pos.left - pos.right) / 2 + pos.left;
        const vertical_offset = e.clientY - pos.top;
        const horizontal_offset = e.clientX - mid_line;
        return {
          top: pos.top + vertical_offset,
          bottom: pos.bottom - vertical_offset,
          left: pos.left + horizontal_offset,
          right: pos.right - horizontal_offset,
        }
      }
    ),
  )
  const bottom = makeResizeBarMouseDownHandler(
    makeResizeBarResizeMouseMoveHandler(
      emit,
      Position.bottom,
      (e, pos) => {
        if (pos.top + minHeigh < e.clientY && registeeElem.clientHeight - boxBoundry > e.clientY) {
          return registeeElem.clientHeight - e.clientY
        } else if (registeeElem.clientHeight - boxBoundry <= e.clientY) {
          return boxBoundry
        } else {
          return pos.top + minHeigh
        }
      }
    ),
  )
  return {
    left,
    right,
    top,
    bottom,
  }
}