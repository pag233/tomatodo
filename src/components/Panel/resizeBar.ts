import { SetStateArgsType } from "@/composition/common";
import { makeClearHandler, makeHandler, getBodyElement } from "@/helper/dom";
import { EmitFnType } from '@/composition/types';
import { throttle } from 'lodash'
import { PositionType, PositionKey, Position, PositionEmitType, MaximumEmitType, BoxBoundryOffset } from './thePanelPosInfo'

type MousemoveHandlerType = (e: MouseEvent) => void

type BoundryCheckerType = (e: MouseEvent, pos: PositionType) => boolean

/**
 * 生成不同方向的mousemove回调函数
 * @param emitFn 
 * @param direction 位置方向
 * @param isLessThenBoundry 判断是否到达最小宽高的临界位置的函数
 * @param isOutOfBox 判断是否达到窗体临界位置的函数
 * @param offset 设置相应direction位置属性大小的函数
 * @param updatePosEmitType emit event类型 
 * @param maximumEmitType emit event类型 
 */
function makeMouseMoveResizeHanler(
  emitFn: EmitFnType<SetStateArgsType<PositionType>>,
  direction: PositionKey,
  isLessThenBoundry: BoundryCheckerType,
  isOutOfBox: BoundryCheckerType,
  offset: (e: MouseEvent) => number,
  updatePosEmitType: string = PositionEmitType.update,
  maximumEmitType: string = MaximumEmitType.update,
) {
  return throttle(function (e: MouseEvent) {
    // console.log('x: ' + e.clientX);
    // console.log("y: " + e.clientY);
    emitFn(updatePosEmitType, (pos) => {
      return isLessThenBoundry(e, pos) && isOutOfBox(e, pos) ? {
        ...pos,
        [direction]: offset(e)
      } : { ...pos }
    });
    emitFn(maximumEmitType);
  }, 70)
}

/**
 * @param isOutOfBox 边界检测
 * @param positiion 设置位置属性大小的函数
 */
function makeMouseMoveRepositionHandler(
  emitFn: EmitFnType<SetStateArgsType<PositionType>>,
  isOutOfBox: BoundryCheckerType,
  positiion: (e: MouseEvent, pos: PositionType) => PositionType,
  emitType = PositionEmitType.update,
) {
  return throttle(function (e: MouseEvent) {
    // console.log('x: ' + e.clientX);
    // console.log("y: " + e.clientY);
    emitFn(emitType, (pos) => {
      return isOutOfBox(e, pos) ? {
        ...positiion(e, pos)
      } : { ...pos }
    })
  }, 70)
}

/**
 * 生成并向父节点添加\注销回调
 * @param mouseMoveHandler
 */
function makeResizeBarMouseDownHandlers(mouseMoveHandler: ReturnType<typeof throttle>,
) {
  const clearMouseMoveHandler = makeClearHandler((elem) => {
    elem.removeEventListener('mousemove', mouseMoveHandler);
    elem.removeEventListener('mouseup', clearMouseMoveHandler);
    elem.removeEventListener('mouseleave', clearMouseMoveHandler);
    mouseMoveHandler.cancel();
    elem.style.cursor = 'default'
  });

  return makeHandler((elem) => {
    elem.addEventListener('mousemove', mouseMoveHandler);
    elem.addEventListener('mouseup', clearMouseMoveHandler);
    elem.addEventListener('mouseleave', clearMouseMoveHandler);
    elem.style.cursor = 'grabbing'
  });
}

/**
 * 返回各个方向的mousedown回调
 * @param emit emit方法
 * @param minWidth 
 * @param minHeigh 
 * @param registeeElem 父节点
 * @returns 各个方向的mousedown回调
 */

export function makeMouseDownHandlers(
  emit: EmitFnType<SetStateArgsType<PositionType>>,
  minWidth: number,
  minHeigh: number,
  registeeElem: HTMLElement = getBodyElement(),
  boxBoundry: number = BoxBoundryOffset,
): {
  left: MousemoveHandlerType,
  right: MousemoveHandlerType
  top: MousemoveHandlerType,
  bottom: MousemoveHandlerType,
} {

  const left = makeResizeBarMouseDownHandlers(
    makeMouseMoveResizeHanler(
      emit,
      Position.left,
      //是否达到最小宽度临界
      (e, pos) => registeeElem.clientWidth - pos.right - minWidth - e.clientX > 0,
      //是否溢出视口
      (e) => e.clientX > boxBoundry,
      (e) => e.clientX
    ),
  )
  const right = makeResizeBarMouseDownHandlers(
    makeMouseMoveResizeHanler(
      emit,
      Position.right,
      (e, pos) => e.clientX - pos.left - minWidth > 0,
      (e) => registeeElem.clientWidth - boxBoundry - e.clientX > 0,
      (e) => registeeElem.clientWidth - e.clientX
    ),
  )
  const top = makeResizeBarMouseDownHandlers(
    makeMouseMoveRepositionHandler(
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
  const bottom = makeResizeBarMouseDownHandlers(
    makeMouseMoveResizeHanler(
      emit,
      Position.bottom,
      (e, pos) => e.clientY - pos.top - minHeigh > 0,
      (e) => registeeElem.clientHeight - boxBoundry - e.clientY > 0,
      (e) => registeeElem.clientHeight - e.clientY
    ),
  )
  return {
    left,
    right,
    top,
    bottom,
  }
}