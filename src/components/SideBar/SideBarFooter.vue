<template>
  <div class="sidebar-footer"><slot></slot></div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  name: "SideBarFooter",
});
</script>

<style lang="scss" scoped>
.sidebar-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>>