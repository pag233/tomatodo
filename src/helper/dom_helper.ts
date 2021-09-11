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
 * @param RegisteeremoveEventListeners 
 * @param RegisteeResetStyle
 * @returns 
 */
export function makeClearHandler(
  RegisteeremoveEventListeners: (registeeElem: HTMLElement) => void,
  RegisteeResetStyle: (registeeElem: HTMLElement) => void,
  registeeElem: HTMLElement = getBodyElement(),
): () => void {
  function clear() {
    RegisteeremoveEventListeners(registeeElem);
    RegisteeResetStyle(registeeElem);
  }
  onUnmounted(() => {
    // console.log('remove event listeners: ' + clear);
    clear();
  })
  return function () {
    clear();
  }
}

export function getdocElement(): HTMLElement {
  return document.documentElement;
}

export function getBodyElement(): HTMLElement {
  return document.body;
}