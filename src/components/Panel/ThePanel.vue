<template>
  <div
    class="panel"
    :style="{
      ...position,
      minWidth: minWidth + 'px',
      minHeight: minHeight + 'px',
    }"
  >
    <ResizeBar
      @update:pos="setPos"
      :minWidth="minWidth"
      :minHeight="minHeight"
    />
    <slot></slot>
  </div>
</template>


<script lang="ts">
import { computed, defineComponent } from "vue";
import { getInitPanelPosRef, getMinWidthHeight } from "./thePanelSizeScale";
import ResizeBar from "./ResizeBar.vue";
import { checkZeroToHundred } from "@/helper";
export default defineComponent({
  name: "Panel",

  components: {
    ResizeBar,
  },
  props: {
    width: {
      type: Number,
      default: 60,
      validator: checkZeroToHundred,
    },

    height: {
      type: Number,
      default: 80,
      validator: checkZeroToHundred,
    },
  },

  setup(props) {
    const [pos, setPos] = getInitPanelPosRef(props.width, props.height);
    const { minWidth, minHeight } = getMinWidthHeight(
      props.width,
      props.height
    );
    return {
      position: computed(() => ({
        top: pos.value.top + "px",
        left: pos.value.left + "px",
        right: pos.value.right + "px",
        bottom: pos.value.bottom + "px",
      })),
      setPos,
      minWidth,
      minHeight,
    };
  },
});
</script>


<style lang="scss" scoped>
@import "@/scss/_mixin.scss";
.panel {
  position: absolute;
  background-color: tomato;
  margin: auto;
  width: auto;
  height: auto;
  @include BorderRadius;
}
</style>