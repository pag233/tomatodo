<template>
  <div class="page-list">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageList",
});
</script>

<style lang="scss" scoped>
.page-list {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>