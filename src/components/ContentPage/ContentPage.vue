<template>
  <section
    class="content-page"
    @click.self.stop="onClickPageSelf"
    :class="{
      'round-corner': breakPoints.sideBarBreak,
      'not-round-corner': drawerShow,
    }"
    :style="{
      minWidth: minWidth + 'px',
    }"
  >
    <component :is="selectListName" :setDrawerShow="setDrawerShow"></component>
  </section>
</template>

<script lang='ts'>
import { defineComponent, PropType } from "vue";
import { useSelectListName } from "@/composition/common";
import { ListType } from "../../store/list";

import TomatoPage from "./pages/TomatoPage.vue";
import { useInjectPanelBreakPoints } from "../Panel/thePanelPosInfo";
import { useStore } from "@/store";

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
    [ListType.tomato]: TomatoPage,
  },

  setup(props) {
    const selectListName = useSelectListName();
    const breakPoints = useInjectPanelBreakPoints();

    const store = useStore();

    function onClickPageSelf() {
      props.setDrawerShow(false);
      store.commit("list/setSelectItemId", {
        id: -1,
      });
    }

    return {
      selectListName,
      useSelectListName,
      breakPoints,
      onClickPageSelf,
    };
  },
});
</script>

<style lang="scss">
.content-page {
  background-color: $--black-dim;
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