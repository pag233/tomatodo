<template>
  <Drawer
    :drawerShow="drawerShow"
    :drawerWidth="drawerWidth"
    :setDrawerWidth="setDrawerWidth"
  >
    <div class="drawer-item-detail" v-if="selectItem">
      <div class="sperate-line">
        <BaseListItem :item="selectItem" class="drawer-item">
          <div class="drawer-item-title">
            {{ selectItem.title }}
          </div>
        </BaseListItem>
        <BaseListItem
          class="drawer-item"
          v-for="step in selectItem.steps"
          :key="step.id"
          :item="step"
        >
          <template #front>
            <CompeleteIcon
              :item="step"
              :setItemComplete="setItemStepComplete"
            />
          </template>
          <div class="drawer-item-title">
            {{ step.title }}
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
        <BaseListItem class="drawer-item" :item="selectItem">
          <template #front>
            <Plus
              size="20"
              :fill="themeColor"
              class="drawer-item-theme-color"
            />
          </template>
          <div class="drawer-item-title">
            <input
              class="drawer-input-box"
              :style="{
                color: themeColor,
              }"
              type="text"
              v-model="newStep"
              :placeholder="selectItem.steps.length == 0 ? 'new step' : 'next'"
              @change="addStep(newStep)"
            />
          </div>
          <template #rear>{{ undefined }}</template>
        </BaseListItem>
      </div>
    </div>
  </Drawer>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";

import { mapMutations } from "vuex";
import { useStore } from "@/store";
import { ListItemType } from "@/store/list";

import { Plus } from "@icon-park/vue-next";

import Drawer from "./TheDrawer.vue";
import BaseListItem from "../Common/BaseListItem.vue";
import CompeleteIcon from "../Common/CompleteIcon.vue";

export default defineComponent({
  name: "CommonDrawer",
  components: {
    Drawer,
    BaseListItem,
    CompeleteIcon,
    Plus,
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
    const themeColor = ref<string>(store.getters["theme/getThemeColor"]);
    return {
      selectItem,
      themeColor,
    };
  },
  methods: {
    ...mapMutations("list", [
      "setItemStepComplete",
      "removeItemStep",
      "addItemStep",
    ]),
    addStep(title: string) {
      this.addItemStep({
        title,
      });
      this.newStep = "";
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
    height: 2rem;
  }
  .drawer-item-title {
    color: $white;
  }
  .drawer-item-theme-color {
    @include ToTheme($theme-tomato) {
      color: $tomato;
    }
  }
  .drawer-item-rear-icon {
    color: $opacity-white;
    width: 18px;
    text-align: center;
  }
  .sperate-line {
    border-bottom: 1px solid #ffffff65;
    padding-bottom: 0.5rem;
  }
  .drawer-input-box {
    @include ToTheme($theme-tomato) {
      background-color: $gray;
      &::placeholder {
        color: $tomato;
      }
    }
    outline: none;
    border: none;
  }
}
</style>