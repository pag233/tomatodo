<template>
  <section
    class="content-page"
    :class="{ 'round-corner': sideBarBreak, 'not-round-corner': !drawerBreak }"
  >
    <component
      :is="selectListType"
      :showDrawer="showDrawer"
      :themeColor="themeColors[selectListType]"
      :setShowDrawer="setShowDrawer"
    ></component>
  </section>
</template>

<script lang='ts'>
import { defineComponent, reactive, PropType } from "vue";
import { useWatchBreakPoint } from "../../composition/useWatchBreakPoint";
import { panelBreakPoints } from "../Panel/thePanelBreakPoint";
import { useSelectListType } from "@/composition/common";
import { ListsTypes } from "../../store/sidebar";

import TomatoPage from "./pages/TomatoPage.vue";

export default defineComponent({
  name: "ContentPage",

  props: {
    showDrawer:Boolean,
    drawerBreak: {
      type: Boolean,
      required: true,
    },
    setShowDrawer: {
      type: Function as PropType<(value: boolean) => void>,
      required: true,
    },
  },

  components: {
    [ListsTypes.tomato]: TomatoPage,
  },

  setup() {
    const breakPoints = panelBreakPoints;
    const sideBarBreak = useWatchBreakPoint(breakPoints.sidebar);
    const selectListType = useSelectListType();
    const themeColors = reactive({
      [ListsTypes.tomato]: "#bf0a2b",
      [ListsTypes.tasks]: "#bf0a2b",
      [ListsTypes.important]: "#bf0a2b",
      [ListsTypes.plains]: "#bf0a2b",
      [ListsTypes.user]: "#bf0a2b",
    });
    return {
      sideBarBreak,
      selectListType,
      ListsTypes,
      themeColors,
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
}
.not-round-corner {
  border-radius: 0;
}
.round-corner {
  border-radius: $border-radius;
}
</style>