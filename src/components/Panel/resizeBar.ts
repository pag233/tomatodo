import { SetStateArgsType } from "@/composition/common";
import { getBodyElement } from "@/helper";
import { EmitFnType } from '@/types/shared'
import { throttle } from "underscore";
import { PositionType, PositionKey, Position } from './thePanelSizeScale'

type mousemoveHandlerType = (e: MouseEvent) => void
/**
 * 注册相关事件回调
 * @param mouseMoveHandler
 * @param clearMousemoveHandle
 * @param registeeElem 
 * @returns 
 */
function makeMouseDownHandler(
  mouseMoveHandler: mousemoveHandlerType,
  clearMousemoveHandler: () => void,
  registeeElem: HTMLElement = getBodyElement(),
): () => void {
  return function mouseDownHandler() {
    console.log("add");
    registeeElem.addEventListener('mousemove', mouseMoveHandler);
    registeeElem.addEventListener('mouseup', clearMousemoveHandler);
    registeeElem.addEventListener('mouseleave', clearMousemoveHandler);
  }
}
/**
 * 清除相关事件回调
 * @param mouseMoveHandler 
 * @param registeeElem 
 * @returns 
 */
function makeClearMouseMoveHandle(
  mouseMoveHandler: mousemoveHandlerType,
  registeeElem: HTMLElement = getBodyElement(),
): () => void {
  return function clearMouseMoveHandler() {
    console.log("clear");
    registeeElem.removeEventListener('mousemove', mouseMoveHandler);
    registeeElem.removeEventListener('mouseup', clearMouseMoveHandler);
    registeeElem.removeEventListener('mouseleave', clearMouseMoveHandler);
  }
}
/**
 * 生成不同方向的mousemove回调函数的高阶函数
 * @param emitFn 
 * @param emitType - emit event类型 
 * @param direction - 位置方向
 * @param isLessThenBoundry - 判断是否到达最小宽高的临界位置的函数
 * @param offset - 更新大小
 * @returns 
 */
function makeMouseMoveResizeHanler(
  emitFn: EmitFnType<SetStateArgsType<PositionType>>,
  emitType: string,
  direction: PositionKey,
  isLessThenBoundry: (e: MouseEvent, pos: PositionType) => boolean,
  isOutOfBox: (e: MouseEvent, pos: PositionType) => boolean,
  offset: (e: MouseEvent) => number,
): mousemoveHandlerType {
  return throttle(function (e: MouseEvent): void {
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

function makeMouseMoveRepositionHandler(
  emitFn: EmitFnType<SetStateArgsType<PositionType>>,
  emitType: string,
  isOutOfBox: (e: MouseEvent, pos: PositionType) => boolean,
  positiion: (e: MouseEvent, pos: PositionType) => PositionType,
): mousemoveHandlerType {
  return throttle(function (e: MouseEvent): void {
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
 * 向父节点添加回调
 * @param mouseMoveHandler 
 */
function MouseDownHandlerRegister(mouseMoveHandler: mousemoveHandlerType): mousemoveHandlerType {
  const clearMouseMoveHandler = makeClearMouseMoveHandle(mouseMoveHandler);
  return makeMouseDownHandler(mouseMoveHandler, clearMouseMoveHandler);
}

/**
 * 返回各个方向的mousedown回调
 * @param emit - emit方法
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
  left: (e: MouseEvent) => void,
  right: (e: MouseEvent) => void,
  top: (e: MouseEvent) => void,
  bottom: (e: MouseEvent) => void,
} {
  const boxBoundryOffset = 16;
  const left = MouseDownHandlerRegister(
    makeMouseMoveResizeHanler(
      emit,
      Position.emitType,
      Position.left,
      (e, pos) => registeeElem.clientWidth - pos.right - minWidth - e.clientX > 0,
      (e) => e.clientX > boxBoundryOffset,
      (e) => e.clientX
    )
  )
  const right = MouseDownHandlerRegister(
    makeMouseMoveResizeHanler(
      emit,
      Position.emitType,
      Position.right,
      (e, pos) => e.clientX - pos.left - minWidth > 0,
      (e) => registeeElem.clientWidth - boxBoundryOffset - e.clientX > 0,
      (e) => registeeElem.clientWidth - e.clientX
    )
  )
  const top = MouseDownHandlerRegister(
    makeMouseMoveRepositionHandler(
      emit,
      Position.emitType,
      () => true,
      (e, pos) => {
        const mid_line = (registeeElem.clientWidth - pos.left - pos.right) / 2 + pos.left;
        const horizontal_offset = e.clientY - pos.top;
        const vertical_offset = e.clientX - mid_line;
        return {
          top: pos.top + horizontal_offset,
          bottom: pos.bottom - horizontal_offset,
          left: pos.left + vertical_offset,
          right: pos.right - vertical_offset,
        }
      }
    )
  )
  const bottom = MouseDownHandlerRegister(
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