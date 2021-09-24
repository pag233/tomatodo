<template>
  <AlarmClockIcon class="alarm-clock-icon" size="18" />
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { AlarmClock as AlarmClockIcon } from "@icon-park/vue-next";
export default defineComponent({
  name: "AlarmClock",
  components: {
    AlarmClockIcon,
  },
});
</script>

<style lang="scss" scoped>
.alarm-clock-icon {
  color: $--leaf;
}
</style>