<template>
  <slot :themeColor="themeColor"></slot>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { getThemeColor } from "./useGetThemeColor";

export default defineComponent({
  name: "ThemeIcon",
  props: {
    theme: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const themeColor = getThemeColor(props.theme);
    return {
      themeColor,
    };
  },
});
</script>