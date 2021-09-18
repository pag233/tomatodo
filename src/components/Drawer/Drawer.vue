<template>
  <div
    class="drawer"
    v-show="!drawerBreak && showDrawer"
    :style="{
      flexBasis: drawerWidth + 'px',
    }"
  >
    <transition name="drawer-slide">
      <div class="drawer-move-bar" @mousedown="mouseDownHandler"></div>
    </transition>
  </div>
</template>

<script lang ='ts'>
import { defineComponent, PropType, ref } from "vue";

import { getDrawerMouseDownHandler } from "./Drawer";
import { getInjectDrawerBreak } from "../Panel/thePanelPosInfo";

export default defineComponent({
  name: "Drawer",
  props: {
    showDrawer: Boolean,
    setShowDrawer: {
      type: Function as PropType<(value: boolean) => void>,
      required: true,
    },
    width: {
      type: Number,
      default: 200,
    },
  },
  setup(props) {
    const drawerWidth = ref(props.width);
    const minDrawerWidth = 300;
    const maxDrawerWidth = 600;
    const mouseDownHandler = getDrawerMouseDownHandler(
      drawerWidth,
      minDrawerWidth,
      maxDrawerWidth
    );
    const drawerBreak = getInjectDrawerBreak("Drawer");
    return {
      drawerBreak,
      drawerWidth,
      mouseDownHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_common.scss";
@import "@/scss/_colors.scss";
.drawer {
  flex: 0 1 120px;
  position: relative;
  border-radius: 0 $corner-border-radius $corner-border-radius 0;
  @include ToTheme($theme-tomato) {
    background-color: $gray;
  }
  .drawer-move-bar {
    position: absolute;
    left: 0;
    height: 100%;
    width: 20px;
    cursor: ew-resize;
    transform: translateX(-50%);
  }
}
// .drawer-slide-enter {
// }
</style>