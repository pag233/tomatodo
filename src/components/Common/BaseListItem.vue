<template>
  <div
    class="base-list-item"
    :style="{
      height,
    }"
  >
    <div class="base-list-item-front">
      <slot name="front">
        <CompeleteIcon :item="item" :setItemComplete="setItemComplete" />
      </slot>
    </div>
    <div class="base-list-item-title">
      <slot></slot>
    </div>
    <div class="base-list-item-rear">
      <slot name="rear">
        <ImportantIcon
          :item="item"
          :setItemImportant="setItemImportant"
          :themeColor="themeColor"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { mapMutations } from "vuex";

import { useStore } from "@/store";
import { ListItemType } from "@/store/list";

import CompeleteIcon from "./CompleteIcon.vue";
import ImportantIcon from "./ImportantIcon.vue";

export default defineComponent({
  name: "BaseListItem",
  props: {
    item: {
      type: Object as PropType<ListItemType>,
      required: true,
    },
    height: {
      type: String,
      default: "2.6rem",
    },
  },
  components: {
    CompeleteIcon,
    ImportantIcon,
  },
  methods: {
    ...mapMutations("list", ["setItemComplete", "setItemImportant"]),
  },
  setup() {
    const store = useStore();
    const themeColor = ref<string>(store.getters["list/getThemeColor"]);
    return {
      themeColor,
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
  @include ToTheme($theme-tomato) {
    background-color: $opacity-white-dim;
  }
  .base-list-item-front {
    margin: auto;
    flex: 0 0 3rem;
    text-align: center;
  }
  .base-list-item-title {
    flex: 1 1;
  }
  .base-list-item-rear {
    flex: 0 0;
    margin: 0 1rem;
  }
}
</style>