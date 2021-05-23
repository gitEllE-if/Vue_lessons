<template>
  <div id="app">
    <h1>My personal costs</h1>
    <router-view />
  </div>
</template>

<script>
import { API } from "@/const";
import { mapActions } from "vuex";
export default {
  name: "App",
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
