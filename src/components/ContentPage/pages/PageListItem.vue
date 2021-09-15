a<template>
  <div class="page-list-item">
    <span class="is-complete">
      <Round theme="outline" size="18" fill="#ffffff72" />
    </span>
    <span class="item-title">
      {{ item.title }}
    </span>
    <span class="is-important">
      <Star theme="filled" size="18" :fill="themeColor"></Star>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SideBarListItemType } from "@/store/sidebar";
import { Round, Star } from "@icon-park/vue-next";
export default defineComponent({
  name: "PageListItem",
  props: {
    item: {
      type: Object as PropType<SideBarListItemType>,
      required: true,
    },
    themeColor: {
      type: String,
      required: true,
    },
  },
  components: {
    Round,
    Star,
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/_colors.scss";
@import "@/scss/_common.scss";

.page-list-item {
  width: 100%;
  height: 2.6rem;
  display: flex;
  align-items: center;
  border-radius: 0.3rem;
  margin: 1px 0;
  .is-complete {
    margin: 1rem;
  }
  @include ToTheme($theme-tomato) {
    background-color: $opacity-white-dim;
  }
  .item-title {
    flex-grow: 1;
    @include ToTheme($theme-tomato) {
      color: $white;
    }
  }
  .is-important {
    margin: 0 1rem;
  }
}
</style>