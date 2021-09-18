import {
  ref,
  ComputedRef,
  watch,
  inject,
  Ref,
} from "vue";

import { PanelWidthInjectKey } from "../components/Panel/thePanelPosInfo"

export function useWatchBreakPoint(breakPoint: number, defaultPanelWidth?: ComputedRef<number>): Ref<boolean> {
  const isBreak = ref(false);
  const panelWidth = defaultPanelWidth === undefined ? inject<ComputedRef<number>>(
    PanelWidthInjectKey,
  ) : defaultPanelWidth;
  if (panelWidth === undefined) {
    throw new Error('no panelWidth when using useWatchBreakPoint');
  }
  watch(panelWidth, () => {
    if (panelWidth.value < breakPoint) {
      isBreak.value = true;
    } else {
      isBreak.value = false;
    }
  });
  return isBreak
}