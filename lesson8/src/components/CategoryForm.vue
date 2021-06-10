<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <validation-provider
        v-slot="{ errors }"
        name="category"
        rules="required|max:16"
      >
        <v-text-field
          v-model="newCategory"
          :error-messages="errors"
          label="New category"
          required
        ></v-text-field>
      </validation-provider>
      <v-btn class="mr-4" type="submit" :disabled="invalid" tile depressed>
        add
      </v-btn>
      <v-btn @click="clear" tile depressed> clear </v-btn>
    </form>
  </validation-observer>
</template>

<script>
import { mapMutations } from "vuex";
import { required, max } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});
extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      newCategory: ""
    };
  },
  methods: {
    addCategory() {
      const { newCategory } = this;
      if (newCategory) {
        this.setCategoriesItem(newCategory);
      }
    },
    submit() {
      this.$refs.observer.validate().then(() => this.addCategory());
    },
    clear() {
      this.newCategory = "";
      this.$refs.observer.reset();
    },
    ...mapMutations(["setCategoriesItem"])
  }
};
</script>
