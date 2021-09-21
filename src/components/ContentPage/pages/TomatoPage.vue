<template>
  <BasePage>
    <TomatoPageList :items="tomatoItems" :setDrawerShow="setDrawerShow" />
  </BasePage>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent, PropType } from "vue";
import BasePage from "./BasePage.vue";
import TomatoPageList from "./TomatoPageList.vue";

export default defineComponent({
  name: "TomatoPage",
  components: {
    BasePage,
    TomatoPageList,
  },
  props: {
    setDrawerShow: {
      type: Function as PropType<(value: boolean) => void>,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const tomatoItems = computed(() => store.getters["list/getTomato"]);
    return {
      tomatoItems,
    };
  },
});
</script>
