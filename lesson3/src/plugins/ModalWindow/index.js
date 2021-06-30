export default {
  install(Vue) {
    if (this.installed) {
      return;
    }
    this.installed = true;

    Vue.prototype.$modalWindow = {
      EventBus: new Vue(),
      open(name, item) {
        this.EventBus.$emit('open', { name, item });
      },
      close() {
        this.EventBus.$emit('close');
      }
    }
  }
}