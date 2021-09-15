<template>
  <AlarmClockIcon :size="18" fill="#f27983" />
</template>

<script>
import { AlarmClock as AlarmClockIcon } from "@icon-park/vue-next";

export default {
  name: "AlarmClock",
  components: {
    AlarmClockIcon,
  },
};
</script>