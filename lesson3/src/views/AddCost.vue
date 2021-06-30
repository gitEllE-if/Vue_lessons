<template>
  <div>
    <PaymentForm :item="item" />
    <router-link to="/">Go to HOME</router-link>
  </div>
</template>

<script>
import PaymentForm from "@components/PaymentForm";

export default {
  name: "AddCost",
  components: {
    PaymentForm
  },
  props: {
    item: {
      type: Object,
      default: null
    }
  }
};
</script>
<style lang='scss' module>
a {
  display: block;
  margin-top: 30px;
}
</style>
