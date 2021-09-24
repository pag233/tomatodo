<template>
  <ListIcon class="list-icon" size="18" />
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { List as ListIcon } from "@icon-park/vue-next";
export default defineComponent({
  name: "List",
  components: {
    ListIcon,
  },
});
</script>
<style lang="scss" scoped>
.list-icon {
  color: $--blue;
}
</style>