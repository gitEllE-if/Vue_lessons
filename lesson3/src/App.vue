<template>
  <div id="app">
    <h1 class="header">My personal costs</h1>
    <main>
      <div>
        <PaymentForm />
        <PaymentList />
        <Pagination />
      </div>
      <Diagram />
    </main>
  </div>
</template>

<script>
import PaymentList from "@components/PaymentList";
import PaymentForm from "@components/PaymentForm";
import Pagination from "@components/Pagination";
import Diagram from "@components/Diagram";
import { API } from "@/const";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    PaymentList,
    PaymentForm,
    Pagination,
    Diagram
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
  main {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}
</style>
