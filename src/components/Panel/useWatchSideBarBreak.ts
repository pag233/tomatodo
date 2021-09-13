import {
  ref,
  ComputedRef,
  computed,
  watch,
  inject,
  Ref,
} from "vue";

import { PanelWidthInjectKey } from "./thePanelPosInfo"

export function useWatchSideBarBreak(breakPoint: number): Ref<boolean> {
  const isBreak = ref(false);
  const panelWidth = inject<ComputedRef<number>>(
    PanelWidthInjectKey,
    computed(() => 0)
  );
  watch(panelWidth, () => {
    if (panelWidth.value < breakPoint) {
      isBreak.value = true;
    } else {
      isBreak.value = false;
    }
  });
  return isBreak
}