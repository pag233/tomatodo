
<template>
  <ThemeIcon theme="yellow" #default="{ themeColor }">
    <StarIcon :fill="themeColor" size="18" />
  </ThemeIcon>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { Star as StarIcon } from "@icon-park/vue-next";
import ThemeIcon from "./ThemeIcon.vue";
export default defineComponent({
  name: "Star",
  components: {
    StarIcon,
    ThemeIcon,
  },
});
</script>