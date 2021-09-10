export function getdocElement(): HTMLElement {
  return document.documentElement;
}

export function getBodyElement(): HTMLElement {
  return document.body;
}

export const getField = <T, K extends keyof T>(key: K) => ((target: T): T[K] => (target[key]))


const makeCompareFunc = <T>(predictor: (a: T, b: T) => number) => (a: T, b: T): 1 | 0 | -1 => {
  const prediction = predictor(a, b);
  if (prediction > 0) {
    return 1
  } else if (prediction < 0) {
    return -1
  }
  return 0
}

export const compareNum = makeCompareFunc<number>((a, b) => a - b)

export const compareStr = makeCompareFunc<string>((a, b) => a.localeCompare(b))

type MakeCheckRangeType = (min: number, max: number) => (num: number) => boolean

const makeCheckRange: MakeCheckRangeType = (min: number, max: number) => (num: number) => (num >= min && num <= max)

export const checkZeroToHundred = makeCheckRange(0, 100);
export const gtZero = makeCheckRange(0, Infinity);

export const getRemValue = (): number => parseInt(window.getComputedStyle(document.documentElement).fontSize)