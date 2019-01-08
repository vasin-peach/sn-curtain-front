// Import Modules
import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth/auth';
import payment from './modules/payment/payment';
import payment_credit from './modules/payment/credit';
import profile from './modules/auth/profile';
import store from './modules/store';
import loading from './modules/loading';
import product from './modules/product';
import basket from './modules/basket';
import discount from './modules/discount';
import delivery from './modules/delivery'
import csrf from './modules/csrf';
import order from './modules/payment/order';
import clear from './modules/clear';
import upload from './modules/upload';
import redirect from './modules/redirect';
import func from './modules/func';
import sum_user from './modules/summary/sum-user';
import sum_sale from './modules/summary/sum-sale';
import admin_order from './modules/admin_order';

// Use Moduesl
Vue.use(Vuex)

// Export
export default new Vuex.Store({
  modules: {
    auth,
    store,
    loading,
    product,
    basket,
    discount,
    delivery,
    profile,
    payment,
    payment_credit,
    csrf,
    order,
    clear,
    upload,
    redirect,
    func,
    sum_user,
    sum_sale,
    admin_order
  },
  strict: false
})
