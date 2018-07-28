// Import Modules
import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import product from './modules/product';

// Use Moduesl
Vue.use(Vuex)

// Export
export default new Vuex.Store({
  modules: {
    auth,
    product
  },
  strict: false
})
