<template>
  <v-row class="ml-1 mt-2">
    <v-col>
      <PaymentList />
    </v-col>
    <v-col class="ml-8">
      <PaymentChart />
    </v-col>
  </v-row>
</template>

<script>
import PaymentList from "@components/PaymentList";
import PaymentChart from "@components/PaymentChart";
export default {
  name: "Home",
  components: {
    PaymentList,
    PaymentChart
  }
};
</script>
