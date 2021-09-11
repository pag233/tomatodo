import { SetStateArgsType } from "@/composition/common";
import { getRemValue } from "@/helper";
import { makeClearHandler, makeHandler, getBodyElement } from "@/helper/dom_helper";
import { EmitFnType } from '@/composition/types';
import { throttle } from 'lodash'
import { PositionType, PositionKey, Position } from './thePanelSizeScale'

type MousemoveHandlerType = (e: MouseEvent) => void

type BoundryCheckerType = (e: MouseEvent, pos: PositionType) => boolean
/**
 * 生成不同方向的mousemove回调函数的高阶函数
 * @param emitFn 
 * @param emitType emit event类型 
 * @param direction 位置方向
 * @param isLessThenBoundry 判断是否到达最小宽高的临界位置的函数
 * @param offset 更新大小
 * @returns 
 */
function makeMouseMoveResizeHanler(
  emitFn: EmitFnType<SetStateArgsType<PositionType>>,
  emitType: string,
  direction: PositionKey,
  isLessThenBoundry: BoundryCheckerType,
  isOutOfBox: BoundryCheckerType,
  offset: (e: MouseEvent) => number,
): MousemoveHandlerType {
  return throttle(function (e: MouseEvent) {
    // console.log('x: ' + e.clientX);
    // console.log("y: " + e.clientY);
    emitFn(emitType, (pos) => {
      return isLessThenBoundry(e, pos) && isOutOfBox(e, pos) ? {
        ...pos,
        [direction]: offset(e)
      } : { ...pos }
    })
  }, 70)
}

/**
 * @param isOutOfBox 边界检测
 */
function makeMouseMoveRepositionHandler(
  emitFn: EmitFnType<SetStateArgsType<PositionType>>,
  emitType: string,
  isOutOfBox: BoundryCheckerType,
  positiion: (e: MouseEvent, pos: PositionType) => PositionType,
): MousemoveHandlerType {
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
function makeResizeBarMouseDownHandlers(mouseMoveHandler: MousemoveHandlerType): MousemoveHandlerType {

  const clearMouseMoveHandler = makeClearHandler((elem) => {
    elem.removeEventListener('mousemove', mouseMoveHandler);
    elem.removeEventListener('mouseup', clearMouseMoveHandler);
    elem.removeEventListener('mouseleave', clearMouseMoveHandler);
  }, (elem) => elem.style.cursor = 'default');

  return makeHandler((elem) => {
    elem.addEventListener('mousemove', mouseMoveHandler);
    elem.addEventListener('mouseup', clearMouseMoveHandler);
    elem.addEventListener('mouseleave', clearMouseMoveHandler);
  }, (elem) => elem.style.cursor = 'grabbing');
}

/**
 * 返回各个方向的mousedown回调
 * @param emit emit方法
 * @param minWidth 
 * @param minHeigh 
 * @param registeeElem 父节点
 * @returns 各个方向的mousedown回调
 */
export function MouseDownHandlers(
  emit: EmitFnType<SetStateArgsType<PositionType>>,
  minWidth: number,
  minHeigh: number,
  registeeElem: HTMLElement = getBodyElement(),
): {
  left: MousemoveHandlerType,
  right: MousemoveHandlerType
  top: MousemoveHandlerType,
  bottom: MousemoveHandlerType,
} {
  const boxBoundryOffset = getRemValue();
  const left = makeResizeBarMouseDownHandlers(
    makeMouseMoveResizeHanler(
      emit,
      Position.emitType,
      Position.left,
      (e, pos) => registeeElem.clientWidth - pos.right - minWidth - e.clientX > 0,
      (e) => e.clientX > boxBoundryOffset,
      (e) => e.clientX
    )
  )
  const right = makeResizeBarMouseDownHandlers(
    makeMouseMoveResizeHanler(
      emit,
      Position.emitType,
      Position.right,
      (e, pos) => e.clientX - pos.left - minWidth > 0,
      (e) => registeeElem.clientWidth - boxBoundryOffset - e.clientX > 0,
      (e) => registeeElem.clientWidth - e.clientX
    )
  )
  const top = makeResizeBarMouseDownHandlers(
    makeMouseMoveRepositionHandler(
      emit,
      Position.emitType,
      (e, pos) => e.clientY > boxBoundryOffset &&
        (pos.bottom + pos.top - e.clientY > boxBoundryOffset || e.clientY < pos.top) &&
        (e.clientX - (registeeElem.clientWidth - pos.right - pos.left) / 2) > boxBoundryOffset &&
        (registeeElem.clientWidth + pos.left + pos.right - 2 * e.clientX) / 2 > boxBoundryOffset
      // registeeElem.clientWidth - (e.clientX + (registeeElem.clientWidth - pos.right - pos.left) / 2) > boxBoundryOffset
      ,
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
    )
  )
  const bottom = makeResizeBarMouseDownHandlers(
    makeMouseMoveResizeHanler(
      emit,
      Position.emitType,
      Position.bottom,
      (e, pos) => e.clientY - pos.top - minHeigh > 0,
      (e) => registeeElem.clientHeight - boxBoundryOffset - e.clientY > 0,
      (e) => registeeElem.clientHeight - e.clientY
    )
  )
  return {
    left,
    right,
    top,
    bottom,
  }
}