<template>
  <div class="sidebar-footer-add-list">
    <div class="sidebar-icon">
      <Plus theme="filled" size="20" fill="#f1f2d8" />
    </div>
    <div class="sidebar-txt">new list</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { Plus } from "@icon-park/vue-next";

export default defineComponent({
  name: "SideBarFooterAddList",
  components: {
    Plus,
  },
});
</script>

<style lang="scss" scoped>
.sidebar-footer-add-list {
  @extend %sidebar-list-item;
  align-items: flex-start;
  .sidebar-txt {
    font-size: 1rem;
  }
}
</style>