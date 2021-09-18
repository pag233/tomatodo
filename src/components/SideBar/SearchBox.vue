<template>
  <div class="search-box">
    <Search class="search-icon" :size="16" />
    <input
      type="text"
      class="search-box-input"
      placeholder="Search"
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

@import "@/scss/sidebar.scss";

.search-box {
  position: relative;
  margin: 10px 0;
  padding: 0 20px;
  .search-icon {
    position: absolute;
    top: 50%;
    left: 26px;
    transform: translateY(-50%);
    margin: auto;
  }
  .search-box-input {
    width: 100%;
    height: 22px;
    box-sizing: border-box;

    outline: none;

    border: none;
    border-radius: 0.35 * $rem-size * 1px;

    text-indent: $text-indent * 1px;
    font-weight: 400;

    @include ToTheme("theme-tomato") {
      background-color: $opacity-white-dim;
      color: white;
      border-bottom: 0.1px solid #ffffff9e;
    }
    &::placeholder {
      color: white;
      text-indent: $text-indent * 1px;
    }
  }
}
</style>