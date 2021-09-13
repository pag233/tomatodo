<template>
  <section class="content-block" :class="{ 'round-corner': isBreak }"></section>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { useWatchSideBarBreak } from "../Panel/useWatchSideBarBreak";

export default defineComponent({
  name: "ContentBlock",
  props: {
    sideBarBreakPoint: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const isBreak = useWatchSideBarBreak(props.sideBarBreakPoint);
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
  flex: 1 1 100%;
  border-radius: 0 $border-radius $border-radius 0;
  @include ToTheme($theme-tomato) {
    background-color: $white;
  }
}
.round-corner {
  border-radius: $border-radius;
}
</style>