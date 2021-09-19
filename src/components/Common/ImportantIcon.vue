<template>
  <span
    @click="
      setItemImportant({
        id: item.id,
        isImportant: !item.isImportant,
      })
    "
  >
    <Star
      :theme="item.isImportant ? 'filled' : 'outline'"
      :size="size"
      :fill="themeColor"
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
        (payload: { id: number; isImportant: boolean }) => void
      >,
      required: true,
    },
    size: {
      type: Number,
      default: 18,
    },
    themeColor: {
      type: String,
      required: true,
    },
  },
  components: {
    Star,
  },
});
</script>