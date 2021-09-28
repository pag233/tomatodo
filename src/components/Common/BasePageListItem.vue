<template>
  <BaseListItem @click="clickInfoHandler(item.id)">
    <template #front>
      <CompeleteIcon
        :item="item"
        @click="
          setItemComplete({
            item,
            isComplete: !item.isComplete,
          })
        "
      />
    </template>
    <div class="item-info">
      <div class="item-title">
        <SlashTextWhen :when="item.isComplete">
          {{ item.title }}
        </SlashTextWhen>
      </div>
      <div class="item-info-detail" v-if="showInfo">
        {{ item.name }}
        <slot name="tomato">
          <Dot class="detail-spe-icon" size="10" v-if="item.isOnTomato"></Dot>
          {{ item.isOnTomato ? "OnTomato" : "" }}
        </slot>
        <div class="deadline" v-if="item.deadLine">
          <Dot size="10" class="detail-spe-icon"></Dot>
          <Plan size="14" />
          <div class="detail-text">
            {{ dateToDay(item.deadLine).day }}
          </div>
        </div>
        <RotationHorizontal class="repeat" size="14" v-if="item.repeat" />
        <div class="remindDate" v-if="item.remindDate">
          <Dot class="detail-spe-icon" size="10"></Dot>
          <Remind size="12" />
          <div class="detail-text">
            {{ dateToDay(item.remindDate).day }}
          </div>
        </div>
      </div>
    </div>
    <template #rear>
      <ImportantIcon :item="item" :setItemImportant="setItemImportant" />
    </template>
  </BaseListItem>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { mapMutations } from "vuex";

import { useStore } from "@/store";
import { ListItemType } from "@/store/list";
import { dateToDay } from "@/helper";

import BaseListItem from "./BaseListItem.vue";
import CompeleteIcon from "./CompleteIcon.vue";
import ImportantIcon from "./ImportantIcon.vue";
import SlashTextWhen from "./SlashTextWhen.vue";

import { RotationHorizontal, Plan, Dot, Remind } from "@icon-park/vue-next";
import { useInjectPanelBreakPoints } from "../Panel/thePanelPosInfo";

export default defineComponent({
  name: "BasePageListItem",
  props: {
    item: {
      type: Object as PropType<ListItemType>,
      required: true,
    },
    setDrawerShow: {
      type: Function as PropType<(value: boolean) => void>,
    },
    showInfo: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    CompeleteIcon,
    ImportantIcon,
    RotationHorizontal,
    Plan,
    Dot,
    Remind,
    SlashTextWhen,
    BaseListItem,
  },
  methods: {
    dateToDay,
    ...mapMutations("list", ["setItemImportant", "setItemComplete"]),
  },

  setup(props) {
    const store = useStore();

    const breakPoints = useInjectPanelBreakPoints();

    function clickInfoHandler(id: number) {
      if (props.setDrawerShow) {
        !breakPoints.drawerBreak && props.setDrawerShow(true);
        store.commit("select/setSelectItemId", { id });
      }
    }
    return {
      clickInfoHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-list-item {
  width: 100%;
  margin: 1px 0;
  align-items: center;
  border-radius: 0.3rem;
  display: flex;
  .base-list-item-front {
    margin: auto;
    flex: 0 0 3rem;
    text-align: center;
  }
  .base-list-item-title {
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
    flex: 1 1;
  }
  .base-list-item-rear {
    white-space: nowrap;
    flex: 0 0;
    margin: 0 1rem;
  }
}
</style>

<style lang="scss" scoped>
.item-info {
  color: $--white;
  .item-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-info-detail {
    color: $--opacity-white;

    font-size: 0.5rem;

    display: flex;
    align-items: center;

    .detail-text {
      margin: 0 6px;
    }
    .deadline {
      color: var(--primary-color);

      display: flex;
      align-items: center;
    }
    .repeat {
      color: var(--primary-color);
    }
    .remindDate {
      display: flex;
      align-items: center;
    }
    .detail-spe-icon {
      margin: 0 0.5rem;
    }
  }
}
</style>