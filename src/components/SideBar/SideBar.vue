<template>
  <section class="side-bar" v-if="!isBreak"></section>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { useWatchSideBarBreak } from "../Panel/useWatchSideBarBreak";
export default defineComponent({
  name: "SideBar",

  props: {
    breakPoint: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const isBreak = useWatchSideBarBreak(props.breakPoint);
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