<template>
  <main>
    <div>
      <PaymentList />
      <Pagination />
    </div>
    <Diagram />
  </main>
</template>

<script>
import PaymentList from "@components/PaymentList";
import Pagination from "@components/Pagination";
import Diagram from "@components/Diagram";

export default {
  name: "Home",
  components: {
    PaymentList,
    Pagination,
    Diagram
  }
};
</script>

<style lang="scss" module>
main {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>
