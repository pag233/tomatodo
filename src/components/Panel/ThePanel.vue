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
        @[PositionEmitType.restore]="restorePos"
      />
    </div>
    <slot
      :barWidth="barWidth"
      :setBarWidth="setBarWidth"
      :minWidth="minWidth"
      :drawerBreak="drawerBreak"
      :drawerShow="drawerShow"
      :setDrawerShow="setDrawerShow"
      :drawerWidth="drawerWidth"
      :setDrawerWidth="setDrawerWidth"
    ></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import {
  initPanelPosInfo,
  PositionEmitType,
  MaximumEmitType,
  BreakPointsType,
} from "./thePanelPosInfo";

import { gtZero } from "@/helper";
import ResizeBar from "./PanelResizeBar.vue";
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
    const breakPoints: BreakPointsType = {
      sidebar: {
        min: 180,
        max: 600,
      },
      drawer: {
        min: 250,
        max: 600,
      },
    };
    const posInfo = initPanelPosInfo(props.width, props.height, breakPoints);

    const { pos, setPos, minWidth, minHeight, savePos, restorePos } =
      posInfo.position;

    const { isMaximum, setMaximum } = posInfo.maximum;

    const { barWidth, setBarWidth } = posInfo.sideBar;

    const {
      drawerShow,
      setDrawerShow,
      drawerBreak,
      drawerWidth,
      setDrawerWidth,
    } = posInfo.drawer;

    return {
      position: computed(() => ({
        top: pos.value.top + "px",
        left: pos.value.left + "px",
        right: pos.value.right + "px",
        bottom: pos.value.bottom + "px",
      })),
      setPos,
      isMaximum,
      setMaximum,
      minWidth,
      minHeight,
      savePos,
      restorePos,
      barWidth,
      setBarWidth,
      drawerShow,
      setDrawerShow,
      drawerBreak,
      drawerWidth,
      setDrawerWidth,
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
.panel {
  position: absolute;
  margin: auto;
  width: auto;
  height: auto;
  border-radius: $--corner-border-radius;
  border: 1px solid black;
  box-shadow: 1px 1px 4px 0px;
  .btn-container {
    position: absolute;
    top: 0;
    z-index: 1;
  }
}
</style>