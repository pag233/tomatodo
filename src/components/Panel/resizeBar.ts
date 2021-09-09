import { SetStateArgsType } from "@/composition/common";
import { getBodyElement } from "@/helper";
import { EmitFnType } from '@/types/shared'
import { throttle } from "underscore";
import { PositionType, PositionKey, Position } from './thePanelSizeScale'

type mousemoveHandlerType = (e: MouseEvent) => void

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

function makeMouseMoveHanler(
  emitFn: EmitFnType<SetStateArgsType<PositionType>>,
  event: string,
  direction: PositionKey,
  isGtMinAxis: (e: MouseEvent, pos: PositionType) => boolean,
  offset: (e: MouseEvent) => number,
): mousemoveHandlerType {
  return throttle(function (e: MouseEvent): void {
    // console.log('x: ' + e.clientX);
    // console.log("y: " + e.clientY);
    emitFn(event, (pos) => {
      return isGtMinAxis(e, pos) ? {
        ...pos,
        [direction]: offset(e)
      } : { ...pos }
    })
  }, 70)
}

function MouseDownHandlerRegister(mouseMoveHandler: mousemoveHandlerType): mousemoveHandlerType {
  const clearMouseMoveHandler = makeClearMouseMoveHandle(mouseMoveHandler);
  return makeMouseDownHandler(mouseMoveHandler, clearMouseMoveHandler);
}

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
  const left = MouseDownHandlerRegister(
    makeMouseMoveHanler(
      emit,
      Position.emitType,
      Position.left,
      (e, pos) => registeeElem.clientWidth - pos.right - minWidth - e.clientX > 0,
      (e) => e.clientX
    )
  )
  const right = MouseDownHandlerRegister(
    makeMouseMoveHanler(
      emit,
      Position.emitType,
      Position.right,
      (e, pos) => e.clientX - minWidth - pos.left > 0,
      (e) => registeeElem.clientWidth - e.clientX
    )
  )
  const top = MouseDownHandlerRegister(
    makeMouseMoveHanler(
      emit,
      Position.emitType,
      Position.top,
      (e, pos) => registeeElem.clientHeight - pos.bottom - minHeigh - e.clientY > 0,
      (e) => e.clientY
    )
  )
  const bottom = MouseDownHandlerRegister(
    makeMouseMoveHanler(
      emit,
      Position.emitType,
      Position.bottom,
      (e, pos) => e.clientY - pos.top - minHeigh > 0,
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