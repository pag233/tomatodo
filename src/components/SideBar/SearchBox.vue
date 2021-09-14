<template>
  <div class="search-box">
    <Search class="search-icon" :size="14" />
    <input
      type="text"
      class="search-box-input"
      placeholder="搜索"
      :value="value"
      @change="setSearchValue({ value: $event.target.value })"
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import { Search } from "@icon-park/vue-next";
export default defineComponent({
  name: "SearchBox",

  components: {
    Search,
  },

  computed: {
    ...mapState("search", ["value"]),
  },

  methods: {
    ...mapMutations("search", ["setSearchValue"]),
  },
});
</script>

<style lang="scss">
@import "@/scss/_common.scss";
@import "@/scss/_colors.scss";

$text-indent: 30px;
.search-box {
  position: relative;
  .search-icon {
    position: absolute;
    top: 0;
    padding-top: $icon-top-offset * 1px;
    margin-left: $icon-left-offset * 1px;
  }
  .search-box-input {
    width: 100%;
    height: 22px;
    box-sizing: border-box;

    outline: none;

    border: none;
    border-radius: 0.35 * $rem-size * 1px;
    border-bottom: 0.1px solid #ffffff9e;

    text-indent: $text-indent;

    @include ToTheme("theme-tomato") {
      background-color: $gray;
      color: white;
      font-weight: 400;
    }
    &::placeholder {
      color: white;
      text-indent: $text-indent;
    }
  }
}
</style>