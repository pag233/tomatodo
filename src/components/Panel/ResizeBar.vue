<template>
  <div class="left-bar" @mousedown="leftBarOnMouseDown">
    <div class="inner-left-background"></div>
  </div>
  <div class="right-bar" @mousedown="rightBarOnMouseDown">
    <div class="inner-right-background"></div>
  </div>
  <div class="top-bar move-bar" @mousedown="topBarOnMouseDown"></div>
  <div class="bottom-bar" @mousedown="bottomBarOnMouseDown">
    <div class="inner-bottom-background"></div>
  </div>
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

$barWidth: 0.5rem;
$barRadius: $radius * 1px;
.left-bar,
.right-bar,
.top-bar,
.bottom-bar {
  position: absolute;
  // cursor: grab;
  background-color: $black;
  transition: opacity 0.2s ease-out;
  border-radius: $barRadius;
  opacity: 0.5;
  &:hover {
    opacity: 0.5;
    cursor: grabbing;
  }
  inset: 0 0 0 0;
  margin: auto;
}

.left-bar,
.right-bar {
  width: 2 * $barWidth;
  height: calc(100% - 40 * #{$barWidth});
}
.top-bar,
.bottom-bar {
  height: 2 * $barWidth;
  width: calc(100% - 40 * #{$barWidth});
}

.left-bar {
  left: -100%;
  // border-top-left-radius: $barRadius;
  // border-bottom-left-radius: $barRadius;
  .inner-left-background {
    transform: translateX(100%);
    width: 50%;
    height: 100%;
    background-color: $white;
  }
}
.right-bar {
  right: -100%;
  // border-top-right-radius: $barRadius;
  // border-bottom-right-radius: $barRadius;
  .inner-right-background {
    // position: absolute;
    width: 50%;
    height: 100%;
    background-color: $white;
  }
}
.top-bar {
  top: -100%;
  // border-top-left-radius: $barRadius;
  // border-top-right-radius: $barRadius;
}
.move-bar {
  height: 4 * $barWidth;
  width: 4 * $barWidth;
}
.bottom-bar {
  bottom: -100%;
  // border-bottom-left-radius: $barRadius;
  // border-bottom-right-radius: $barRadius;
  .inner-bottom-background {
    width: 100%;
    height: 50%;
    background-color: $white;
  }
}
</style>