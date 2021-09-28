<template>
  <div class="base-page">
    <PageTitle :selectListType="selectListName" />
    <div class="page-list">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useSelectListName } from "@/composition/common";

import PageTitle from "./PageTitle.vue";

export default defineComponent({
  name: "PageTomato",
  components: {
    PageTitle,
  },

  setup() {
    const selectListName = useSelectListName();
    return {
      selectListName,
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