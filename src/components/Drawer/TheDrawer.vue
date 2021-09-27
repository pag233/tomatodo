<template>
  <transition name="drawer-slide">
    <div
      class="drawer"
      :style="{
        flexBasis: drawerWidth + 'px',
      }"
      v-show="drawerShow"
    >
      <slot></slot>
      <div class="drawer-move-bar" @mousedown="mouseDownHandler"></div>
    </div>
  </transition>
</template>

<script lang ='ts'>
import { defineComponent, PropType } from "vue";
import { getDrawerMouseDownHandler } from "./Drawer";

export default defineComponent({
  name: "Drawer",
  props: {
    drawerShow: {
      type: Boolean,
      required: true,
    },
    drawerWidth: {
      type: Number,
      required: true,
    },
    setDrawerWidth: {
      type: Function as PropType<(value: number) => void>,
      required: true,
    },
  },
  setup(props) {
    const mouseDownHandler = getDrawerMouseDownHandler(props.setDrawerWidth);
    return {
      mouseDownHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
.drawer {
  background-color: $--gray;

  position: relative;

  border-radius: 0 $--corner-border-radius $--corner-border-radius 0;

  padding: 2rem 0.5rem 0.5rem;
  min-width: 0;

  flex-grow: 0;
  flex-shrink: 1;

  .drawer-move-bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 20px;
    cursor: ew-resize;
    transform: translateX(-50%);
  }
}

.drawer-slide-enter-active {
  transition: all 0.1s ease-out;
}
.drawer-slide-leave-active {
  transition: all 0.1s ease-in;
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  flex-basis: 0 !important;
}
</style>