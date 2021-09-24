
<template>
  <StarIcon class="star-icon" size="18" />
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { Star as StarIcon } from "@icon-park/vue-next";
export default defineComponent({
  name: "Star",
  components: {
    StarIcon,
  },
});
</script>
<style lang="scss" scoped>
.star-icon {
  color: $--yellow;
}
</style>