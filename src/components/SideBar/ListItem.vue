<template>
  <div class="sidebar-list-item">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideBarListItem",
});
</script>

<style lang="scss">
@import "@/scss/_common.scss";
@import "@/scss/_colors.scss";

.sidebar-list-item {
  margin: 0 8px;
}
</style>