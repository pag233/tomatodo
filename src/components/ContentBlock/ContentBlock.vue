<template>
  <section class="content-block" :class="{ 'round-corner': isBreak }"></section>
</template>

<script lang='ts'>
import { defineComponent, PropType } from "vue";
import { useWatchSideBarBreak } from "../Panel/useWatchSideBarBreak";
import { PanelBreakPointsType } from "../Panel/thePanelBreakPoint";

export default defineComponent({
  name: "ContentBlock",

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

.content-block {
  flex: 1 0 200px;
  border-radius: 0 $border-radius $border-radius 0;
  @include ToTheme($theme-tomato) {
    background-color: $white;
  }
}
.round-corner {
  border-radius: $border-radius;
}
</style>