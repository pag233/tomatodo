<template>
  <div :class="when && 'slash-text'">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
export default {
  name: "SlashTextWhen",
  props: {
    when: {
      validator(value?: boolean): boolean {
        return typeof value === "boolean" || typeof value === "undefined";
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.slash-text {
  @include ToTheme("tomato") {
    color: $--opacity-white;
  }
  text-decoration: line-through;
}
</style>