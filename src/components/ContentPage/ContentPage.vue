<template>
  <section
    class="content-page"
    @click.self.stop="setDrawerShow(false)"
    :class="{
      'round-corner': breakPoints.sideBarBreak,
      'not-round-corner': drawerShow,
    }"
    :style="{
      minWidth: minWidth + 'px',
    }"
  >
    <component :is="selectListType" :setDrawerShow="setDrawerShow"></component>
  </section>
</template>

<script lang='ts'>
import { defineComponent, PropType } from "vue";
import { useSelectListType } from "@/composition/common";
import { ListsTypes } from "../../store/list";

import TomatoPage from "./pages/TomatoPage.vue";
import { useInjectPanelBreakPoints } from "../Panel/thePanelPosInfo";

export default defineComponent({
  name: "ContentPage",

  props: {
    drawerShow: {
      type: Boolean,
      required: true,
    },
    setDrawerShow: {
      type: Function as PropType<(value: boolean) => void>,
      required: true,
    },
    minWidth: {
      type: Number,
      required: true,
    },
  },
  components: {
    [ListsTypes.tomato]: TomatoPage,
  },

  setup() {
    const selectListType = useSelectListType();
    const breakPoints = useInjectPanelBreakPoints();
    return {
      selectListType,
      ListsTypes,
      breakPoints,
    };
  },
});
</script>

<style lang="scss">
.content-page {
  @include ToTheme("tomato") {
    background-color: $--black-dim;
  }

  box-sizing: border-box;
  border-radius: 0 $--corner-border-radius $--corner-border-radius 0;
  padding: $--content-padding;

  flex: 1 0;
}
.not-round-corner {
  border-radius: 0;
}
.round-corner {
  border-radius: $--corner-border-radius;
}
</style>