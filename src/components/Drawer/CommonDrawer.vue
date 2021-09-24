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
        <div class="drawer-item-title">
          {{ selectItem.title }}
        </div>
      </BasePageListItem>

      <BaseListItem
        class="drawer-item"
        v-for="step in selectItem.steps"
        :key="step.id"
      >
        <template #front>
          <CompeleteIcon :item="step" :setItemComplete="setItemStepComplete" />
        </template>
        <div class="drawer-item-title">
          <SlashTextWhen :when="step.isComplete">
            {{ step.title }}
          </SlashTextWhen>
        </div>
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
        <div class="drawer-item-title">
          <input
            class="drawer-input-box"
            type="text"
            v-model="newStep"
            :placeholder="
              selectItem.steps.length == 0 ? 'new step' : 'next step'
            "
            @change="addStep(newStep)"
          />
        </div>
      </BaseListItem>

      <BaseListItem
        class="drawer-item drawer-item-sub-title separate-line"
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

      <BaseListItem class="drawer-item drawer-item-title">
        <template #front>
          <AlarmClock
            size="16"
            :class="selectItem.remindDate && 'drawer-item-theme-color'"
          />
        </template>
        <ElDatePicker
          :editable="false"
          :clearable="false"
          :class="remindDate && 'theme-color'"
          placeholder="remind me"
          prefix-icon="none"
          type="datetime"
          v-model="remindDate"
          :format="dateToDay(remindDate).format"
        ></ElDatePicker>
        <template #rear>
          <div
            v-if="selectItem.remindDate"
            class="drawer-item-rear-icon"
            @click="remindDate = undefined"
          >
            𐄂
          </div>
        </template>
      </BaseListItem>
    </div>
  </Drawer>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from "vue";

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

export default defineComponent({
  name: "CommonDrawer",
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
    const selectItem = computed<ListItemType | null>(
      () => store.getters["list/getSelectItem"]
    );
    function toggleToTomato() {
      if (!selectItem.value) return;
      store.commit("list/setItemOnTomato", {
        id: selectItem.value.id,
        isOnTomato: !selectItem.value.isOnTomato,
      });
    }

    const remindDate = ref<Date | undefined>(undefined);

    watch(selectItem, () => {
      if (!selectItem.value) return;
      remindDate.value = selectItem.value.remindDate
        ? new Date(selectItem.value.remindDate)
        : undefined;
    });

    // watch(remindDate, () => {
    //   if (selectItem.value) {
    //     store.dispatch("list/remind", {
    //       id: selectItem.value.id,
    //       remindDate: {
    //         date: remindDate.value?.getTime(),
    //       },
    //     });
    //   }
    // });

    return {
      selectItem,
      toggleToTomato,
      remindDate,
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
  }
  .drawer-item-title {
    color: $--white;
  }
  .drawer-item-sub-title {
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
.drawer-item::v-deep .el-input__inner {
  background-color: $--gray;
  border: none;
  height: 2rem;
  padding: 0;
}
</style>

<style lang="scss">
.theme-color .el-input__inner {
  color: var(--primary-color);
}
</style>