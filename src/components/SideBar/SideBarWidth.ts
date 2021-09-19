import { EmitFnType } from '../../composition/types';
import {
  makeMouseDownHandler,
  MouseDownHandlerType,
  MouseMoveHandlerType,
} from "@/composition/dom";
import { PositionType, useInjectPanelPosInfo } from '../Panel/thePanelPosInfo';
import { Ref } from '@vue/runtime-core';

export enum BarWidthEmitType {
  update = "barWidth:update"
}

function makeSideBarWidthMouseMoveHandler(
  emitFn: EmitFnType<number>,
  posInfo: Ref<PositionType>,
  emitType = BarWidthEmitType.update
) {
  return function (e: MouseEvent) {
    const width = e.clientX - posInfo.value.left;
    emitFn(emitType, width);
  }
}

function makeSideBarWidthMouseDownHandler(
  mouseMoveHandler: MouseMoveHandlerType,
): MouseDownHandlerType {
  return makeMouseDownHandler(
    mouseMoveHandler,
    (elem) => {
      elem.style.cursor = "ew-resize"
    },
    (elem) => {
      elem.style.cursor = "default"
    }
  )
}

export function getSideBarWidthMouseDownHandler(
  emitFn: EmitFnType<number>,
): MouseDownHandlerType {
  const posInfo = useInjectPanelPosInfo();
  return makeSideBarWidthMouseDownHandler(
    makeSideBarWidthMouseMoveHandler(emitFn, posInfo)
  )
}