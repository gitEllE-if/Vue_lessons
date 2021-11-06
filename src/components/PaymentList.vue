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
      <template v-slot:[`item.edit`]="props">
        <v-edit-dialog :return-value.sync="props.item">
          <v-icon>mdi-dots-vertical</v-icon>
          <template v-slot:input>
            <PaymentItemMenu :item="props.item" />
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PaymentForm from "@components/PaymentForm";
import PaymentItemMenu from "@components/PaymentItemMenu";
export default {
  components: { PaymentForm, PaymentItemMenu },
  data() {
    return {
      addCostDialog: false,
      tableHeaders: [
        { text: "#", value: "id" },
        { text: "Date", value: "date" },
        { text: "Category", value: "category" },
        { text: "Value", value: "price" },
        { text: " ", value: "edit", width: "5%" }
      ]
    };
  },
  methods: {},
  computed: {
    ...mapGetters({ items: "getPaymentList" })
  }
};
</script>
