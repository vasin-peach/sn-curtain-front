// Import Modules
import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import store from './modules/store';
import loading from './modules/loading';

// Use Moduesl
Vue.use(Vuex)

// Export
export default new Vuex.Store({
  modules: {
    auth,
    store,
    loading
  },
  strict: false
})
