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
            :fill="themeColor"
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
            :fill="selectItem.isOnTomato ? themeColor : '#fff'"
          />
        </template>
        <div :class="selectItem.isOnTomato && 'drawer-item-theme-color'">
          {{ selectItem.isOnTomato ? "added to Tomato" : "add to Tomato" }}
        </div>
      </BaseListItem>

      <BaseListItem class="drawer-item drawer-item-sub-title">
        <template #front>
          <AlarmClock
            size="16"
            :fill="selectItem.remindDate ? themeColor : '#fff'"
          />
        </template>
        <div :class="selectItem.remindDate && 'drawer-item-theme-color'">
          {{
            selectItem.remindDate
              ? dateToDay(selectItem.remindDate)
              : "remind me"
          }}
        </div>
      </BaseListItem>
    </div>
  </Drawer>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";

import { mapMutations } from "vuex";
import { useStore } from "@/store";
import { ListItemType } from "@/store/list";
import { dateToDay } from "@/helper";

import { Plus, Tomato, AlarmClock } from "@icon-park/vue-next";

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
    const themeColor = ref<string>(store.getters["theme/getCurrentThemeColor"]);

    function toggleToTomato() {
      if (!selectItem.value) return;
      store.commit("list/setItemOnTomato", {
        id: selectItem.value.id,
        isOnTomato: !selectItem.value.isOnTomato,
      });
    }

    return {
      selectItem,
      themeColor,
      toggleToTomato,
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
  .step-item-complete {
    @include ToTheme("tomato") {
      color: $--opacity-white;
    }
    text-decoration: line-through $--white;
  }
  .drawer-item-theme-color {
    @include ToTheme("tomato") {
      color: $--tomato;
    }
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
    @include ToTheme("tomato") {
      background-color: $--gray;
      color: $--tomato;
      &::placeholder {
        color: $--tomato;
      }
    }
    width: 100%;
    font-size: 1.1rem;
    outline: none;
    border: none;
  }
}
</style>