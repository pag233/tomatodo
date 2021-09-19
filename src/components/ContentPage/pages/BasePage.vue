<template>
  <div
    class="base-page"
    :style="{
      color: themeColor,
    }"
  >
    <PageTitle :selectListType="selectListType" />
    <div class="page-list">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { useSelectListType } from "@/composition/common";

import PageTitle from "./PageTitle.vue";

export default defineComponent({
  name: "PageTomato",
  components: {
    PageTitle,
  },

  setup() {
    const store = useStore();
    const themeColor = ref<string>(store.getters["list/getThemeColor"]);
    const selectListType = useSelectListType();
    return {
      selectListType,
      themeColor,
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