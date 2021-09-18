import { getDocElement, makeMouseDownHandler } from '@/composition/dom';
import { ComputedRef, inject, Ref } from '@vue/runtime-core';
import { throttle } from 'lodash';
import { PanelPosRightInjectKey } from '../Panel/thePanelPosInfo';

function makeDrawerMouseMoveHandler(
  setWidth: (e: MouseEvent, clientWidth: number) => void,
  rootElem = getDocElement(),
) {
  return throttle(
    function (e: MouseEvent) {
      setWidth(e, rootElem.clientWidth);
    }
    , 70)
}

export function getDrawerMouseDownHandler(
  width: Ref<number>,
  minWidth: number,
  maxWidth: number,
): () => void {
  const panelRight = inject(PanelPosRightInjectKey) as ComputedRef<number>
  if (!panelRight) throw new Error('Provider value not found, key name: ' + PanelPosRightInjectKey.description)
  const makeDrawerMouseDownHandler = makeMouseDownHandler(
    makeDrawerMouseMoveHandler((e, clientWidth) => {
      const newWidth = clientWidth - panelRight.value - e.clientX;
      if (newWidth < maxWidth && newWidth > minWidth) {
        width.value = newWidth;
      } else if (newWidth >= maxWidth) {
        width.value = maxWidth
      } else {
        width.value = minWidth
      }
    }),
    (elem) => {
      elem.style.cursor = "ew-resize"
    },
    (elem) => {
      elem.style.cursor = "default"
    }
  )
  return makeDrawerMouseDownHandler
}