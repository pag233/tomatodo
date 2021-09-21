<template>
  <BaseListItem
    class="page-list-item"
    v-for="(item, idx) in items"
    :key="item.id"
    :item="item"
    :setDrawerShow="setDrawerShow"
    :style="{
      backgroundColor: idx === selectIdx ? activeBGColor : undefined,
    }"
    @click="setSelectIdx(idx)"
  >
    <template #tomato>
      <slot name="tomato"> </slot>
    </template>
  </BaseListItem>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ListItemType } from "@/store/list";

import BaseListItem from "@/components/Common/BaseListItem.vue";

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
    activeBGColor: String,
  },
  components: {
    BaseListItem,
  },
  methods: {
    setSelectIdx(idx: number) {
      this.selectIdx = idx;
    },
  },
  data() {
    return {
      selectIdx: -1,
    };
  },
});
</script>

<style lang="scss" scoped>
.page-list-item {
  height: 3rem;
  @include ToTheme($theme-tomato) {
    background-color: $opacity-white-dim;
  }
}
</style>