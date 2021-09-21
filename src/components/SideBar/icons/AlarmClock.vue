<template>
  <ThemeIcon theme="leaf" #default="{ themeColor }">
    <AlarmClockIcon :fill="themeColor" size="18" />
  </ThemeIcon>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { AlarmClock as AlarmClockIcon } from "@icon-park/vue-next";
import ThemeIcon from "./ThemeIcon.vue";
export default defineComponent({
  name: "AlarmClock",
  components: {
    ThemeIcon,
    AlarmClockIcon,
  },
});
</script>