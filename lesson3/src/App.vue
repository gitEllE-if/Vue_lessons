<template>
  <div id="app">
    <h1 class="header">My personal costs</h1>
    <main>
      <div>
        <PaymentForm @add="addNewCost" />
        <PaymentList
          :items="
            paymentList.slice(pageNbr * cntPerPage, (pageNbr + 1) * cntPerPage)
          "
        />
        <Pagination
          :itemCnt="paymentList.length"
          :cntPerPage="cntPerPage"
          @page="paginate"
        />
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
import { CNT_PER_PAGE } from "@/const";
import { get } from "@core/requests";

export default {
  name: "App",
  components: {
    PaymentList,
    PaymentForm,
    Pagination,
    Diagram
  },
  data() {
    return {
      paymentList: [],
      cntPerPage: CNT_PER_PAGE,
      pageNbr: 0
    };
  },
  async mounted() {
    try {
      this.paymentList = await get(`${API}paymentList.json`);
    } catch (err) {
      console.log(`==> get "paymentList" failure ` + err);
    }
  },
  methods: {
    addNewCost(newCost) {
      newCost = {
        ...newCost,
        date: new Date(newCost.date).toLocaleDateString(),
        id: this.paymentList.length + 1
      };
      this.paymentList.push(newCost);
    },
    paginate(pageNbr) {
      this.pageNbr = pageNbr - 1;
    }
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
