<template>
  <BasePageList
    :items="items"
    :setDrawerShow="setDrawerShow"
    :activeBGColor="'#fc93a731'"
  >
    <template #tomato>
      {{ undefined }}
    </template>
  </BasePageList>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ListItemType } from "@/store/list";
import BasePageList from "./BasePageList.vue";

export default defineComponent({
  name: "TomatoPageList",
  props: {
    items: {
      type: Object as PropType<ListItemType[]>,
      required: true,
    },
    setDrawerShow: {
      type: Function as PropType<(value: boolean) => void>,
      required: true,
    },
  },
  components: {
    BasePageList,
  },
});
</script>