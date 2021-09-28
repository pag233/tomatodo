<template>
  <div class="base-list-item">
    <div class="base-list-item-front">
      <slot name="front"> </slot>
    </div>
    <div class="base-list-item-title">
      <slot> </slot>
    </div>
    <div class="base-list-item-rear">
      <slot name="rear"> </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseListItem",
});
</script>

<style lang="scss" scoped>
.base-list-item {
  width: 100%;
  margin: 1px 0;
  align-items: center;
  border-radius: 0.3rem;
  display: flex;
  .base-list-item-front {
    margin: auto;
    flex: 0 0 3rem;
    text-align: center;
  }
  .base-list-item-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
    flex: 1 1;
  }
  .base-list-item-rear {
    white-space: nowrap;
    flex: 0 0;
    margin: 0 1rem;
  }
}
</style>