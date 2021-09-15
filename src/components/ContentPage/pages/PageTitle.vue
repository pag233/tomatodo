<template>
  <div class="page-header">
    <h1 class="page-title">{{ selectListType }}</h1>
    <h4 class="page-date">{{ date }}</h4>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "PageHeader",
  props: {
    selectListType: {
      type: String,
      required: true,
    },
  },
  data() {
    const now = new Date();
    return {
      date: now.toLocaleDateString(),
    };
  },
});
</script>

<style lang="scss" scoped>
.page-header {
  margin-bottom: 1rem;

  .page-title,
  .page-date {
    margin: 0;
  }
  .page-title {
    font-size: 2.4rem;
  }
}
</style>