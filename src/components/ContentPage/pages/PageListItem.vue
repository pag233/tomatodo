<template>
  <div class="page-list-item">
    <span class="is-complete">
      <div
        class="round"
        :class="{
          'filled-round': item.isComplete,
        }"
        @click="
          setItemComplete({
            id: item.id,
            isComplete: !item.isComplete,
          })
        "
      >
        <span class="check-mark" v-if="item.isComplete">✓</span>
      </div>
    </span>
    <div class="item-info">
      <span class="item-title">
        {{ item.title }}
      </span>
      <div class="item-info-detail">
        {{ item.listType }}

        <slot name="tomato">
          <Dot class="detail-spe-icon" size="10" v-if="item.isOnTomato"></Dot>
          {{ item.isOnTomato && "OnTomato" }}
        </slot>

        <div
          class="deadline"
          :style="{
            color: themeColor,
          }"
        >
          <Dot size="10" class="detail-spe-icon" v-if="item.deadLine"></Dot>
          <Plan size="14" v-if="item.deadLine" />
          <div class="detail-text">
            {{ dateToDay(item.deadLine) }}
          </div>
          <RotationHorizontal size="14" v-if="item.repeat" />
        </div>

        <Dot size="10" class="detail-spe-icon" v-if="item.remindDate"></Dot>
        <Remind v-if="item.remindDate" size="12" />
        <div class="detail-text">
          {{ dateToDay(item.remindDate) }}
        </div>
      </div>
    </div>
    <span
      class="is-important"
      @click="
        setItemImportant({
          id: item.id,
          isImportant: !item.isImportant,
        })
      "
    >
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
import {
  Star,
  RotationHorizontal,
  Plan,
  Dot,
  Remind,
} from "@icon-park/vue-next";
import { SideBarListItemType } from "@/store/sidebar";

import { dateToDay } from "@/helper";
import { mapMutations } from "vuex";

export default defineComponent({
  name: "PageListItem",
  components: {
    Star,
    RotationHorizontal,
    Plan,
    Dot,
    Remind,
  },
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
  methods: {
    dateToDay,
    ...mapMutations("sidebar", ["setItemComplete", "setItemImportant"]),
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
    .round {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      @include ToTheme($theme-tomato) {
        border: 1px solid $white;
      }
    }
    .filled-round {
      background-color: $white;
    }
    .check-mark {
      display: block;
      height: 100%;
      width: 100%;
      line-height: 100%;
      text-align: center;
      @include ToTheme($theme-tomato) {
        color: $black-dim;
      }
    }
  }
  @include ToTheme($theme-tomato) {
    background-color: $opacity-white-dim;
  }
  .item-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    @include ToTheme($theme-tomato) {
      color: $white;
    }
    .item-info-detail {
      font-size: 0.5rem;
      color: $opacity-white;
      display: flex;
      align-items: center;
      .detail-text {
        margin: 0 6px;
      }
      .deadline {
        display: flex;
        align-items: center;
      }
      .detail-spe-icon {
        @include ToTheme($theme-tomato) {
          color: $opacity-white;
        }
        margin: 0 0.5rem;
      }
    }
  }
  .is-important {
    margin: 0 1rem;
  }
}
</style>