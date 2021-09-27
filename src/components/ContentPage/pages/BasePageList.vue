<template>
  <BasePageListItem
    class="page-list-item"
    :class="item.id === getSelectItemId && 'page-list-item--active'"
    :item="item"
    :key="item.id"
    :setDrawerShow="setDrawerShow"
    v-for="item in items"
  >
    <template #tomato>
      <slot name="tomato"> </slot>
    </template>
  </BasePageListItem>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ListItemType } from "@/store/list";

import BasePageListItem from "@/components/Common/BasePageListItem.vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "BasePageList",
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
    BasePageListItem,
  },
  computed: {
    ...mapGetters("list", ["getSelectItemId"]),
  },
});
</script>

<style lang="scss" scoped>
.page-list-item {
  height: 3rem;
  background-color: $--opacity-white-dim;
}
.page-list-item--active {
  background-color: var(--secondary-color);
}
</style>