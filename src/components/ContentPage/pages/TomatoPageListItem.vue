<template>
  <BasePageListItem
    v-for="(item, index) in items"
    :key="index"
    :item="item"
    :themeColor="themeColor"
    :showDrawer="showDrawer"
    :setShowDrawer="setShowDrawer"
  >
    <template #tomato>
      {{ undefined }}
    </template>
  </BasePageListItem>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ListItemType } from "@/store/list";

import BasePageListItem from "./BasePageListItem.vue";

export default defineComponent({
  name: "TomatoPageListItem",
  props: {
    items: {
      type: Object as PropType<ListItemType[]>,
      required: true,
    },
    themeColor: {
      type: String,
      required: true,
    },
    showDrawer: Boolean,
    setShowDrawer: {
      type: Function as PropType<(value: boolean) => void>,
      required: true,
    },
  },
  components: {
    BasePageListItem,
  },
});
</script>