import { onUnmounted } from "@vue/runtime-dom";
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
 * @param needUnmountedListeners 需要放入onUnmounted中的listeners
 * @param injectFn 不需要放入onUnmounted中的listeners
 */
export function makeClearHandler(
  needUnmountedListeners: (registeeElem: HTMLElement) => void,
  injectFn?: (registeeElem: HTMLElement) => void,
  registeeElem: HTMLElement = getBodyElement(),
): () => void {
  onUnmounted(() => {
    // console.log('remove event listeners: ' + clear);
    needUnmountedListeners(registeeElem);
  })
  return function () {
    injectFn && injectFn(registeeElem);
    needUnmountedListeners(registeeElem);
  }
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