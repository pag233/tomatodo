<template>
  <BasePageList>
    <TomatoPageListItem
      :items="items"
      :themeColor="themeColor"
      :showDrawer="showDrawer"
      :setShowDrawer="setShowDrawer"
    ></TomatoPageListItem>
  </BasePageList>
</template>

<script lang="ts">
import { ListItemType } from "@/store/list";
import { defineComponent, PropType } from "vue";

import TomatoPageListItem from "./TomatoPageListItem.vue";
import BasePageList from "./BasePageList.vue";

export default defineComponent({
  name: "PageList",
  props: {
    items: {
      type: Object as PropType<ListItemType[]>,
      required: true,
    },
    themeColor: {
      type: String,
      required: true,
    },
    showDrawer: Boolean,
    setShowDrawer: {
      type: Function as PropType<(value: boolean) => void>,
      required: true,
    },
  },
  components: {
    TomatoPageListItem,
    BasePageList,
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_colors.scss";

.page-list {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>