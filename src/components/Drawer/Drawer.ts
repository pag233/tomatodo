import { getDocElement, makeMouseDownHandler } from '@/composition/dom';
import { useInjectPanelPosInfo } from '../Panel/thePanelPosInfo';

function makeDrawerMouseMoveHandler(
  setWidth: (e: MouseEvent, clientWidth: number) => void,
  rootElem = getDocElement(),
) {
  return function (e: MouseEvent) {
    setWidth(e, rootElem.clientWidth);
  }
}

export function getDrawerMouseDownHandler(
  setDrawerWidth: (value: number) => void,
): () => void {
  const panelInfo = useInjectPanelPosInfo()
  const makeDrawerMouseDownHandler = makeMouseDownHandler(
    makeDrawerMouseMoveHandler((e, clientWidth) => {
      const newWidth = clientWidth - panelInfo.value.right - e.clientX;
      setDrawerWidth(newWidth);
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