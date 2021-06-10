<template>
  <div>
    <v-dialog v-model="addCostDialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn class="mb-8" color="teal lighten-1" outlined tile v-on="on">
          ADD NEW COST <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card class="pa-4">
        <PaymentForm />
      </v-card>
    </v-dialog>
    <v-data-table :headers="tableHeaders" :items="items" :items-per-page="5">
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PaymentForm from "@components/PaymentForm";
export default {
  components: { PaymentForm },
  data() {
    return {
      addCostDialog: false,
      tableHeaders: [
        { text: "#", value: "id" },
        { text: "Date", value: "date" },
        { text: "Category", value: "category" },
        { text: "Value", value: "price" }
      ]
    };
  },
  methods: {},
  computed: {
    ...mapGetters({ items: "getPaymentList" })
  }
};
</script>
