<template>
  <ThemeIcon theme="blue" #default="{ themeColor }">
    <ViewListIcon :fill="themeColor" size="18" />
  </ThemeIcon>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { ViewList as ViewListIcon } from "@icon-park/vue-next";
import ThemeIcon from "./ThemeIcon.vue";
export default defineComponent({
  name: "ViewList",
  components: {
    ViewListIcon,
    ThemeIcon,
  },
});
</script>