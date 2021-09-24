<template>
  <section
    class="side-bar"
    v-show="!breakPoints.sideBarBreak"
    :style="{
      flexBasis: barWidth + 'px',
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

import { BarWidthEmitType } from "./SideBarWidth";

import SideBarResizeBar from "./SideBarResizeBar.vue";
import SideBarListItem from "./SideBarListItem.vue";
import SearchBox from "./SearchBox.vue";
import SideBarFooter from "./SideBarFooter.vue";
import SideBarFooterAddList from "./SideBarFooterAddList.vue";
import { useInjectPanelBreakPoints } from "../Panel/thePanelPosInfo";

export default defineComponent({
  name: "SideBar",

  props: {
    barWidth: {
      type: Number,
      required: true,
    },
    setBarWidth: {
      type: Function as PropType<(width: number) => void>,
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
  setup() {
    const breakPoints = useInjectPanelBreakPoints();
    return {
      breakPoints,
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
.side-bar {
  color: $--white;
  border: 0.5px solid #ffffff78;
  background-color: $--black;

  border-radius: 8px 0 0 $--corner-border-radius;
  box-sizing: border-box;
  padding-top: 2rem;

  position: relative;

  .user-define-list-line {
    background-color: $--opacity-white;
    width: 90%;
    height: 1px;
    margin: 10px auto;
  }
}
</style>