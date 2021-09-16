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
import { useStore } from "@/store";
import { defineComponent } from "vue";
import PageTitle from "./PageTitle.vue";
import PageList from "./PageList.vue";
import { useSelectListType } from "@/composition/common";
export default defineComponent({
  name: "PageTomato",
  components: {
    PageTitle,
    PageList,
  },
  setup() {
    const store = useStore();
    const selectListType = useSelectListType();

    const getTomato = store.getters["sidebar/getTomato"];
    return {
      selectListType,
      items: getTomato,
      themeColor: "#bf0a2b",
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_colors.scss";
</style>