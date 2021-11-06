<template>
  <div class="pa-4">
    <PaymentForm :item="item" />
    <div class="mt-8">
      <router-link to="/" class="teal--text">Go to HOME</router-link>
    </div>
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
