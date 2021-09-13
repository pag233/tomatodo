<template>
  <div class="panel-button">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  name: "PanelButton",
});
</script>

<style lang="scss">
.panel-button button {
  outline: none;
  padding: 0;
  border: 0;
  overflow: visible;
  margin: 0;
  cursor: pointer;

  height: 1rem;
  width: 2rem;
  border-radius: 0.5rem;

  margin: 0.5rem;
}
</style>