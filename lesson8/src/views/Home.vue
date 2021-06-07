<template>
  <v-row class="ml-1 mt-2">
    <v-col>
      <PaymentList />
    </v-col>
    <v-col>
      <Diagram />
    </v-col>
  </v-row>
</template>

<script>
import PaymentList from "@components/PaymentList";
import Diagram from "@components/Diagram";

export default {
  name: "Home",
  components: {
    PaymentList,
    Diagram
  }
};
</script>
