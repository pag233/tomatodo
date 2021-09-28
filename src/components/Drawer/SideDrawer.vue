<template>
  <Drawer
    :drawerShow="drawerShow"
    :drawerWidth="drawerWidth"
    :setDrawerWidth="setDrawerWidth"
  >
    <div class="drawer-item-detail" v-if="selectItem">
      <BasePageListItem
        class="drawer-item"
        :item="selectItem"
        :showInfo="false"
      >
        {{ selectItem.title }}
      </BasePageListItem>

      <BaseListItem
        class="drawer-item"
        :key="step.id"
        v-for="step in selectItem.steps"
      >
        <template #front>
          <CompeleteIcon
            :item="step"
            @click="
              setItemStepComplete({
                item: selectItem,
                id: step.id,
                isComplete: !step.isComplete,
              })
            "
          />
        </template>
        <SlashTextWhen :when="step.isComplete">
          {{ step.title }}
        </SlashTextWhen>
        <template #rear>
          <div
            class="drawer-item-rear-icon"
            @click="
              removeItemStep({
                item: selectItem,
                id: step.id,
              })
            "
          >
            𐄂
          </div>
        </template>
      </BaseListItem>

      <BaseListItem class="drawer-item separate-line">
        <template #front>
          <Plus
            class="drawer-item-theme-color"
            size="20"
            @click="addStep(newStep)"
          />
        </template>
        <input
          @change="addStep(newStep)"
          class="drawer-input-box"
          type="text"
          :placeholder="selectItem.steps.length == 0 ? 'new step' : 'next step'"
          v-model="newStep"
        />
      </BaseListItem>

      <BaseListItem
        class="drawer-item drawer-item-color-dim separate-line"
        @click="toggleToTomato"
      >
        <template #front>
          <Tomato
            :class="selectItem.isOnTomato && 'drawer-item-theme-color'"
            size="16"
          />
        </template>
        <div :class="selectItem.isOnTomato && 'drawer-item-theme-color'">
          {{ selectItem.isOnTomato ? "added to Tomato" : "add to Tomato" }}
        </div>
      </BaseListItem>

      <BaseListItem class="drawer-item drawer-item-color-dim">
        <template #front>
          <AlarmClock
            size="16"
            :class="!isRemindOutDate && remindDate && 'drawer-item-theme-color'"
          />
        </template>
        <ElDatePicker
          @change="onRemindDatePickerChange"
          :class="!isRemindOutDate && remindDate && 'theme-color'"
          :clearable="false"
          :editable="false"
          :disabledDate="datePickDisabledDate"
          :format="dateToDay(remindDate).format"
          placeholder="remind me"
          popper-class="drawer-datepicker-popper"
          prefix-icon="none"
          type="datetime"
          v-model="remindDate"
        />
        <template #rear>
          <div
            class="drawer-item-rear-icon"
            @click="onRemindDatePickerClear"
            v-if="remindDate"
          >
            𐄂
          </div>
        </template>
      </BaseListItem>

      <BaseListItem class="drawer-item drawer-item-color-dim">
        <template #front>
          <Calendar
            :class="!isDeadlineOutDate && deadline && 'drawer-item-theme-color'"
            size="16"
          />
        </template>
        <ElDatePicker
          @change="onDeadLineDatePickerChange"
          :class="!isDeadlineOutDate && deadline && 'theme-color'"
          :clearable="false"
          :disabledDate="datePickDisabledDate"
          :editable="false"
          :format="`before [${dateToDay(deadline).day}]`"
          type="date"
          placeholder="deadline"
          popper-class="drawer-datepicker-popper"
          prefix-icon="none"
          v-model="deadline"
        />
        <template #rear>
          <div
            @click="onDeadLineDatePickerClear"
            class="drawer-item-rear-icon"
            v-if="deadline"
          >
            𐄂
          </div>
        </template>
      </BaseListItem>

      <BaseListItem class="drawer-item drawer-item-color-dim">
        <template #front>
          <LoopOnce
            :class="selectItem.repeat && 'drawer-item-theme-color'"
            size="16"
          />
        </template>
        <ElPopover
          transition="none"
          trigger="click"
          placement="bottom"
          popper-class="draewr-repeat-popover"
          v-model:visible="repeatShow"
        >
          <div class="repeat">
            <div
              class="repeat-item"
              @click="setItemRepeatDate(date)"
              :key="idx"
              v-for="(date, idx) in RepeatDate"
            >
              {{ date }}
            </div>
          </div>
          <template #reference>
            <div @click="repeatShow = true">
              <span v-if="selectItem.repeat" class="drawer-item-theme-color">
                {{ selectItem.repeat }}
              </span>
              <span class="drawer-repeat-select" v-else>repeat</span>
            </div>
          </template>
        </ElPopover>
        <template #rear>
          <div
            @click="onRepeatClear"
            class="drawer-item-rear-icon"
            v-if="selectItem.repeat"
          >
            𐄂
          </div>
        </template>
      </BaseListItem>
    </div>
  </Drawer>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
  watch,
  watchEffect,
} from "vue";

import { mapMutations } from "vuex";
import { useStore } from "@/store";
import { ListItemType, RepeatDate } from "@/store/list";
import { dateToDay } from "@/helper";

import {
  Plus,
  Tomato,
  AlarmClock,
  Calendar,
  LoopOnce,
} from "@icon-park/vue-next";

import { ElDatePicker, ElPopover } from "element-plus";

import Drawer from "./TheDrawer.vue";
import BaseListItem from "../Common/BaseListItem.vue";
import BasePageListItem from "../Common/BasePageListItem.vue";
import CompeleteIcon from "../Common/CompleteIcon.vue";
import SlashTextWhen from "../Common/SlashTextWhen.vue";
import { TimeoutType } from "@/store/timeouts";

export default defineComponent({
  name: "SideDrawer",
  components: {
    AlarmClock,
    BaseListItem,
    BasePageListItem,
    Calendar,
    CompeleteIcon,
    Drawer,
    ElDatePicker,
    ElPopover,
    LoopOnce,
    Plus,
    SlashTextWhen,
    Tomato,
  },

  props: {
    drawerShow: {
      type: Boolean,
      required: true,
    },
    setDrawerShow: {
      type: Function as PropType<(value: boolean) => void>,
      required: true,
    },
    drawerWidth: {
      type: Number,
      required: true,
    },
    setDrawerWidth: {
      type: Function as PropType<(value: number) => void>,
      required: true,
    },
  },

  setup() {
    const store = useStore();

    const selectItem = computed<ListItemType | undefined>(
      () => store.getters["select/getSelectItem"]
    );

    function toggleToTomato() {
      if (!selectItem.value) return;
      store.commit("list/setItemOnTomato", {
        item: selectItem.value,
        isOnTomato: !selectItem.value.isOnTomato,
      });
    }

    const remindDate = ref<Date | undefined>();
    const deadline = ref<Date | undefined>();

    const isRemindOutDate = ref(true);
    const isDeadlineOutDate = ref(true);

    const repeatShow = ref(false);

    watch(selectItem, () => {
      if (!selectItem.value) return;
      remindDate.value = selectItem.value.remindDate
        ? new Date(selectItem.value.remindDate)
        : undefined;

      deadline.value = selectItem.value.deadLine
        ? new Date(selectItem.value.deadLine)
        : undefined;
    });

    watch(deadline, () => {
      if (!deadline.value) return;
      if (deadline.value.getTime() < Date.now() - 86400000) {
        isDeadlineOutDate.value = true;
      } else {
        isDeadlineOutDate.value = false;
      }
    });

    //监控是否超时，当日期超过时限或没有设定提醒日期时Timeout状态对象中的clearId为-1
    watchEffect(() => {
      if (selectItem.value) {
        const remindTimeout = store.getters["timeouts/getRemindById"](
          selectItem.value.id
        ) as TimeoutType;
        if (remindTimeout.clearId === -1) {
          isRemindOutDate.value = true;
        } else {
          isRemindOutDate.value = false;
        }
      }
    });

    function onRemindDatePickerChange(date: Date) {
      if (!selectItem.value) return;
      store.commit("list/setItemRemindDate", {
        item: selectItem.value,
        remindDate: date.getTime(),
      });
      store.dispatch("timeouts/startRemind", {
        item: selectItem.value,
        remindDate: date.getTime(),
      });
    }

    function onRemindDatePickerClear() {
      if (!selectItem.value) return;
      remindDate.value = undefined;
      store.commit("list/setItemRemindDate", {
        item: selectItem.value,
        remindDate: undefined,
      });
      store.commit("timeouts/clearRemind", {
        item: selectItem.value,
      });
    }

    function onDeadLineDatePickerChange(date: Date) {
      if (!selectItem.value) return;
      store.commit("list/setItemDeadLineDate", {
        item: selectItem.value,
        deadLine: date.getTime(),
      });
    }

    function onDeadLineDatePickerClear() {
      if (!selectItem.value) return;
      deadline.value = undefined;
      store.commit("list/setItemDeadLineDate", {
        item: selectItem.value,
        deadLine: undefined,
      });
      store.commit("list/setItemRepeatDate", {
        item: selectItem.value,
        repeat: undefined,
      });
    }

    function onRepeatClear() {
      if (!selectItem.value) return;
      store.commit("list/setItemRepeatDate", {
        item: selectItem.value,
        repeat: undefined,
      });
    }

    function setItemRepeatDate(repeat: string) {
      if (!selectItem.value) return;
      repeatShow.value = false;
      store.commit("list/setItemRepeatDate", {
        item: selectItem.value,
        repeat,
      });
    }

    const newStep = ref("");
    function addStep(title: string) {
      if (newStep.value === "" || !selectItem.value) return;
      store.commit("list/addItemStep", {
        item: selectItem.value,
        title,
      });
      newStep.value = "";
    }

    return {
      newStep,
      addStep,
      toggleToTomato,
      selectItem,
      remindDate,
      isRemindOutDate,
      onRemindDatePickerChange,
      onRemindDatePickerClear,
      deadline,
      isDeadlineOutDate,
      onDeadLineDatePickerClear,
      onDeadLineDatePickerChange,
      repeatShow,
      setItemRepeatDate,
      onRepeatClear,
    };
  },

  methods: {
    ...mapMutations("list", ["setItemStepComplete", "removeItemStep"]),
    dateToDay,
    datePickDisabledDate(date: Date) {
      return date.getTime() < Date.now() - 86400000;
    },
  },

  data() {
    return {
      RepeatDate,
    };
  },
});
</script>

<style lang="scss" scoped>
.drawer-item-detail {
  .drawer-item {
    height: 2.2rem;
    color: $--white;
  }
  .drawer-item-color-dim {
    color: $--opacity-white;
  }
  .drawer-item-theme-color {
    color: var(--primary-color);
  }
  .drawer-item-rear-icon {
    color: $--opacity-white;
    width: 18px;
    text-align: center;
  }
  .separate-line {
    border-bottom: 1px solid #ffffff65;
  }
  .drawer-input-box {
    color: var(--primary-color);
    &::placeholder {
      color: var(--primary-color);
    }
    background-color: $--gray;
    width: 100%;
    font-size: 1.1rem;
    outline: none;
    border: none;
  }
  .drawer-repeat-select {
    font-size: 14px;
  }
}
</style>
<style lang="scss" scoped>
.drawer-item::v-deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}
.drawer-item::v-deep(.el-input .el-input__inner) {
  color: $--opacity-white;
  cursor: default;
  background-color: $--gray;
  border: none;
  height: 2rem;
  padding: 0;
}
.drawer-item::v-deep(.theme-color.el-input .el-input__inner) {
  color: var(--primary-color);
}
.drawer-item::v-deep(.el-input .el-input__inner::placeholder) {
  color: $--opacity-white;
}
</style>

<style lang="scss">
.draewr-repeat-popover {
  --el-text-color-regular: $--gray;
  border: 0.5px solid $--black !important;
  padding: 0 !important;
  .repeat {
    border: 0.5px solid $--opacity-white;
    border-radius: inherit;
    padding: 4px;
    .repeat-item {
      text-align: center;
      height: 1.5rem;
      line-height: 1.5rem;
      border-radius: inherit;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>