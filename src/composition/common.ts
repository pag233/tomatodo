import { onMounted, onUnmounted, Ref, UnwrapRef, ref } from "vue";

type SetUpType = () => (void | (() => void))
type TearDownType = void | (() => void);

/**
 * 
 * @param setUp -在onMounted中调用，其返回值为在onUnmounted中调用
 */
export function useMountUnmount(setUp: SetUpType): void {
  let tearDown: TearDownType;
  onMounted(() => {
    tearDown = setUp();
  })
  onUnmounted(() => tearDown && tearDown())
}

/**
 * setState方法支持的基本数据类型
 */
export type BaseStateType = {
  [index: string]: string | number | boolean | symbol | BaseStateType
}

export type SetStateArgsType<T> = T | ((state: T) => T)
export type SetStateType<T> = (args: SetStateArgsType<T>) => void

export type UseRefReturnType<T> = [Ref<UnwrapRef<T>>, SetStateType<T>]
/**
 * 使用ref包装一个原始值并返回一个数组其中包括该响应式对象以及更新该对象的方法
 * @param value 响应式原始值
 * @returns 返回一个ref(value)，与一个setState，setState支持直接或回调式更新
 */
export function useRef<T extends BaseStateType>(value: T): UseRefReturnType<T> {
  const oldState = ref(value);

  function setState(stateOrCallback: SetStateArgsType<T>): void {
    if (typeof stateOrCallback === 'function') {
      oldState.value = stateOrCallback(oldState.value)
      return;
    }
    oldState.value = stateOrCallback
  }

  return [oldState, setState]
}