import { onUnmounted } from "@vue/runtime-dom";
import { throttle } from "lodash";

export type MouseMoveHandlerType = (e: MouseEvent) => void
export type MouseDownHandlerType = () => void

/**
 * 向父元素注册回调
 */
export function makeHandler(
  listeners: (registeeElem: HTMLElement) => void,
  registeeElem: HTMLElement = getBodyElement(),
): () => void {
  return function () {
    // console.log("add");
    listeners(registeeElem);
  }
}
/**
 * 向父元素注销回调
 * @param needUnmounted 需要放入onUnmounted中的listeners
 * @param clearFn 不需要放入onUnmounted中的listeners
 */
export function makeClearHandler(
  needUnmounted: (registeeElem: HTMLElement) => void,
  clearFn?: (registeeElem: HTMLElement) => void,
  registeeElem: HTMLElement = getBodyElement(),
): () => void {
  onUnmounted(() => {
    // console.log('remove event listeners: ' + clear);
    needUnmounted(registeeElem);
  })
  return function () {
    clearFn && clearFn(registeeElem);
    needUnmounted(registeeElem);
  }
}

/**
 * 生成并向父节点添加\注销回调
 * @param mouseMoveHandler
 */
export function makeMouseDownHandler(
  mouseMoveHandler: MouseMoveHandlerType,
  registerCallback: (elem: HTMLElement) => void,
  clearCallback: (elem: HTMLElement) => void,
): () => void {
  const throttleMouseMoveHandler = throttle(mouseMoveHandler, 32)
  const clearMouseMoveHandler = makeClearHandler((elem) => {
    elem.removeEventListener('mousemove', throttleMouseMoveHandler);
    elem.removeEventListener('mouseup', clearMouseMoveHandler);
    elem.removeEventListener('mouseleave', clearMouseMoveHandler);
  }, (elem) => {
    clearCallback(elem);
    throttleMouseMoveHandler.cancel();
  });

  return makeHandler((elem) => {
    elem.addEventListener('mousemove', throttleMouseMoveHandler);
    elem.addEventListener('mouseup', clearMouseMoveHandler);
    elem.addEventListener('mouseleave', clearMouseMoveHandler);
    registerCallback(elem);
  })
}


export function getDocElement(): HTMLElement {
  return document.documentElement;
}

export function getBodyElement(): HTMLElement {
  return document.body;
}

export function getRemSize(): number {
  return parseInt(window.getComputedStyle(getDocElement()).fontSize);
}