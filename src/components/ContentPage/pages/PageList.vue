<template>
  <div class="page-list">
    <PageListItem
      v-for="(item, key) in items"
      :key="key"
      :item="item"
      :themeColor="themeColor"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageListItem from "./PageListItem.vue";
export default defineComponent({
  name: "PageList",
  components: {
    PageListItem,
  },
  props: {
    items: {
      type: Object,
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