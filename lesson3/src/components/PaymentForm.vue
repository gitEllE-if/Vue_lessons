<template>
  <form :class="[$style.addCostForm]">
    <label for="date">Date</label>
    <input type="date" name="date" placeholder="Date" v-model="date" />
    <label for="category"
      >Category
      <button
        name="newCategoryBtn"
        v-show="!showSubForm"
        @click.prevent="showSubForm = !showSubForm"
        :class="[$style.categoryBtn]"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
      </button>
      <form :class="[$style.addCategoryForm]" v-show="showSubForm">
        <input
          v-show="showSubForm"
          name="newCategory"
          placeholder="new category"
          v-model.trim="newCategory"
        />
        <button
          name="addCategoryBtn"
          @click.prevent="addCategory"
          :class="[$style.categoryBtn]"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
        <button
          @click.prevent="showSubForm = false"
          :class="[$style.categoryBtn]"
        >
          <font-awesome-icon :icon="['fas', 'times']" />
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
    <input type="number" name="price" v-model.number="price" />
    <div v-if="message" :class="[$style.message]">{{ message }}</div>
    <button
      name="applyBtn"
      type="submit"
      :class="[$style.addCostButton]"
      @click.prevent="apply"
    >
      APPLY <font-awesome-icon :icon="['fas', 'check']" />
    </button>
    <button
      name="cancelBtn"
      :class="[$style.addCostButton]"
      @click.prevent="cancel"
    >
      CANCEL <font-awesome-icon :icon="['fas', 'times']" />
    </button>
  </form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      showSubForm: false,
      id: "",
      date: "",
      category: "",
      price: 0,
      message: "",
      newCategory: ""
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
        this.message = ":) successfully applied";
      } else {
        this.message = ":( enter correct data, please";
      }
    },
    cancel() {
      this.message = "";
      this.$modalWindow.close();
    },
    addCategory() {
      const { newCategory } = this;
      if (newCategory) {
        this.setCategoriesItem(newCategory);
      }
      this.showSubForm = false;
      this.message = "";
    },
    ...mapMutations(["setPaymentItem", "setCategoriesItem", "editPaymentItem"])
  },
  computed: {
    ...mapGetters({ categories: "getCategories" })
  }
};
</script>

<style lang='scss' module>
.addCostForm {
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
