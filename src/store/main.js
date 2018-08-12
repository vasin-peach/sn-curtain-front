// Import Modules
import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import store from './modules/store';
import loading from './modules/loading';
import product from './modules/product';
import basket from './modules/basket';

// Use Moduesl
Vue.use(Vuex)

// Export
export default new Vuex.Store({
  modules: {
    auth,
    store,
    loading,
    product,
    basket
  },
  strict: false
})
