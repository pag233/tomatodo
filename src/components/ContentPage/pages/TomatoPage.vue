<template>
  <BasePage :themeColor="themeColor">
    <TomatoPageList
      :themeColor="themeColor"
      :items="items"
      :showDrawer="showDrawer"
      :setShowDrawer="setShowDrawer"
    />
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
    themeColor: String,
    showDrawer: Boolean,
    setShowDrawer: {
      type: Function as PropType<(value: boolean) => void>,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const items = computed(() => store.getters["sidebar/getTomato"]);
    return {
      items,
    };
  },
});
</script>