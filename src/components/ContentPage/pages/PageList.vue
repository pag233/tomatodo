<template>
  <div class="page-list">
    <TomatoPageListItem :items="items" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
// import PageListItem from "./PageListItem.vue";
import { SideBarListItemType } from "@/store/sidebar";
import TomatoPageListItem from "./TomatoPageListItem.vue";
export default defineComponent({
  name: "PageList",
  components: {
    // PageListItem,
    TomatoPageListItem,
  },
  props: {
    items: {
      type: Object as PropType<SideBarListItemType[]>,
      required: true,
    },
    themeColor: {
      type: String,
      required: true,
    },
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