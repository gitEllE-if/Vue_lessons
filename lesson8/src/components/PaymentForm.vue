<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <validation-provider v-slot="{ errors }" name="Date" rules="required">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
          :error-messages="errors"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
        </v-menu>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="select" rules="required">
        <v-select
          v-model="category"
          prepend-icon="mdi-form-select"
          append-icon="mdi-plus-circle-outline"
          @click:append="showCategoryForm = true"
          :items="categories"
          :error-messages="errors"
          label="Category"
          data-vv-name="select"
          required
        ></v-select>
        <v-dialog v-model="showCategoryForm" max-width="400px">
          <v-card class="pa-4">
            <CategoryForm />
          </v-card>
        </v-dialog>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="price"
        rules="required|numeric"
      >
        <v-text-field
          v-model="price"
          :error-messages="errors"
          prepend-icon="mdi-cash-multiple"
          label="Price"
          required
        ></v-text-field>
      </validation-provider>
      <v-btn class="mr-4" type="submit" :disabled="invalid" tile depressed>
        submit
      </v-btn>
      <v-btn @click="clear" tile depressed> clear </v-btn>
    </form>
  </validation-observer>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import CategoryForm from "@components/CategoryForm";
import { required, max, regex, numeric } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");
extend("numeric", {
  ...numeric,
  message: "{_field_} must be numeric"
});
extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});
extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});
extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}"
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    CategoryForm
  },
  data() {
    return {
      menu: false,
      showCategoryForm: false,
      id: "",
      date: new Date().toISOString().substr(0, 10),
      category: "",
      price: 0,
      select: null
    };
  },
  props: {
    item: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  mounted() {
    const { id, date, category, price } = this.item;
    this.date = date
      ? date
          .split(".")
          .reverse()
          .join("-")
      : new Date().toISOString().substring(0, 10);
    this.category = category ? category : "";
    this.price = +price ? +price : 0;
    this.id = id ? id : "";
    if (!this.id && this.category && !isNaN(this.price) && this.date) {
      this.apply();
    }
  },
  methods: {
    apply() {
      const { id, date, category, price } = this;
      if (date && category && !isNaN(price)) {
        if (id) {
          this.editPaymentItem({ id, date, category, price: +price });
        } else {
          this.setPaymentItem({ date, category, price: +price });
        }
      }
    },
    submit() {
      this.$refs.observer.validate().then(() => this.apply());
    },
    clear() {
      this.price = "";
      this.category = "";
      this.select = null;
      this.$refs.observer.reset();
    },
    ...mapMutations(["setPaymentItem", "editPaymentItem"])
  },
  computed: {
    ...mapGetters({ categories: "getCategories" })
  }
};
</script>
