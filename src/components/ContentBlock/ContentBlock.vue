<template>
  <section class="content-block"></section>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContentBlock",
});
</script>

<style lang="scss">
@import "@/scss/_common.scss";
@import "@/scss/_colors.scss";

.content-block {
  flex: 1 1 100%;
  border-radius: 0 $border-radius $border-radius 0;
  @include ToTheme($theme-tomato) {
    background-color: $white;
  }
}
</style>