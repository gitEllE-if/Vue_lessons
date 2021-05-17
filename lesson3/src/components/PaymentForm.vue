<template>
  <div :class="[$style.paymenForm]">
    <button :class="[$style.addCostButton]" @click="showForm = !showForm">
      ADD NEW COST +
    </button>
    <form :class="[$style.addCostForm]" v-show="showForm">
      <label for="date">Date</label>
      <input type="date" name="date" placeholder="Date" v-model="date" />
      <label for="category">Category</label>
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
      <input name="price" placeholder="Price" v-model.number="price" />
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
export default {
  data() {
    return {
      showForm: false,
      date: "",
      category: "",
      price: 0,
      categories: ["Education", "Food", "Transport", "Clothing", "Housing"],
      message: ""
    };
  },
  props: {
    items: Array
  },
  methods: {
    apply() {
      const { date, category, price } = this;
      if (date && category && !isNaN(price)) {
        this.$emit("add", { date, category, price });
        this.message = ":) successfully applied";
      } else {
        this.message = ":( enter correct data, please";
      }
    },
    cancel() {
      this.message = "";
      this.showForm = false;
    }
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
  left: 320px;
  top: 110px;
  width: 400px;
  height: 260px;
  padding: 20px;
  background-color: white;
  border: 2px solid lightseagreen;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  input {
    width: 100%;
    outline: none;
    margin-bottom: 10px;
  }
  select {
    width: 100%;
    outline: none;
    margin-bottom: 10px;
  }
}
</style>
