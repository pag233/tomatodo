<template>
  <Drawer
    :drawerShow="drawerShow"
    :drawerWidth="drawerWidth"
    :setDrawerWidth="setDrawerWidth"
  >
    <div class="drawer-item-detail" v-if="selectItem">
      <BasePageListItem
        :item="selectItem"
        class="drawer-item"
        :showInfo="false"
      >
        {{ selectItem.title }}
      </BasePageListItem>

      <BaseListItem
        class="drawer-item"
        v-for="step in selectItem.steps"
        :key="step.id"
      >
        <template #front>
          <CompeleteIcon :item="step" :setItemComplete="setItemStepComplete" />
        </template>
        <SlashTextWhen :when="step.isComplete">
          {{ step.title }}
        </SlashTextWhen>
        <template #rear>
          <div
            class="drawer-item-rear-icon"
            @click="
              removeItemStep({
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
            size="20"
            class="drawer-item-theme-color"
            @click="addStep(newStep)"
          />
        </template>
        <input
          class="drawer-input-box"
          type="text"
          v-model="newStep"
          :placeholder="selectItem.steps.length == 0 ? 'new step' : 'next step'"
          @change="addStep(newStep)"
        />
      </BaseListItem>

      <BaseListItem
        class="drawer-item drawer-item-color-dim separate-line"
        @click="toggleToTomato"
      >
        <template #front>
          <Tomato
            size="16"
            :class="selectItem.isOnTomato && 'drawer-item-theme-color'"
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
            :class="!isOutDate && remindDate && 'drawer-item-theme-color'"
          />
        </template>
        <ElDatePicker
          :editable="false"
          :clearable="false"
          :class="!isOutDate && remindDate && 'theme-color'"
          placeholder="remind me"
          prefix-icon="none"
          type="datetime"
          v-model="remindDate"
          :disabledDate="datePickDisabledDate"
          :format="dateToDay(remindDate).format"
          @change="onDatePickerChange"
        ></ElDatePicker>
        <template #rear>
          <div
            v-if="remindDate"
            class="drawer-item-rear-icon"
            @click="onClearDatePicker"
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
import { ListItemType } from "@/store/list";
import { dateToDay } from "@/helper";

import { Plus, Tomato, AlarmClock } from "@icon-park/vue-next";
import { ElDatePicker } from "element-plus";

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
    CompeleteIcon,
    Drawer,
    ElDatePicker,
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

    const selectItem = computed<ListItemType>(
      () => store.getters["list/getSelectItem"]
    );

    function toggleToTomato() {
      store.commit("list/setItemOnTomato", {
        id: selectItem.value.id,
        isOnTomato: !selectItem.value.isOnTomato,
      });
    }

    const remindDate = ref<Date | undefined>();

    const isOutDate = ref(true);

    watch(selectItem, () => {
      remindDate.value = selectItem.value.remindDate
        ? new Date(selectItem.value.remindDate)
        : undefined;
    });
    //监控是否超时，当日期超过时限或没有设定提醒日期时Timeout状态对象中的clearId为-1
    watchEffect(() => {
      if (selectItem.value) {
        const remindTimeout = store.getters["timeouts/getRemindById"](
          selectItem.value.id
        ) as TimeoutType;
        if (remindTimeout.clearId === -1) {
          isOutDate.value = true;
        } else {
          isOutDate.value = false;
        }
      }
    });

    function onDatePickerChange(date: Date) {
      store.commit("list/setItemRemindDate", {
        id: selectItem.value.id,
        remindDate: date.getTime(),
      });
      store.dispatch("timeouts/startRemind", {
        id: selectItem.value.id,
        remindDate: date.getTime(),
      });
    }

    function onClearDatePicker() {
      remindDate.value = undefined;
      store.commit("list/setItemRemindDate", {
        id: selectItem.value.id,
        remindDate: undefined,
      });
      store.commit("timeouts/clearRemind", {
        id: selectItem.value.id,
      });
    }

    return {
      selectItem,
      toggleToTomato,
      remindDate,
      onDatePickerChange,
      onClearDatePicker,
      isOutDate,
    };
  },

  methods: {
    ...mapMutations("list", [
      "setItemStepComplete",
      "removeItemStep",
      "addItemStep",
    ]),
    addStep(title: string) {
      if (this.newStep === "") return;
      this.addItemStep({
        title,
      });
      this.newStep = "";
    },
    dateToDay,
    datePickDisabledDate(date: Date) {
      return date.getTime() < Date.now() - 86400000;
    },
  },

  data() {
    return {
      newStep: "",
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
}
</style>
<style lang="scss" scoped>
.drawer-item::v-deep .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.drawer-item::v-deep .el-input .el-input__inner {
  color: $--opacity-white;
  background-color: $--gray;
  border: none;
  height: 2rem;
  padding: 0;
}
.drawer-item::v-deep .theme-color.el-input .el-input__inner {
  color: var(--primary-color);
}
</style>