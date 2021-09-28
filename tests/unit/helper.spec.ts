import {
  map2Reducer,
  filter2Reducer,
  applyReducers,
  makeCheckRange,
} from '@/helper'

import { getItemById } from '@/helper/store'

test('test applyReducers along with consponding methods', () => {
  const arr = [1, 2, 3, 4, 5];
  const double = (num: number) => num * 2
  const plus = (num: number) => num + 1
  const even = (num: number) => (num & 1) === 0
  const doubleReducer = map2Reducer(double)
  const plusReducer = map2Reducer(plus)
  const evenReducer = filter2Reducer(even)

  const result1 = applyReducers<number>(arr, [doubleReducer, plusReducer, evenReducer])
  expect(result1).toHaveLength(0);

  const result2 = applyReducers<number>(arr, [evenReducer, plusReducer, doubleReducer])
  expect(result2).toHaveLength(2);
  expect(result2[0]).toEqual(6);
  expect(result2[1]).toEqual(10);
})

test('makeCheckRange method should return a function which could check whether a given number was in specify range', () => {
  const isGtZero = makeCheckRange(0, Infinity);
  expect(isGtZero(0)).toBe(true);
  expect(isGtZero(-1)).toBe(false);

  const isInZeroToHundred = makeCheckRange(0, 100);
  expect(isInZeroToHundred(0)).toBe(true);
  expect(isInZeroToHundred(100)).toBe(true);
  expect(isInZeroToHundred(-1)).toBe(false);
  expect(isInZeroToHundred(101)).toBe(false);
})

test('method getItemById should throw an error when item not exist', () => {
  const items = [
    { id: 0 },
  ]
  expect(() => getItemById(items, 1)).toThrow()
})
