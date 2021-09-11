import { flowRight } from 'lodash'

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

export const makeCheckRange: MakeCheckRangeType = (min: number, max: number) =>
  (num: number) =>
    (num >= min && num <= max)

export const checkZeroToHundred = makeCheckRange(0, 100);
export const gtZero = makeCheckRange(0, Infinity);

export const getRemValue = (): number => parseInt(window.getComputedStyle(document.documentElement).fontSize)

/* eslint-disable */
type MapCallbackType<T> = (item: T, index?: number, arr?: T[]) => T
type FilterCallbackType<T> = (item: T) => boolean
type ReduceCallbackType<T> = (acc: any, cur: T) => any

type ReducerType<T> = (reduce: ReduceCallbackType<T>) => ReduceCallbackType<T>

export const map2Reducer = <T>(mapFn: MapCallbackType<T>): ReducerType<T> =>
  (reducer) =>
    (acc, cur) =>
      reducer(acc, mapFn(cur))

export const filter2Reducer = <T>(filterFn: FilterCallbackType<T>): ReducerType<T> =>
  (reducer) =>
    (acc, cur) =>
      (filterFn(cur) ? reducer(acc, cur) : acc)

/** 
 * 节省因创建数组的开销 
 * @param mapOrFilterReducers 注意reducer顺序
 */
export const applyReducers = <T>(
  arr: T[],
  mapOrFilterReducers: ReducerType<T>[],
  reducer: ReduceCallbackType<T> = (acc, pre) => [...acc, pre],
  init: T[] = []
): T[] => (
  arr.reduce(flowRight(...mapOrFilterReducers)(reducer), init)
)
/* eslint-enable */

function square(index: number): number {
  return Math.pow(index, 2)
}

export function bitSwitch(bits: number, index: number): number {
  return bits ^ square(index)
}

export function bitOn(bits: number, index: number): number {
  return bits || square(index)
}

export function bitOff(bits: number, index: number): number {
  return bits & (square((bits >>> 0).toString(2).length) - 1) ^ square(index)
}