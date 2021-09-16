a<template>
  <div class="page-list-item">
    <span class="is-complete">
      <Round theme="outline" size="18" fill="#ffffff72" />
    </span>
    <div class="item-info">
      <span class="item-title">
        {{ item.title }}
      </span>
      <div class="item-remind-icon">
        {{ item.listType }}
        {{ item.isOnTomato && "OnTomato" }}
        <!-- {{ item.isOnTomato && selectListType !== "tomato" && "OnTomato" }} -->
        <span
          class="remind-date"
          :style="{
            color: themeColor,
          }"
        >
          {{ item.remindDate }}
          {{ item.repeat }}
        </span>
        {{ item.deadLine }}
      </div>
    </div>
    <span class="is-important">
      <Star
        :theme="item.isImportant ? 'filled' : 'outline'"
        size="18"
        :fill="themeColor"
      ></Star>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SideBarListItemType } from "@/store/sidebar";
import { Round, Star } from "@icon-park/vue-next";
import { useSelectListType } from "@/composition/common";
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
  setup() {
    const selectListType = useSelectListType();
    return {
      selectListType,
    };
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
  .item-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    word-spacing: 0.5rem;
    @include ToTheme($theme-tomato) {
      color: $white;
    }
    .item-remind-icon {
      font-size: 0.5rem;
      color: $opacity-white;
    }
  }
  .is-important {
    margin: 0 1rem;
  }
}
</style>