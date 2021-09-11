<template>
  <button class="maximum-button" @click="maximumPanel"></button>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { makeMaximumPanelHandler } from "./maximumButton.comp";
export default defineComponent({
  name: "MaximumButton",

  setup(props, { emit }) {
    return {
      maximumPanel: makeMaximumPanelHandler(emit),
    };
  },
});
</script>

<style lang="scss">
@import "@/scss/_common.scss";
@import "@/scss/_colors.scss";

.maximum-button {
  @include ToTheme($theme-tomato) {
  }
}
</style>