// Import Modules
import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth/auth';
import payment from './modules/payment/payment';
import profile from './modules/auth/profile';
import store from './modules/store';
import loading from './modules/loading';
import product from './modules/product';
import basket from './modules/basket';
import discount from './modules/discount';
import delivery from './modules/delivery'

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
    payment
  },
  strict: false
})
