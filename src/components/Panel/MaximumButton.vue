<template>
  <PanelButton>
    <button v-if="!isMaximum" class="maximum-button" @click="maximumPanel">
      <ExpandTextInput
        class="icon"
        fill="#f1f2d8"
        size="14"
        :strokeWidth="6"
        theme="outline"
      />
    </button>
    <button v-else class="maximum-button" @click="restorePanel">
      <CollapseTextInput
        class="icon"
        fill="#f1f2d8"
        size="14"
        :strokeWidth="6"
        theme="outline"
      />
    </button>
  </PanelButton>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { PositionEmitType, MaximumEmitType } from "./thePanelPosInfo";

import { ExpandTextInput, CollapseTextInput } from "@icon-park/vue-next";

import PanelButton from "./PanelButton.vue";

export default defineComponent({
  name: "MaximumButton",

  emits: {
    [MaximumEmitType.update]() {
      return true;
    },
    [PositionEmitType.restore]() {
      return true;
    },
  },

  props: {
    isMaximum: Boolean,
  },

  components: {
    PanelButton,
    ExpandTextInput,
    CollapseTextInput,
  },

  setup(props, { emit }) {
    return {
      maximumPanel: () => emit(MaximumEmitType.update),
      restorePanel: () => emit(PositionEmitType.restore),
    };
  },
});
</script>

<style lang="scss">
.maximum-button {
  background-color: $--orange;
  &:hover {
    .icon {
      visibility: visible;
    }
  }
  .icon {
    transform: rotateZ(90deg);
    visibility: hidden;
  }
}
</style>