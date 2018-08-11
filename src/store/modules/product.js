import Vue from 'vue';
import _ from 'lodash'

///
// State
///

const state = {
  product: null
}


///
// Getters
///
const getters = {
  productData: (state) => {
    return state.product
  },
}


///
// Mutations
///
const mutations = {
  productUpdate(state, data) {
    data ? state.product = data : false;
  }
}

///
// Actions
///
const actions = {
  productGet({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {

      // check payload 
      if (!payload) return reject('payload empty');

      // create uri
      var uriRequest = "/product/id/" + payload;

      // send request
      Vue.http.get(process.env.BACKEND_URI + uriRequest).then(response => {
        commit('productUpdate', response.data.data);
        return resolve(response.data);
      }, error => {
        commit('productUpdate', error);
        return reject(error);
      })
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
