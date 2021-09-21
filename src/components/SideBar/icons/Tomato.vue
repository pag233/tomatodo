<template>
  <ThemeIcon theme="tomato" #default="{ themeColor }">
    <TomatoIcon :fill="themeColor" size="18" />
  </ThemeIcon>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { Tomato as TomatoIcon } from "@icon-park/vue-next";
import ThemeIcon from "./ThemeIcon.vue";
export default defineComponent({
  name: "Tomato",
  components: {
    TomatoIcon,
    ThemeIcon,
  },
});
</script>