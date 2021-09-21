<template>
  <BasePageListItem
    class="page-list-item"
    v-for="(item, idx) in items"
    :key="item.id"
    :item="item"
    :setDrawerShow="setDrawerShow"
    :class="idx === selectIdx && 'page-list-item--active'"
    @click="setSelectIdx(idx)"
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
    BasePageListItem,
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
  @include ToTheme("tomato") {
    background-color: $--opacity-white-dim;
  }
}
.page-list-item--active {
  @include ToTheme("tomato") {
    background-color: $--tomato-transparent;
  }
}
</style>