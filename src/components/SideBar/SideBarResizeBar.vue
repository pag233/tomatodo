<template>
  <div class="sidebar-resize-bar" @mousedown="mousedown"></div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

import {
  BarWidthEmitType,
  getSideBarWidthMouseDownHandler,
} from "./SideBarWidth";

export default defineComponent({
  name: "SideBarResizeBar",
  emits: {
    [BarWidthEmitType.update](barWidth: number) {
      return typeof barWidth === "number";
    },
  },
  data() {
    return {
      BarWidthEmitType,
    };
  },
  setup(props, { emit }) {
    return {
      mousedown: getSideBarWidthMouseDownHandler(emit),
    };
  },
});
</script>

<style lang="scss">
.sidebar-resize-bar {
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(50%);
  height: 100%;
  width: 1rem;
  cursor: ew-resize;
}
</style>