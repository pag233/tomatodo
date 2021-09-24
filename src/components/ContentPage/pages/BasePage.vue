<template>
  <div class="base-page">
    <PageTitle :selectListType="selectListType" />
    <div class="page-list">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useSelectListType } from "@/composition/common";

import PageTitle from "./PageTitle.vue";

export default defineComponent({
  name: "PageTomato",
  components: {
    PageTitle,
  },

  setup() {
    const selectListType = useSelectListType();
    return {
      selectListType,
    };
  },
});
</script>

<style lang="scss" scoped>
.page-list {
  overflow: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>