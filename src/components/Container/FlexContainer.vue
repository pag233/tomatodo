<template>
  <div class="flex-container">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  name: "FlexContainer",
});
</script>

<style lang="scss">
.flex-container {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>