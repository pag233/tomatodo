<template>
  <div
    class="round"
    :class="{
      'filled-round': item.isComplete,
    }"
    :style="{
      width: size + 'px',
      height: size + 'px',
    }"
  >
    <span class="check-mark" v-if="item.isComplete">✓</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ListItemStepType, ListItemType } from "@/store/list";
import { getRemSize } from "@/composition/dom";

export default defineComponent({
  name: "CompleteIcon",
  props: {
    item: {
      type: Object as PropType<ListItemStepType | ListItemType>,
      required: true,
    },
    size: {
      type: Number,
      default: 1.2 * getRemSize(),
    },
  },
});
</script>

<style lang="scss" scoped>
.round {
  margin: auto;
  border-radius: 50%;
  box-sizing: border-box;
  border: 2px solid $--opacity-white;
}
.filled-round {
  background-color: $--white;
}
.check-mark {
  display: block;
  height: 100%;
  width: 100%;
  line-height: 100%;
  text-align: center;
  color: $--black-dim;
}
</style>