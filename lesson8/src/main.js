import Vue from 'vue';
import App from './App.vue';
import store from '@core/store';
import router from '@core/router';
import vuetify from '@plugins/vuetify'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
  vuetify,
  router
}).$mount('#app')
