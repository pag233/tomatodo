<template>
  <div
    class="drawer"
    v-show="!drawerBreak && showDrawer"
    :style="{
      flexBasis: drawerWidth + 'px',
    }"
  >
    <div class="drawer-move-bar" @mousedown="mouseDownHandler"></div>
  </div>
</template>

<script lang ='ts'>
import { defineComponent, PropType, ref } from "vue";

import { getDrawerMouseDownHandler } from "./Drawer";

export default defineComponent({
  name: "Drawer",
  props: {
    drawerBreak: {
      type: Boolean,
      required: true,
    },
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
    const minDrawerWidth = 200;
    const maxDrawerWidth = 400;
    const mouseDownHandler = getDrawerMouseDownHandler(
      drawerWidth,
      minDrawerWidth,
      maxDrawerWidth
    );
    return {
      drawerWidth,
      mouseDownHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
.drawer {
  flex: 0 1 120px;
  background-color: tomato;
  position: relative;
  .drawer-move-bar {
    position: absolute;
    left: 0;
    height: 100%;
    width: 20px;
    background-color: tan;
    transform: translateX(-50%);
  }
}
</style>