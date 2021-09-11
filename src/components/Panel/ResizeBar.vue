<template>
  <div class="resize-bar left-bar" @mousedown="leftBarOnMouseDown"></div>
  <div class="resize-bar right-bar" @mousedown="rightBarOnMouseDown"></div>
  <div class="resize-bar top-bar" @mousedown="topBarOnMouseDown"></div>
  <div class="resize-bar bottom-bar" @mousedown="bottomBarOnMouseDown"></div>
</template>


<script lang="ts">
import { gtZero } from "@/helper";
import { defineComponent } from "vue";
import { PositionType, Position } from "./thePanelSizeScale";
import { MouseDownHandlers } from "./resizeBar";
export default defineComponent({
  name: "ResizeBar",

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
@import "@/scss/_common.scss";
@import "@/scss/_colors.scss";
.resize-bar {
  position: absolute;
  @include ToTheme($theme-tomato) {
    background-color: $black;
  }
  transition: opacity 0.2s ease-out;
  opacity: 0.3;
  &:hover {
    opacity: 0.5;
    cursor: grabbing;
  }
  //居中，并分别设置top, left, bottom, right 为-100%调整至合适的位置
  inset: 0 0 0 0;
  margin: auto;
}

// 控制条高宽度自适应自身维度
$width-height: calc(100% - 20rem);

.left-bar {
  left: -100%;

  height: 2rem;
  width: 1rem;
  border-radius: 1em 0 0 1em;
  transform: translateX(-50%);
}
.right-bar {
  right: -100%;

  height: 2rem;
  width: 1rem;
  border-radius: 0 1em 1em 0;
  transform: translateX(50%);
}
.top-bar {
  top: -100%;

  height: 1rem;
  width: 4rem;
  border-radius: 1rem 1rem 0 0;

  transform: translateY(-50%);
}
.bottom-bar {
  bottom: -100%;
  height: 1rem;
  width: 2rem;
  border-radius: 0 0 1rem 1rem;
  transform: translateY(50%);
}
</style>