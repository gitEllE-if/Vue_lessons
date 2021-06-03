import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import PaymentForm from 'components/PaymentForm.vue';

const localVue = createLocalVue(PaymentForm);
localVue.use(Vuex);

describe('PaymentForm', () => {
  let mutations;
  let getters;
  let store;
  beforeEach(() => {
    mutations = {
      setCategoriesItem: jest.fn(),
      setPaymentItem: jest.fn(),
      editPaymentItem: jest.fn()
    };
    getters = {
      getCategories: jest.fn()
    };
    store = new Vuex.Store({
      mutations, getters
    });
  });
  test('Content of PaymentForm', () => {
    const wrapper = mount(PaymentForm, {
      propsData: {
        item: {}
      }, store, localVue
    });
    const btnNew = wrapper.find('button[name=newCategoryBtn]');
    btnNew.trigger('click');
    const inputAdd = wrapper.find('input[name=newCategory]');
    inputAdd.setValue('newCategory');
    const btnAdd = wrapper.find('button[name=addCategoryBtn]');
    btnAdd.trigger('click');
    expect(mutations.setCategoriesItem).toHaveBeenCalled();
  })
})
