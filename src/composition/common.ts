import { useStore } from "@/store";
import { ListsTypes } from "@/store/list";
import {
  onMounted,
  onUnmounted,
  Ref,
  UnwrapRef,
  ref,
  computed,
  ComputedRef,
} from "vue";

type SetUpType = () => (void | (() => void))
type TearDownType = void | (() => void);

/**
 * 
 * @param setUp 在onMounted中调用，其返回值为在onUnmounted中调用
 */
export function useMountUnmount(setUp: SetUpType): void {
  let tearDown: TearDownType;
  onMounted(() => {
    console.log('mounted settingUp: ' + setUp)
    tearDown = setUp();
  })
  onUnmounted(() => {
    console.log('unmounted tearingDown: ' + tearDown)
    tearDown && tearDown()
  })
}

/**
 * setState方法支持的基本数据类型
 */
type BaseValueType = string | number | boolean

export type BaseStateType = {
  [index: string]: BaseValueType | BaseStateType
} | BaseValueType

export type SetStateArgsType<T> = UnwrapRef<T> | ((state: UnwrapRef<T>) => UnwrapRef<T>)

export type SetStateType<T> = (args: SetStateArgsType<T>) => void

export type UseRefType<T> = [Ref<UnwrapRef<T>>, SetStateType<T>]
/**
 * 使用ref包装一个原始值并返回一个数组其中包括该响应式对象以及更新该对象的方法
 * @param value 响应式原始值
 * @returns 返回一个ref(value)，与一个setState，setState支持直接或回调式更新
 */

export function useRef<T extends BaseStateType | BaseStateType[]>(
  value: T,
): UseRefType<T> {

  const oldState = ref(value);

  function setState(stateOrCallback: SetStateArgsType<T>) {
    if (typeof stateOrCallback === 'function') {
      oldState.value = stateOrCallback(oldState.value)
      return;
    }
    oldState.value = stateOrCallback
  }

  return [oldState, setState]
}

export function useSelectListType(): ComputedRef<ListsTypes> {
  const store = useStore();
  const selectListType = computed(() => store.state.list.select.listType);
  return selectListType
}