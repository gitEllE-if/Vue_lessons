<template>
  <div>
    <button :class="[$style.menuButton]" @click="onEdit(item)">
      <font-awesome-icon :icon="['fas', 'pen']" />
    </button>
    <button :class="[$style.menuButton]" @click="onDelete(item.id)">
      <font-awesome-icon :icon="['fas', 'trash-alt']" />
    </button>
    <button :class="[$style.menuButton]" @click="onClose">
      <font-awesome-icon :icon="['fas', 'times']" />
    </button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "PaymentItemMenu",
  props: {
    item: {
      type: Object,
      default: function() {
        return null;
      }
    }
  },
  methods: {
    ...mapMutations(["delPaymentItem"]),
    onClose() {
      this.$contextMenu.close();
    },
    onDelete(itemId) {
      this.delPaymentItem(itemId);
      this.onClose();
    },
    onEdit(item) {
      this.$modalWindow.open("addCost_modal", item);
      this.onClose();
    }
  },
  computed: {}
};
</script>

<style lang='scss' module>
.menuButton {
  height: 30px;
  width: 30px;
  color: white;
  font-weight: 700;
  background-color: lightseagreen;
  border: 1px solid white;
  cursor: pointer;
  outline: none;
  &:hover {
    color: lightseagreen;
    background-color: white;
    border: 1px solid lightseagreen;
  }
}
</style>
