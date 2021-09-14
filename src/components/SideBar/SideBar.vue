<template>
  <section
    class="side-bar"
    v-show="!isBreak"
    :style="{
      flexBasis: barWidth + 'px',
      minWidth: minBarWidth,
    }"
  >
    <SideBarResizeBar @[BarWidthEmitType.update]="setBarWidth" />
    <SideBarListItem>
      <SearchBox />
    </SideBarListItem>
  </section>
</template>

<script lang='ts'>
import { defineComponent, PropType } from "vue";
import { useWatchSideBarBreak } from "../Panel/useWatchSideBarBreak";
import { PanelBreakPointsType } from "../Panel/thePanelBreakPoint";
import { BarWidthEmitType } from "./SideBarWidth";

import SideBarResizeBar from "./SideBarResizeBar.vue";
import SideBarListItem from "./ListItem.vue";
import SearchBox from "./SearchBox.vue";

export default defineComponent({
  name: "SideBar",

  props: {
    breakPoints: {
      type: Object as PropType<PanelBreakPointsType>,
      required: true,
    },
  },

  components: {
    SearchBox,
    SideBarListItem,
    SideBarResizeBar,
  },

  setup(props) {
    const isBreak = useWatchSideBarBreak(props.breakPoints.sidebar);
    return {
      isBreak,
    };
  },

  methods: {
    setBarWidth(barWidth: number) {
      this.barWidth = barWidth;
    },
  },

  data() {
    return {
      barWidth: 200,
      minBarWidth: 100,
      BarWidthEmitType,
    };
  },
});
</script>

<style lang="scss">
@import "@/scss/_common.scss";
@import "@/scss/_colors.scss";

.side-bar {
  position: relative;
  box-sizing: border-box;
  padding-top: 2rem;
  min-width: 100px;
  max-width: 600px;
  flex: 0 1;
  border-radius: 8px 0 0 $border-radius;
  @include ToTheme($theme-tomato) {
    color: $white;
    border: 0.5px solid $white;
  }
  @extend %left-bar-color;
}
</style>