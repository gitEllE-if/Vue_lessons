import Vue from 'vue';
import App from './App.vue';
import store from '@core/store';
import router from '@core/router';
import contextMenu from '@plugins/ContextMenu';
import modalWindow from '@plugins/ModalWindow';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen, faTrashAlt, faTimes, faEllipsisV, faCoins, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
library.add(faPen, faTrashAlt, faTimes, faEllipsisV, faCoins, faPlus, faCheck);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;
Vue.use(contextMenu);
Vue.use(modalWindow);

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
