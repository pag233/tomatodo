<template>
  <BasePage>
    <TomatoPageListItem :items="tomatoItems" :setDrawerShow="setDrawerShow" />
  </BasePage>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent, PropType } from "vue";
import BasePage from "./BasePage.vue";
import TomatoPageListItem from "./TomatoPageListItem.vue";

export default defineComponent({
  name: "TomatoPage",
  components: {
    BasePage,
    TomatoPageListItem,
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
