<template>
  <div
    class="round"
    :style="{
      width: size + 'px',
      height: size + 'px',
    }"
    :class="{
      'filled-round': item.isComplete,
    }"
    @click="
      setItemComplete({
        id: item.id,
        isComplete: !item.isComplete,
      })
    "
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
    setItemComplete: {
      type: Function as PropType<
        (payload: { id: number; isComplete: boolean }) => void
      >,
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
  @include ToTheme($theme-tomato) {
    border: 2px solid $white;
  }
}
.filled-round {
  background-color: $white;
}
.check-mark {
  display: block;
  height: 100%;
  width: 100%;
  line-height: 100%;
  text-align: center;
  @include ToTheme($theme-tomato) {
    color: $black-dim;
  }
}
</style>