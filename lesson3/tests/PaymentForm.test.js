import Vuex from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen, faTrashAlt, faTimes, faEllipsisV, faCoins, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
library.add(faPen, faTrashAlt, faTimes, faEllipsisV, faCoins, faPlus, faCheck);
import { mount, createLocalVue } from '@vue/test-utils';
import PaymentForm from 'components/PaymentForm.vue';

const localVue = createLocalVue(PaymentForm);
localVue.component('font-awesome-icon', FontAwesomeIcon);
localVue.use(Vuex);

describe('PaymentForm', () => {
  let mutations;
  let getters;
  let store;

  const itemTest = {
    id: 1,
    category: 'Food',
    price: 999,
    date: '2021.02.01'
  };
  const categoriesTest = [
    "Education",
    "Food",
    "Transport",
    "Clothing",
    "Housing"
  ];
  const applyTxt = ":) successfully applied";
  const errorTxt = ":( enter correct data, please";

  beforeEach(() => {
    mutations = {
      setCategoriesItem: jest.fn(),
      setPaymentItem: jest.fn(),
      editPaymentItem: jest.fn()
    };
    getters = {
      getCategories: jest.fn().mockReturnValue(categoriesTest)
    },
      store = new Vuex.Store({
        mutations, getters
      });
  });

  test('Get item data from props', () => {
    const wrapper = mount(PaymentForm, {
      propsData: {
        item: itemTest,
      }, store, localVue
    });
    const { id, category, price, date } = wrapper.vm;
    expect(id).toEqual(itemTest.id);
    expect(category).toEqual(itemTest.category);
    expect(price).toEqual(itemTest.price);
    expect(date).toEqual(itemTest.date.split(".").reverse().join("-"));
  });

  test('Item in props with id, category, price + applyBtn => edit existing item in store', () => {
    const wrapper = mount(PaymentForm, {
      propsData: {
        item: itemTest,
      }, store, localVue
    });
    const btnApply = wrapper.find('button[name=applyBtn]');
    btnApply.trigger('click');
    expect(mutations.editPaymentItem).toHaveBeenCalled();
    expect(wrapper.vm.message).toEqual(applyTxt);
  });

  test('Item in props with category, price => auto set new item to store', () => {
    const wrapper = mount(PaymentForm, {
      propsData: {
        item: { ...itemTest, id: null },
      }, store, localVue
    });
    expect(mutations.setPaymentItem).toHaveBeenCalled();
    expect(wrapper.vm.message).toEqual(applyTxt);
  });

  test('Add new item with empty <input> => error message', () => {
    const wrapper = mount(PaymentForm, {
      propsData: {
        item: {},
      }, store, localVue
    });
    const btnApply = wrapper.find('button[name=applyBtn]');
    btnApply.trigger('click');
    expect(mutations.setPaymentItem).not.toHaveBeenCalled();
    expect(wrapper.vm.message).toEqual(errorTxt);
  });

  test('Get categories and put to <select>', () => {
    const wrapper = mount(PaymentForm, {
      propsData: {
        item: {}
      }, store, localVue
    });
    expect(getters.getCategories).toHaveBeenCalled();
    const optionArr = wrapper.find('select').findAll('option');
    for (let i = 0; i < categoriesTest.length; i++) {
      expect(optionArr.at(i).element.value).toEqual(categoriesTest[i]);
    }
  });

  test('Add new category if not empty <input>', () => {
    const wrapper = mount(PaymentForm, {
      propsData: {
        item: {}
      }, store, localVue
    });
    const btnNew = wrapper.find('button[name=newCategoryBtn]');
    btnNew.trigger('click');

    //empty <input>
    const btnAdd = wrapper.find('button[name=addCategoryBtn]');
    btnAdd.trigger('click');
    expect(mutations.setCategoriesItem).not.toHaveBeenCalled();

    //not empty <input>
    const inputAdd = wrapper.find('input[name=newCategory]');
    inputAdd.setValue('someNewCategory');
    btnAdd.trigger('click');
    expect(mutations.setCategoriesItem).toHaveBeenCalled();
  });
})
