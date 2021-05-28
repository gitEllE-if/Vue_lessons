import Vue from 'vue';
import Vuex from 'vuex';
import { get } from "@core/requests";
import { CNT_PER_PAGE } from "@/const";


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        paymentList: [],
        categories: [],
        page: 0
    },
    mutations: {
        setPaymentList(state, newList) {
            state.paymentList = newList;
        },
        setPaymentItem(state, newItem) {
            newItem = {
                ...newItem,
                date: new Date(newItem.date).toLocaleDateString(),
                id: state.paymentList.length + 1
            };
            state.paymentList.push(newItem);
        },
        delPaymentItem(state, itemId) {
            const newList = state.paymentList.filter(
                (item) => item.id !== itemId
            );
            state.paymentList = newList;
        },
        editPaymentItem(state, newItem) {
            newItem = {
                ...newItem,
                date: new Date(newItem.date).toLocaleDateString()
            };
            state.paymentList = state.paymentList.map(
                (item) => item.id === newItem.id ? newItem : item
            );
        },
        setPage(state, newPage) {
            state.page = newPage;
        },
        setCategories(state, newCategories) {
            state.categories = newCategories;
        },
        setCategoriesItem(state, newCategory) {
            state.categories.push(newCategory);
        },
    },
    actions: {
        async loadPaymentList({ commit }, url) {
            try {
                const paymentList = await get(url);
                commit('setPaymentList', paymentList);
            } catch (err) {
                console.log('GET "paymentList" FAILURE' + err);
            }
        },
        async loadCategories({ commit }, url) {
            try {
                const categories = await get(url);
                commit('setCategories', categories);
            } catch (err) {
                console.log('GET "categories" FAILURE' + err);
            }
        }
    },
    getters: {
        getPaymentList: state => state.paymentList,
        getItemCnt: state => state.paymentList.length,
        getPage: state => state.page,
        getPaymentListPage: state =>
            state.paymentList.slice(state.page * CNT_PER_PAGE, (state.page + 1) * CNT_PER_PAGE),
        getTotalCost: state => state.paymentList.reduce((total, item) => total + item.price, 0),
        getCategories: state => state.categories
    }
});
