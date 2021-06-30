<template>
  <transition name="slide-fade">
    <div :class="[$style.contextMenu]" v-if="name" ref="contextMenu">
      <PaymentItemMenu v-if="name === 'paymentItem_menu'" :item="item" />
    </div>
  </transition>
</template>

<script>
import PaymentItemMenu from "@components/PaymentItemMenu";
export default {
  name: "ContextMenu",
  components: {
    PaymentItemMenu
  },
  data() {
    return {
      name: "",
      item: {}
    };
  },
  mounted() {
    this.$contextMenu.EventBus.$on("open", this.onOpen);
    this.$contextMenu.EventBus.$on("close", this.onClose);
  },
  beforeDestroy() {
    this.$contextMenu.EventBus.$off("open", this.onOpen);
    this.$contextMenu.EventBus.$off("close", this.onClose);
  },
  methods: {
    onOpen({ name, position, item }) {
      this.name = name;
      this.item = item;
      this.$nextTick(function() {
        const menuEl = this.$refs.contextMenu;
        if (menuEl) {
          menuEl.style.cssText = `top: ${position.top}px; left: ${position.left}px`;
        }
      });
    },
    onClose() {
      this.name = "";
    }
  }
};
</script>

<style lang='scss' module>
.contextMenu {
  position: absolute;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
:global(.slide-fade-enter-active) {
  transition: all 0.5s ease;
}
:global(.slide-fade-leave-active) {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
:global(.slide-fade-enter),
:global(.slide-fade-leave-to) {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
