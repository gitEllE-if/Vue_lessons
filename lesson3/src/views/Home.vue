<template>
  <main>
    <div>
      <PaymentForm />
      <PaymentList />
      <Pagination />
    </div>
    <Diagram />
  </main>
</template>

<script>
import PaymentList from "@components/PaymentList";
import PaymentForm from "@components/PaymentForm";
import Pagination from "@components/Pagination";
import Diagram from "@components/Diagram";

export default {
  name: "Home",
  components: {
    PaymentList,
    PaymentForm,
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
