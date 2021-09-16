<template>
  <div class="theme-tomato">
    <main>
      <Panel>
        <template #default="{ breakPoints }">
          <FlexContainer>
            <SideBar :breakPoints="breakPoints" />
            <ContentBlock :breakPoints="breakPoints" />
          </FlexContainer>
        </template>
      </Panel>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Panel from "@/components/Panel/ThePanel.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import FlexContainer from "@/components/Container/FlexContainer.vue";
import ContentBlock from "@/components/ContentPage/ContentPage.vue";

export default defineComponent({
  name: "App",
  components: {
    Panel,
    FlexContainer,
    SideBar,
    ContentBlock,
  },
});
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_common.scss";

html {
  font-size: $rem-size * 1px;
}

html,
body,
p,
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
body {
  user-select: none;
}
main {
  position: relative;
  width: 100vw;
  height: 100vh;
  @include ToTheme($theme-tomato) {
    background-color: $leaf;
  }
}
</style>