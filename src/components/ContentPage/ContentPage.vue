<template>
  <section class="content-page" :class="{ 'round-corner': isBreak }">
    <component :is="selectListType"></component>
  </section>
</template>

<script lang='ts'>
import { defineComponent, PropType } from "vue";
import { useWatchSideBarBreak } from "../Panel/useWatchSideBarBreak";
import { PanelBreakPointsType } from "../Panel/thePanelBreakPoint";

import { ListsTypes } from "../../store/sidebar";
import TomatoPage from "./pages/Tomato.vue";

import { useSelectListType } from "@/composition/common";

export default defineComponent({
  name: "ContentPage",

  props: {
    breakPoints: {
      type: Object as PropType<PanelBreakPointsType>,
      required: true,
    },
    barWidth: {
      type: Number,
      required: true,
    },
  },

  components: {
    [ListsTypes.tomato]: TomatoPage,
  },

  setup(props) {
    const isBreak = useWatchSideBarBreak(props.breakPoints.sidebar);
    const selectListType = useSelectListType();
    return {
      isBreak,
      selectListType,
      ListsTypes,
    };
  },
});
</script>

<style lang="scss">
@import "@/scss/_common.scss";
@import "@/scss/_colors.scss";

.content-page {
  flex: 1 0 180px;
  box-sizing: border-box;
  border-radius: 0 $border-radius $border-radius 0;
  padding: 2rem 1rem 1rem 1rem;
  @include ToTheme($theme-tomato) {
    background-color: $black-dim;
  }
  .content-container {
    width: 100%;
    height: 100%;
  }
}
.round-corner {
  border-radius: $border-radius;
}
</style>