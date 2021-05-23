import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'Home',
    component: () => import('@views/Home.vue')
  },
  {
    path: '/add/payment',
    name: 'AddCost',
    component: () => import('@views/AddCost.vue')
  },
  {
    path: '/add/payment/:category',
    redirect: { name: 'AddCost' }
  },
  {
    path: '/404',
    alias: '*',
    name: 'NotFound',
    component: () => import('@views/NotFound.vue')
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

const getTitleByRouteName = routeName => {
  return {
    'Home': 'Take a look on your payments!',
    'AddCost': 'Add new payment',
    'NotFound': 'Oops! We lost this page :('
  }[routeName]
}

router.afterEach((to) => {
  document.title = getTitleByRouteName(to.name)
});

export default router;
