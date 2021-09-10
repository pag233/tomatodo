<template>
  <div
    class="panel"
    :style="{
      ...position,
    }"
  >
    <ResizeBar
      @update:pos="setPos"
      :minWidth="minWidth"
      :minHeight="minHeight"
      v-if="deskDevice"
    />
    <slot></slot>
  </div>
</template>


<script lang="ts">
import { computed, defineComponent } from "vue";
import { getInitPanelPosRef, getMinWidthHeight } from "./thePanelSizeScale";
import ResizeBar from "./ResizeBar.vue";
import { gtZero } from "@/helper";
export default defineComponent({
  name: "Panel",

  components: {
    ResizeBar,
  },
  props: {
    width: {
      type: Number,
      default: 600,
      validator: gtZero,
    },

    height: {
      type: Number,
      default: 800,
      validator: gtZero,
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
  methods: {
    showResizeBar(): void {
      this.deskDevice = !this.deskDevice;
    },
  },
  data() {
    return {
      deskDevice: true,
    };
  },
});
</script>


<style lang="scss" scoped>
@import "@/scss/_common.scss";
@import "@/scss/_colors.scss";
.panel {
  position: absolute;
  background-color: $white;
  margin: auto;
  width: auto;
  height: auto;
  @include BorderRadius;
}
</style>