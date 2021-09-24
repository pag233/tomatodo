<template>
  <div
    class="sidebar-list-item"
    :class="{
      'sidebar-list-item-active': isActive,
    }"
    @click="setSelectName({ listType })"
  >
    <div class="sidebar-icon">
      <component :is="listType"></component>
    </div>
    <div class="sidebar-list-content">
      <div class="sidebar-txt">
        <slot></slot>
      </div>
      <div class="item-count">{{ itemCount > 0 ? itemCount : "" }}</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import Tomato from "./icons/Tomato.vue";
import ViewList from "./icons/ViewList.vue";
import Star from "./icons/Star.vue";
import AlarmClock from "./icons/AlarmClock.vue";
import List from "./icons/List.vue";

import { SetItemCountType, ListsTypes } from "../../store/list";
import { useStore } from "@/store";
import { mapMutations } from "vuex";
export default defineComponent({
  name: "SideBarListItem",
  props: {
    listType: {
      type: String,
      required: true,
    },
    setItemCount: {
      type: Function as PropType<SetItemCountType>,
      required: true,
    },
  },
  components: {
    [ListsTypes.tomato]: Tomato,
    [ListsTypes.tasks]: ViewList,
    [ListsTypes.important]: Star,
    [ListsTypes.plans]: AlarmClock,
    [ListsTypes.user]: List,
  },

  methods: {
    ...mapMutations("list", ["setSelectName"]),
  },
  setup(props) {
    const store = useStore();
    const itemCount = ref(0);
    const isActive = computed(
      () => props.listType === store.state.list.select.listType
    );
    onMounted(() => {
      itemCount.value = props.setItemCount(store.state.list.items);
    });
    return {
      itemCount,
      ListsTypes,
      isActive,
    };
  },
});
</script>

<style lang="scss">
.sidebar-list-item {
  @extend %sidebar-list-item;

  color: white;
  &:hover {
    background: #26252327;
  }
  .sidebar-list-content {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item-count {
      color: $--dim-yellow;
      font-size: 0.7rem;
    }
  }
}
.sidebar-list-item-active {
  background-color: $--opacity-white-dim;
}
</style>