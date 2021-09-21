<template>
  <ThemeIcon theme="blue" #default="{ themeColor }">
    <ListIcon :fill="themeColor" size="18" />
  </ThemeIcon>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { List as ListIcon } from "@icon-park/vue-next";
import ThemeIcon from "./ThemeIcon.vue";
export default defineComponent({
  name: "List",
  components: {
    ListIcon,
    ThemeIcon,
  },
});
</script>