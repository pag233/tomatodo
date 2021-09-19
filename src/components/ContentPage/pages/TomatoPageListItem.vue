<template>
  <BaseListItem v-for="item in items" :key="item.id" :item="item">
    <div class="item-info" @click="clickInfoHandler(item.id)">
      <span
        class="item-title"
        :class="{
          'item-complete': item.isComplete,
        }"
      >
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
    <template #tomato>
      {{ undefined }}
    </template>
  </BaseListItem>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { ListItemType } from "@/store/list";
import { RotationHorizontal, Plan, Dot, Remind } from "@icon-park/vue-next";

import { useStore } from "@/store";
import { dateToDay } from "@/helper";
import { getInjectDrawerBreak } from "@/components/Panel/thePanelPosInfo";

import BaseListItem from "@/components/Common/BaseListItem.vue";

export default defineComponent({
  name: "TomatoPageListItem",
  props: {
    items: {
      type: Object as PropType<ListItemType[]>,
      required: true,
    },
    showDrawer: Boolean,
    setShowDrawer: {
      type: Function as PropType<(value: boolean) => void>,
      required: true,
    },
  },
  components: {
    RotationHorizontal,
    BaseListItem,
    Plan,
    Dot,
    Remind,
  },
  methods: {
    dateToDay,
  },
  setup(props) {
    const store = useStore();

    const drawerBreak = getInjectDrawerBreak("BasePagelistItem");
    function clickInfoHandler(id: number) {
      !drawerBreak.value && props.setShowDrawer(true);
      store.commit("list/setSelectItem", { id });
    }

    const themeColor = ref<string>(store.getters["list/getThemeColor"]);

    return {
      clickInfoHandler,
      themeColor,
    };
  },
});
</script>

<style lang="scss" scoped>
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
.item-complete {
  text-decoration: line-through;
  color: $opacity-white;
}
</style>