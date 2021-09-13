<template>
  <section class="side-bar" v-if="!isBreak"></section>
</template>

<script lang='ts'>
import { defineComponent, PropType } from "vue";
import { useWatchSideBarBreak } from "../Panel/useWatchSideBarBreak";
import { PanelBreakPointsType } from "../Panel/thePanelBreakPoint";

export default defineComponent({
  name: "SideBar",

  props: {
    breakPoints: {
      type: Object as PropType<PanelBreakPointsType>,
      required: true,
    },
  },

  setup(props) {
    const isBreak = useWatchSideBarBreak(props.breakPoints.sidebar);
    return {
      isBreak,
    };
  },
});
</script>

<style lang="scss">
@import "@/scss/_common.scss";
@import "@/scss/_colors.scss";

.side-bar {
  @include ToTheme($theme-tomato) {
    color: $white;
    border: 1px solid $white;
  }
  flex: 0 0 10rem;
  border-radius: $border-radius 0 0 $border-radius;
  @extend %left-bar-color;
}
</style>