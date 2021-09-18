<template>
  <div
    class="base-page"
    :style="{
      color: themeColor,
    }"
  >
    <PageTitle :selectListType="selectListType" />
    <slot></slot>
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

  props: {
    themeColor: String,
  },

  setup() {
    const selectListType = useSelectListType();
    return {
      selectListType,
    };
  },
});
</script>