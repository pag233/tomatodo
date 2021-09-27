<template>
  <div
    class="sidebar-list-item"
    :class="{
      'sidebar-list-item-active': isActive,
    }"
    @click="setSelectListName({ listName })"
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
import { computed, defineComponent, onMounted, ref } from "vue";
import Tomato from "./icons/Tomato.vue";
import ViewList from "./icons/ViewList.vue";
import Star from "./icons/Star.vue";
import AlarmClock from "./icons/AlarmClock.vue";
import List from "./icons/List.vue";

import { ListType, UserCreateListType } from "../../store/list";
import { useStore } from "@/store";
import { mapMutations } from "vuex";
export default defineComponent({
  name: "SideBarListItem",

  props: {
    listType: {
      type: String,
      required: true,
    },
    listName: {
      type: String,
      required: true,
    },
  },

  components: {
    [ListType.tomato]: Tomato,
    [ListType.tasks]: ViewList,
    [ListType.important]: Star,
    [ListType.plans]: AlarmClock,
    [UserCreateListType]: List,
  },

  methods: {
    ...mapMutations("list", ["setSelectListName"]),
  },

  setup(props) {
    const store = useStore();
    const itemCount = ref(0);
    const isActive = computed(
      () => props.listName === store.state.list.select.listName
    );
    onMounted(() => {
      if (props.listType !== "user") {
        itemCount.value = store.getters["list/getListItemCount"](
          props.listType
        );
      } else {
        itemCount.value = store.getters["list/getUserListItemCount"](
          props.listName
        );
      }
    });
    return {
      itemCount,
      ListType,
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