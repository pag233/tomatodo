<template>
  <BaseListItem
    v-for="item in items"
    :key="item.id"
    :item="item"
    :setDrawerShow="setDrawerShow"
  >
    <template #tomato>
      {{ undefined }}
    </template>
  </BaseListItem>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ListItemType } from "@/store/list";

import BaseListItem from "@/components/Common/BaseListItem.vue";

export default defineComponent({
  name: "TomatoPageListItem",
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
    BaseListItem,
  },
});
</script>