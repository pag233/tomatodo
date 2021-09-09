<template>
  <main>
    <Panel></Panel>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Panel from "./components/Panel/ThePanel.vue";

export default defineComponent({
  name: "App",
  components: {
    Panel,
  },
});
</script>

<style lang="scss">
html,
body,
p,
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
body {
  background-color: tan;
}
main {
  position: relative;
  width: 100vw;
  height: 100vh;
}
</style>