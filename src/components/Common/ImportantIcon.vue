<template>
  <span
    @click="
      setItemImportant({
        item,
        isImportant: !item.isImportant,
      })
    "
  >
    <Star
      :theme="item.isImportant ? 'filled' : 'outline'"
      :size="size"
      class="star-icon"
    />
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ListItemType } from "@/store/list";

import { Star } from "@icon-park/vue-next";

export default defineComponent({
  name: "ImportantIcon",
  props: {
    item: {
      type: Object as PropType<ListItemType>,
      required: true,
    },
    setItemImportant: {
      type: Function as PropType<
        (payload: { item: ListItemType; isImportant: boolean }) => void
      >,
      required: true,
    },
    size: {
      type: Number,
      default: 18,
    },
  },
  components: {
    Star,
  },
});
</script>

<style lang="scss" scoped>
.star-icon {
  color: var(--primary-color);
}
</style>
