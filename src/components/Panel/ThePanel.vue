<template>
  <div
    class="panel"
    :style="{
      ...position,
    }"
  >
    <ResizeBar
      :minWidth="minWidth"
      :minHeight="minHeight"
      v-if="deskDevice"
      @[PositionEmitType.update]="setPos"
      @[MaximumEmitType.update]="setMaximum(false)"
      @[PositionEmitType.save]="savePos"
    />
    <div class="btn-container">
      <MaximumButton
        :isMaximum="isMaximum"
        @[PositionEmitType.update]="setPos"
        @[MaximumEmitType.update]="setMaximum(true)"
        @[PositionEmitType.restore]="resotrePos"
      />
    </div>
    <slot :breakPoints="breakPoints"></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import {
  initPanelPosInfo,
  getMinWidthHeight,
  PositionEmitType,
  MaximumEmitType,
} from "./thePanelPosInfo";
import { panelBreakPoints } from "./thePanelBreakPoint";

import { gtZero } from "@/helper";
import ResizeBar from "./ResizeBar.vue";
import MaximumButton from "./MaximumButton.vue";

export default defineComponent({
  name: "Panel",

  components: {
    ResizeBar,
    MaximumButton,
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
    const posInfo = initPanelPosInfo(props.width, props.height);
    const [pos, setPos] = posInfo.pos;
    const [isMaximum, setMaximum] = posInfo.maximum;

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
      isMaximum,
      setMaximum,
      savePos: posInfo.savePos,
      resotrePos: posInfo.restorePos,
      breakPoints: panelBreakPoints,
    };
  },

  /**
   * @todo 实现终端类型判断
   */
  methods: {
    showResizeBar(): void {
      this.deskDevice = !this.deskDevice;
    },
  },
  data() {
    return {
      deskDevice: true,
      PositionEmitType,
      MaximumEmitType,
    };
  },
});
</script>


<style lang="scss" scoped>
@import "@/scss/_common.scss";
@import "@/scss/_colors.scss";
.panel {
  position: absolute;
  margin: auto;
  width: auto;
  height: auto;
  border-radius: $border-radius;
  @include ToTheme($theme-tomato) {
    border: 1px solid $black;
    box-shadow: 1px 1px 4px 0px;
  }

  .btn-container {
    position: absolute;
    top: 0;
    z-index: 1;
  }
}
</style>