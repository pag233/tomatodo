<template>
  <section
    class="content-page"
    @click.self.stop="setShowDrawer(false)"
    :class="{ 'round-corner': sideBarBreak, 'not-round-corner': !drawerBreak }"
  >
    <component
      :is="selectListType"
      :themeColor="themeColors[selectListType]"
      :showDrawer="showDrawer"
      :setShowDrawer="setShowDrawer"
    ></component>
  </section>
</template>

<script lang='ts'>
import { defineComponent, reactive, PropType } from "vue";
import { useWatchBreakPoint } from "../../composition/useWatchBreakPoint";
import { panelBreakPoints } from "../Panel/thePanelBreakPoint";
import { useSelectListType } from "@/composition/common";
import { ListsTypes } from "../../store/list";

import TomatoPage from "./pages/TomatoPage.vue";
import { getInjectDrawerBreak } from "../Panel/thePanelPosInfo";

export default defineComponent({
  name: "ContentPage",

  props: {
    showDrawer: Boolean,
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
    //返回当前选择的列表类型以控制componment渲染不同的Pages
    const selectListType = useSelectListType();
    const themeColors = reactive({
      [ListsTypes.tomato]: "#bf0a2b",
      [ListsTypes.tasks]: "#bf0a2b",
      [ListsTypes.important]: "#bf0a2b",
      [ListsTypes.plains]: "#bf0a2b",
      [ListsTypes.user]: "#bf0a2b",
    });
    //控制Drawer控价何时折叠
    const drawerBreak = getInjectDrawerBreak("ContentPage");

    return {
      sideBarBreak,
      selectListType,
      ListsTypes,
      themeColors,
      drawerBreak,
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
  border-radius: 0 $corner-border-radius $corner-border-radius 0;
  padding: 2rem 1rem 1rem 1rem;
  @include ToTheme($theme-tomato) {
    background-color: $black-dim;
  }
}
.not-round-corner {
  border-radius: 0;
}
.round-corner {
  border-radius: $corner-border-radius;
}
</style>