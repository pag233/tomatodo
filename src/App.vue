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
import { defineComponent, onMounted } from "vue";
import Panel from "@/components/Panel/ThePanel.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import FlexContainer from "@/components/Container/FlexContainer.vue";
import ContentPage from "@/components/ContentPage/ContentPage.vue";
import CommonDrawer from "@/components/Drawer/CommonDrawer.vue";

import { useStore } from "./store";

export default defineComponent({
  name: "App",
  components: {
    Panel,
    FlexContainer,
    SideBar,
    ContentPage,
    CommonDrawer,
  },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("timeouts/startAllRemind");
    });
  },
});
</script>

<style lang="scss">
:root {
  font-size: $--rem-size * 1px;
  //ui-colors
  --primary-color: var(--color-tomato);
  --secondary-color: var(--color-tomato-transparent);
  //colors
  --color-tomato: #cc6666;
  --color-tomato-transparent: #fc93a731;
  --color-leaf: #65bfaf;
  --color-yellow: #c7aa57;
  --color-pink: #f27983;
  --color-blue: #009dcf;
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
  background-color: var(--color-leaf);
}
</style>