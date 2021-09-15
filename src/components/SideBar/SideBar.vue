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
import { defineComponent, PropType } from "vue";
import { mapGetters } from "vuex";

import { useWatchSideBarBreak } from "../Panel/useWatchSideBarBreak";
import { PanelBreakPointsType } from "../Panel/thePanelBreakPoint";
import { BarWidthEmitType } from "./SideBarWidth";

import SideBarResizeBar from "./SideBarResizeBar.vue";
import SideBarListItem from "./SideBarListItem.vue";
import SearchBox from "./SearchBox.vue";
import SideBarFooter from "./SideBarFooter.vue";
import SideBarFooterAddList from "./SideBarFooterAddList.vue";

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
    SideBarFooter,
    SideBarFooterAddList,
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
      ...mapGetters("sidebar", ["getLists", "getUserCreateLists"]),
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
  min-width: 150px;
  max-width: 600px;
  flex: 0 1;
  border-radius: 8px 0 0 $border-radius;
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