<template>
  <div class="left-bar" @mousedown="leftBarOnMouseDown"></div>
  <div class="right-bar" @mousedown="rightBarOnMouseDown"></div>
  <div class="top-bar" @mousedown="topBarOnMouseDown"></div>
  <div class="bottom-bar" @mousedown="bottomBarOnMouseDown"></div>
</template>


<script lang="ts">
import { gtZero } from "@/helper";
import { defineComponent } from "vue";
import { PositionType, Position } from "./thePanelSizeScale";
import { MouseDownHandlers } from "./resizeBar";
export default defineComponent({
  name: "VerticalResizeBar",

  emits: {
    [Position.emitType](pos: PositionType) {
      return Object.values(pos).every((value) => typeof value === "number");
    },
  },

  props: {
    minWidth: {
      type: Number,
      required: true,
      validator: gtZero,
    },
    minHeight: {
      type: Number,
      required: true,
      validator: gtZero,
    },
  },

  setup(props, { emit }) {
    const handlers = MouseDownHandlers(emit, props.minWidth, props.minHeight);
    return {
      leftBarOnMouseDown: handlers.left,
      rightBarOnMouseDown: handlers.right,
      topBarOnMouseDown: handlers.top,
      bottomBarOnMouseDown: handlers.bottom,
    };
  },
});
</script>

<style lang="scss" scoped>
.left-bar,
.right-bar,
.top-bar,
.bottom-bar {
  position: absolute;
  cursor: grab;
  background-color: teal;
}
.left-bar,
.right-bar {
  width: 1rem;
  height: 100%;
}
.right-bar {
  right: 0;
}
.top-bar,
.bottom-bar {
  height: 1rem;
  width: 100%;
}
.top-bar {
  top: 0;
}
.bottom-bar {
  bottom: 0;
}
</style>