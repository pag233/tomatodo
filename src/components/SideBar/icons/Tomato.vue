<template>
  <TomatoIcon class="tomato-icon" size="18" />
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { Tomato as TomatoIcon } from "@icon-park/vue-next";
export default defineComponent({
  name: "Tomato",
  components: {
    TomatoIcon,
  },
});
</script>
<style lang="scss" scoped>
.tomato-icon {
  color: $--tomato;
}
</style>