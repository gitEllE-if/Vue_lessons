<template>
  <div>
    <v-dialog v-model="addCostDialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn tile depressed color="white teal--text" v-on="on" class="mr-2">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card class="pa-4">
        <PaymentForm :item="item" />
      </v-card>
    </v-dialog>
    <v-btn
      tile
      depressed
      color="white teal--text"
      @click="delPaymentItem(item.id)"
    >
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import PaymentForm from "@components/PaymentForm";
export default {
  components: { PaymentForm },
  name: "PaymentItemMenu",
  data() {
    return {
      addCostDialog: false
    };
  },
  props: {
    item: {
      type: Object,
      default: function() {
        return null;
      }
    }
  },
  methods: {
    ...mapMutations(["delPaymentItem"])
  }
};
</script>
