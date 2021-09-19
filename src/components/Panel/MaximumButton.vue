<template>
  <PanelButton>
    <button v-if="!isMaximum" class="maximum-button" @click="maximumPanel">
      <ExpandTextInput
        class="icon"
        theme="outline"
        size="14"
        fill="#f1f2d8"
        :strokeWidth="6"
      />
    </button>
    <button v-else class="maximum-button" @click="restorePanel">
      <CollapseTextInput
        class="icon"
        theme="outline"
        size="14"
        fill="#f1f2d8"
        :strokeWidth="6"
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
  @include ToTheme($theme-tomato) {
    background-color: $orange;
  }
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