<template>
  <BaseListItem @click="clickInfoHandler(item.id)">
    <template #front>
      <CompeleteIcon :item="item" @click="setItemComplete" />
    </template>
    <div class="task-info">
      <div class="task-title">
        <SlashTextWhen :when="item.isComplete">
          {{ item.title }}
        </SlashTextWhen>
      </div>
      <div class="task-detail" v-if="showInfo">
        {{ item.name }}
        <slot name="tomato">
          <Dot class="detail-spe-icon" size="10" v-if="item.isOnTomato"></Dot>
          {{ item.isOnTomato ? "OnTomato" : "" }}
        </slot>
        <div class="detail-item" v-if="item.steps.length > 0">
          <Dot size="10" class="detail-spe-icon"></Dot>
          <div class="detail-text">
            {{ `${completeStepCount}/${item.steps.length}` }}
          </div>
        </div>
        <div class="detail-item detail-item-primary-color" v-if="item.deadLine">
          <Dot size="10" class="detail-spe-icon"></Dot>
          <Plan size="14" />
          <div class="detail-text">
            {{ dateToDay(item.deadLine).day }}
          </div>
        </div>
        <RotationHorizontal
          class="detail-item-primary-color"
          size="14"
          v-if="item.repeat"
        />
        <div class="detail-item" v-if="item.remindDate">
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
import { computed, defineComponent, PropType } from "vue";
import { mapMutations } from "vuex";
import { cloneDeep } from "lodash";
import dayjs from "dayjs";

import { useStore } from "@/store";
import { ListItemType, RepeatDate } from "@/store/list";
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
    ...mapMutations("list", ["setItemImportant"]),
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

    function setItemComplete() {
      store.commit("list/setItemComplete", {
        item: props.item,
        isComplete: !props.item.isComplete,
      });
      if (props.item.repeat) {
        const repeatItem = cloneDeep(props.item);
        repeatItem.id = store.getters["list/getLastItemId"] + 1;
        repeatItem.isComplete = false;
        if (props.item.repeat === RepeatDate.daily) {
          const nextDay = dayjs(repeatItem.deadLine).add(1, "day").valueOf();
          repeatItem.deadLine = nextDay;

          if (props.item.remindDate) {
            repeatItem.remindDate = nextDay;
            store.commit("timeouts/clearRemind", {
              item: repeatItem,
            });
            store.dispatch("timeouts/startRemind", {
              id: repeatItem.id,
              title: repeatItem.title,
              remindDate: repeatItem.remindDate,
            });
          }
        }
        store.commit("list/addItem", {
          item: repeatItem,
        });
      }
    }

    const completeStepCount = computed(
      () => props.item.steps.filter((step) => step.isComplete).length
    );

    return {
      clickInfoHandler,
      setItemComplete,
      completeStepCount,
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
.task-info {
  color: $--white;
  .task-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .task-detail {
    color: $--opacity-white;

    font-size: 0.5rem;

    display: flex;
    align-items: center;

    .detail-item {
      display: flex;
      align-items: center;
    }
    .detail-item-primary-color {
      color: var(--primary-color);
    }
    .detail-text {
      margin: 0 6px;
    }
    .detail-spe-icon {
      color: $--opacity-white;
      margin: 0 0.5rem;
    }
  }
}
</style>