<template>
  <div
    class="page-tomato"
    :style="{
      color: themeColor,
    }"
  >
    <PageTitle :selectListType="selectListType" />
    <PageList :items="items" :themeColor="themeColor" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
import { useSelectListType } from "@/composition/common";

import PageTitle from "./PageTitle.vue";
import PageList from "./PageList.vue";

export default defineComponent({
  name: "PageTomato",
  components: {
    PageTitle,
    PageList,
  },
  setup() {
    const store = useStore();
    const selectListType = useSelectListType();

    const items = computed(() => store.getters["sidebar/getTomato"]);
    return {
      selectListType,
      items,
      themeColor: "#bf0a2b",
    };
  },
});
</script>