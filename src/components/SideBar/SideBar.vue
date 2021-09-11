<template>
  <section class="side-bar"></section>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideBar",
});
</script>

<style lang="scss">
@import "@/scss/_common.scss";
@import "@/scss/_colors.scss";

.side-bar {
  @include ToTheme($theme-tomato) {
    color: $white;
    border: 1px solid $white;
  }
  flex: 0 0 10rem;
  border-radius: $border-radius 0 0 $border-radius;
  @extend %left-bar-color;
}
</style>