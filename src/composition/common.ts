import { onMounted, onUnmounted, Ref, UnwrapRef, ref } from "vue";

type SetUpType = () => (void | (() => void))
type TearDownType = void | (() => void);

export function useMountUnmount(setUp: SetUpType): void {
  let tearDown: TearDownType;
  onMounted(() => {
    tearDown = setUp();
  })
  onUnmounted(() => tearDown && tearDown())
}


export type BaseStateType = {
  [index: string]: string | number | boolean | symbol | BaseStateType
}

export type SetStateArgsType<T> = T | ((state: T) => T)
export type SetStateType<T> = (args: SetStateArgsType<T>) => void

export type UseRefReturnType<T> = [Ref<UnwrapRef<T>>, SetStateType<T>]
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