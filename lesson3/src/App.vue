<template>
  <div id="app">
    <ModalWindow />
    <ContextMenu />
    <h1>My personal costs <font-awesome-icon :icon="['fas', 'coins']" /></h1>
    <router-view />
  </div>
</template>

<script>
import ContextMenu from "@components/ContextMenu";
import ModalWindow from "@components/ModalWindow";
import { API } from "@/const";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    ContextMenu,
    ModalWindow
  },
  mounted() {
    this.loadPaymentList(`${API}paymentList.json`);
    this.loadCategories(`${API}categories.json`);
  },
  methods: {
    ...mapActions(["loadPaymentList", "loadCategories"])
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 20px;
}
a {
  color: lightseagreen;
  text-decoration: none;
}
</style>
