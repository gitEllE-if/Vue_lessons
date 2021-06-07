export default {
  install(Vue) {
    if (this.installed) {
      return;
    }
    this.installed = true;

    Vue.prototype.$contextMenu = {
      EventBus: new Vue(),
      open(name, position, item) {
        this.EventBus.$emit('open', { name, position, item });
      },
      close() {
        this.EventBus.$emit('close');
      }
    }
  }
}