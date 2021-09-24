<template>
  <ViewListIcon class="view-list-icon" size="18" />
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { ViewList as ViewListIcon } from "@icon-park/vue-next";
export default defineComponent({
  name: "ViewList",
  components: {
    ViewListIcon,
  },
});
</script>

<style lang="scss" scoped>
.view-list-icon {
  color: $--blue;
}
</style>