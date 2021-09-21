<template>
  <div class="theme-tomato">
    <main>
      <Panel>
        <template
          #default="{
            barWidth,
            setBarWidth,
            minWidth,
            drawerBreak,
            drawerShow,
            setDrawerShow,
            drawerWidth,
            setDrawerWidth,
          }"
        >
          <FlexContainer>
            <SideBar :barWidth="barWidth" :setBarWidth="setBarWidth" />
            <ContentPage
              :minWidth="minWidth"
              :drawerShow="drawerShow"
              :setDrawerShow="setDrawerShow"
            />
            <CommonDrawer
              v-if="!drawerBreak"
              :drawerShow="drawerShow"
              :setDrawerShow="setDrawerShow"
              :drawerWidth="drawerWidth"
              :setDrawerWidth="setDrawerWidth"
            />
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
import CommonDrawer from "@/components/Drawer/CommonDrawer.vue";

export default defineComponent({
  name: "App",
  components: {
    Panel,
    FlexContainer,
    SideBar,
    ContentPage,
    CommonDrawer,
  },
});
</script>

<style lang="scss">
html {
  font-size: $--rem-size * 1px;
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
  @include ToTheme("tomato") {
    background-color: $--leaf;
  }
}
</style>