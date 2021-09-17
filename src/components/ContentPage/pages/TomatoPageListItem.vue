<template>
  <PageListItem
    v-for="(item, index) in items"
    :key="index"
    :item="item"
    :themeColor="themeColor"
  >
    <template #tomato>
      {{ undefined }}
    </template>
  </PageListItem>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SideBarListItemType } from "@/store/sidebar";
import { useSelectListType } from "@/composition/common";

import PageListItem from "./PageListItem.vue";

export default defineComponent({
  name: "TomatoPageListItem",
  props: {
    items: {
      type: Object as PropType<SideBarListItemType[]>,
      required: true,
    },
  },
  components: {
    PageListItem,
  },
  setup() {
    const selectListType = useSelectListType();
    return {
      selectListType,
    };
  },
  data() {
    return {
      themeColor: "tomato",
    };
  },
});
</script>