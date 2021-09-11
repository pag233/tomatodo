import { onUnmounted } from "@vue/runtime-dom";
/**
 * 组合回调
 * @param RegisteeAddEventListeners
 * @param RegisteeUpdateStyle
 */
export function makeHandler(
  RegisteeAddEventListeners: (registeeElem: HTMLElement) => void,
  RegisteeUpdateStyle: (registeeElem: HTMLElement) => void,
  registeeElem: HTMLElement = getBodyElement(),
): () => void {
  return function () {
    // console.log("add");
    RegisteeUpdateStyle(registeeElem);
    RegisteeAddEventListeners(registeeElem);
  }
}
/**
 * 注销回调
 * @param registeeRemoveEventListeners 
 * @param registeeResetStyle
 * @returns 
 */
export function makeClearHandler(
  registeeRemoveEventListeners: (registeeElem: HTMLElement) => void,
  registeeResetStyle: (registeeElem: HTMLElement) => void,
  registeeElem: HTMLElement = getBodyElement(),
): () => void {
  function clear() {
    registeeRemoveEventListeners(registeeElem);
    registeeResetStyle(registeeElem);
  }
  onUnmounted(() => {
    // console.log('remove event listeners: ' + clear);
    clear();
  })
  return function () {
    clear();
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