<template>
  <div :class="[$style.paymentForm]">
    <button :class="[$style.addCostButton]" @click="showForm = !showForm">
      ADD NEW COST +
    </button>
    <form :class="[$style.addCostForm]" v-show="showForm">
      <label for="date">Date</label>
      <input type="date" name="date" placeholder="Date" v-model="date" />
      <label for="category"
        >Category
        <button
          v-show="!showSubForm"
          @click.prevent="showSubForm = !showSubForm"
          :class="[$style.categoryBtn]"
        >
          +
        </button>
        <form :class="[$style.addCategoryForm]" v-show="showSubForm">
          <input
            v-show="showSubForm"
            name="newCategory"
            placeholder="new category"
            v-model.trim="newCategory"
          />
          <button @click.prevent="addCategory" :class="[$style.categoryBtn]">
            +
          </button>
          <button
            @click.prevent="showSubForm = false"
            :class="[$style.categoryBtn]"
          >
            x
          </button>
        </form>
      </label>
      <select name="category" placeholder="Category" v-model="category">
        <option
          v-for="(category, index) in categories"
          :key="index"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
      <label for="price">Price</label>
      <input name="price" v-model.number="price" />
      <div v-if="message" :class="[$style.message]">{{ message }}</div>
      <button
        type="submit"
        :class="[$style.addCostButton]"
        @click.prevent="apply"
      >
        APPLY
      </button>
      <button :class="[$style.addCostButton]" @click.prevent="cancel">
        CANCEL
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      showForm: this.formVisibility,
      showSubForm: false,
      date: "",
      category: "",
      price: 0,
      message: "",
      newCategory: ""
    };
  },
  props: {
    formVisibility: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.date = new Date().toISOString().substring(0, 10);
    this.category = this.$route.params.category || "";
    this.price = Number(this.$route.query.value) || 0;
    if (this.category && this.price && this.date) {
      this.apply();
    }
  },
  methods: {
    apply() {
      const { date, category, price } = this;
      if (date && category && !isNaN(price)) {
        this.setPaymentItem({ date, category, price });
        this.message = ":) successfully applied";
      } else {
        this.message = ":( enter correct data, please";
      }
    },
    cancel() {
      this.message = "";
      this.showForm = false;
    },
    addCategory() {
      const { newCategory } = this;
      if (newCategory) {
        this.setCategoriesItem(newCategory);
      }
      this.showSubForm = false;
      this.message = "";
    },
    ...mapMutations(["setPaymentItem", "setCategoriesItem"])
  },
  computed: {
    ...mapGetters({ categories: "getCategories" })
  }
};
</script>

<style lang='scss' module>
.paymentForm {
  position: relative;
}
.addCostButton {
  height: 30px;
  width: 270px;
  color: white;
  font-weight: 700;
  background-color: lightseagreen;
  border: 1px solid lightseagreen;
  cursor: pointer;
  outline: none;
  margin-top: 10px;
  &:hover {
    color: lightseagreen;
    background-color: white;
  }
}
.addCostForm {
  position: absolute;
  z-index: 0;
  left: 450px;
  top: -10px;
  width: 270px;
  height: 260px;
  padding: 20px;
  background-color: white;
  border: 2px solid lightseagreen;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  input {
    width: 99%;
    outline: none;
    margin-bottom: 10px;
  }
  select {
    width: 100%;
    outline: none;
    margin-bottom: 10px;
  }
}
.categoryBtn {
  height: 19px;
  color: white;
  font-weight: 700;
  background-color: lightseagreen;
  border: 1px solid lightseagreen;
  cursor: pointer;
  outline: none;
  &:hover {
    color: lightseagreen;
    background-color: white;
  }
}
.addCategoryForm {
  display: flex;
  input {
    border: 1px solid lightseagreen;
  }
  button {
    margin-left: 1px;
  }
}
</style>
