<template>
  <section
    class="side-bar"
    v-show="!isBreak"
    :style="{
      flexBasis: barWidth + 'px',
      minWidth: minBarWidth + 'px',
      maxWidth: maxBarWidth + 'px',
    }"
  >
    <SideBarResizeBar @[BarWidthEmitType.update]="setBarWidth" />
    <SearchBox />
    <SideBarListItem
      v-for="(list, key) in getLists()"
      :key="key"
      :listType="list.listType"
      :setItemCount="list.setItemCount"
    >
      {{ list.name }}
    </SideBarListItem>
    <div class="user-define-list-line"></div>
    <SideBarListItem
      v-for="(list, key) in getUserCreateLists()"
      :key="key"
      :listType="list.listType"
      :setItemCount="list.setItemCount"
    >
      {{ list.name }}
    </SideBarListItem>
    <SideBarFooter>
      <SideBarFooterAddList />
    </SideBarFooter>
  </section>
</template>

<script lang='ts'>
import { defineComponent, inject, PropType } from "vue";
import { mapGetters } from "vuex";

import { useWatchBreakPoint } from "../../composition/useWatchBreakPoint";
import { panelBreakPoints } from "../Panel/thePanelBreakPoint";
import { BarWidthEmitType } from "./SideBarWidth";

import SideBarResizeBar from "./SideBarResizeBar.vue";
import SideBarListItem from "./SideBarListItem.vue";
import SearchBox from "./SearchBox.vue";
import SideBarFooter from "./SideBarFooter.vue";
import SideBarFooterAddList from "./SideBarFooterAddList.vue";
import { BarMinMaxWidthInjectkey } from "../Panel/thePanelPosInfo";

export default defineComponent({
  name: "SideBar",

  props: {
    barWidth: {
      type: Number,
      required: true,
    },
    setBarWidth: {
      type: Function as PropType<(width: number) => void>,
    },
  },

  components: {
    SearchBox,
    SideBarListItem,
    SideBarResizeBar,
    SideBarFooter,
    SideBarFooterAddList,
  },

  setup() {
    const breakPoints = panelBreakPoints;
    const isBreak = useWatchBreakPoint(breakPoints.sidebar);
    const [minBarWidth, maxBarWidth] = inject(BarMinMaxWidthInjectkey, [0, 0]);
    return {
      isBreak,
      minBarWidth,
      maxBarWidth,
    };
  },

  data() {
    return {
      BarWidthEmitType,
      ...mapGetters("list", ["getLists", "getUserCreateLists"]),
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
  flex: 0 1;
  border-radius: 8px 0 0 $corner-border-radius;
  @include ToTheme($theme-tomato) {
    color: $white;
    border: 0.5px solid #ffffff78;
  }
  @extend %left-bar-color;
  .user-define-list-line {
    width: 90%;
    height: 1px;
    margin: 10px auto;
    @include ToTheme($theme-tomato) {
      background-color: $opacity-white;
    }
  }
}
</style>