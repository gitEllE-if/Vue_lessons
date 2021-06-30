<template>
  <div :class="[$style.paymentList]">
    <button :class="[$style.addCostButton]" @click="showAddCostModal">
      ADD NEW COST <font-awesome-icon :icon="['fas', 'plus']" />
    </button>
    <div :class="[$style.pItemHeader, $style.pItem]">
      <div :class="[$style.pItemIdx]">#</div>
      <div :class="[$style.pItemParam]">Date</div>
      <div :class="[$style.pItemParam]">Category</div>
      <div :class="[$style.pItemValue]">Value</div>
    </div>
    <div v-for="item in items" :key="item.id" :class="[$style.pItem]">
      <div :class="[$style.pItemIdx]">{{ item.id }}</div>
      <div :class="[$style.pItemParam]">{{ item.date }}</div>
      <div :class="[$style.pItemParam]">{{ item.category }}</div>
      <div :class="[$style.pItemValue]">
        {{ item.price }}
        <span @click="showItemMenu($event, item)">
          <font-awesome-icon :icon="['fas', 'ellipsis-v']" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    showItemMenu(event, item) {
      const position = {
        top: event.pageY,
        left: event.pageX
      };
      this.$contextMenu.open("paymentItem_menu", position, item);
    },
    showAddCostModal() {
      this.$modalWindow.open("addCost_modal");
    }
  },
  computed: {
    ...mapGetters({ items: "getPaymentListPage" })
  }
};
</script>

<style lang='scss' module>
.paymentList {
  min-width: 400px;
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
  .pItemHeader {
    font-weight: 700;
  }
  .pItem {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
    .pItemParam {
      min-width: 100px;
      text-align: left;
    }
    .pItemValue {
      min-width: 80px;
      display: flex;
      justify-content: space-between;
    }
    .pItemIdx {
      min-width: 30px;
      text-align: left;
    }
    span {
      cursor: pointer;
      color: lightgray;
      &:hover {
        color: lightseagreen;
      }
    }
  }
}
</style>
