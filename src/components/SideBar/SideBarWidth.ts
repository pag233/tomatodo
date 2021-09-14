import { inject, Ref, ref } from '@vue/runtime-core';
import { throttle } from 'lodash';
import { EmitFnType } from '../../composition/types';
import {
  makeMouseDownHandler,
  MouseDownHandlerType,
  MouseMoveHandlerType,
} from "@/composition/dom";
import { PanelPosLeftInjectKey } from '../Panel/thePanelPosInfo';


export enum BarWidthEmitType {
  update = "barWidth:update"
}

function makeSideBarWidthMouseMoveHandler(
  emitFn: EmitFnType<number>,
  posLeft: Ref<number>,
  emitType = BarWidthEmitType.update
) {
  return throttle(
    function (e: MouseEvent) {
      const sideBarWidth = e.clientX - posLeft.value;
      emitFn(emitType, sideBarWidth > 0 ? sideBarWidth : 0);
    }
    , 70);
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
  const posLeft = inject(PanelPosLeftInjectKey, ref(0));
  return makeSideBarWidthMouseDownHandler(
    makeSideBarWidthMouseMoveHandler(emitFn, posLeft)
  )
}