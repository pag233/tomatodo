<template>
  <transition name="drawer-slide">
    <div
      class="drawer"
      v-show="!drawerBreak && showDrawer"
      :style="{
        flexBasis: drawerWidth + 'px',
      }"
    >
      <div class="drawer-item-detail" v-if="selectItem"></div>
      <div class="drawer-move-bar" @mousedown="mouseDownHandler"></div>
    </div>
  </transition>
</template>

<script lang ='ts'>
import { computed, defineComponent, PropType, ref } from "vue";
import { mapMutations } from "vuex";

import { useStore } from "@/store";
import { ListItemType } from "@/store/list";

import { getDrawerMouseDownHandler } from "./Drawer";
import { getInjectDrawerBreak } from "../Panel/thePanelPosInfo";

import { getRemSize } from "@/composition/dom";

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
    const store = useStore();

    const drawerWidth = ref(props.width);
    const minDrawerWidth = 240;
    const maxDrawerWidth = 600;
    const mouseDownHandler = getDrawerMouseDownHandler(
      drawerWidth,
      minDrawerWidth,
      maxDrawerWidth
    );
    const drawerBreak = getInjectDrawerBreak("Drawer");

    const selectItem = computed<ListItemType | null>(
      () => store.getters["list/getSelectItem"]
    );

    const themeColor = ref<string>(store.getters["list/getThemeColor"]);
    return {
      drawerBreak,
      drawerWidth,
      mouseDownHandler,
      selectItem,
      themeColor,
    };
  },
  methods: {
    ...mapMutations("list", ["setItemStepComplete", "removeItemStep"]),
  },
  data() {
    return {
      stepCompleteIconSize: getRemSize(),
    };
  },
});
</script>

<style lang="scss" scoped>
.drawer {
  flex: 0 1 120px;
  position: relative;
  border-radius: 0 $corner-border-radius $corner-border-radius 0;
  padding-top: 2rem;

  @include ToTheme($theme-tomato) {
    background-color: $gray;
  }
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