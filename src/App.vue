<template>
  <div class="theme-tomato">
    <main>
      <Panel>
        <template
          #default="{ barWidth, setBarWidth, showDrawer, setShowDrawer }"
        >
          <FlexContainer>
            <SideBar :barWidth="barWidth" :setBarWidth="setBarWidth" />
            <ContentPage
              :showDrawer="showDrawer"
              :setShowDrawer="setShowDrawer"
            />
            <Drawer :showDrawer="showDrawer" :setShowDrawer="setShowDrawer" />
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
import ContentPage from "@/components/ContentPage/ContentPage.vue";
import Drawer from "@/components/Drawer/Drawer.vue";

export default defineComponent({
  name: "App",
  components: {
    Panel,
    FlexContainer,
    SideBar,
    ContentPage,
    Drawer,
  },
});
</script>

<style lang="scss">
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