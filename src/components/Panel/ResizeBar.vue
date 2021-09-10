<template>
  <div class="resize-bar left-bar" @mousedown="leftBarOnMouseDown">
    <div class="resize-inner-cover-color inner-left"></div>
  </div>
  <div class="resize-bar right-bar" @mousedown="rightBarOnMouseDown">
    <div class="resize-inner-cover-color inner-right"></div>
  </div>
  <div class="resize-bar top-bar move-bar" @mousedown="topBarOnMouseDown">
    <div class="resize-inner-cover-color inner-top"></div>
  </div>
  <div class="resize-bar bottom-bar" @mousedown="bottomBarOnMouseDown">
    <div class="resize-inner-cover-color inner-bottom"></div>
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

.resize-bar {
  position: absolute;
  @include ToTheme($theme-tomato) {
    background-color: $black;
  }
  transition: opacity 0.2s ease-out;
  border-radius: $barRadius;
  opacity: 0.5;
  &:hover {
    opacity: 0.5;
    cursor: grabbing;
  }
  //居中，并分别设置top, left, bottom, right 为-100%调整至合适的位置
  inset: 0 0 0 0;
  margin: auto;
  .resize-inner-cover-color {
    @include ToTheme($theme-tomato) {
      background-color: $white;
    }
  }
}

// 控制条高度自适应自身维度
.left-bar,
.right-bar {
  width: 2 * $barWidth;
  height: calc(100% - 40 * #{$barWidth});
  min-height: 8 * $barWidth;
}
// .top-bar,
.bottom-bar {
  height: 2 * $barWidth;
  width: calc(100% - 40 * #{$barWidth});
  min-width: 8 * $barWidth;
}

.left-bar {
  left: -100%;
  // border-top-left-radius: $barRadius;
  // border-bottom-left-radius: $barRadius;
  .inner-left {
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
  .inner-right {
    // position: absolute;
    width: 50%;
    height: 100%;
    background-color: $white;
  }
}
.top-bar {
  top: -100%;
  // border-top-left-radius: $barRadius;
  // border-top-right-radius: $barRadius
  .inner-top {
    width: 100%;
    height: 50%;
    background-color: $white;
    transform: translateY(100%);
  }
}
.move-bar {
  height: 4 * $barWidth;
  width: 4 * $barWidth;
}
.bottom-bar {
  bottom: -100%;
  // border-bottom-left-radius: $barRadius;
  // border-bottom-right-radius: $barRadius;
  .inner-bottom {
    width: 100%;
    height: 50%;
  }
}
</style>