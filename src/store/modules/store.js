import Vue from 'vue';

///
// State
///

const state = {
  store: null
}


///
// Getters
///
const getters = {
  storeData: (state) => {
    return state.store
  }
}


///
// Mutations
///
const mutations = {
  storeUpdate(state, data) {
    data ? state.store = data : false;
  }
}


///
// Actions
///
const actions = {
  storeGet({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      // check payload 
      if (!payload) return reject('payload empty');

      // store loading
      commit('loadingUpdate', {
        type: 'store',
        value: true
      });

      var page = payload.page || 1
      var tag = payload.tag || null
      var color = payload.color || null
      var type = payload.type || null
      var uriRequest = "/product/get/" + page + (tag ? "/" + tag + (color ? "/" + color + (type ? "/" + type : "") : "") : "")

      // request
      Vue.http.get(process.env.BACKEND_URI + uriRequest).then(response => {
        commit('storeUpdate', response.data.data);
        commit('loadingUpdate', {
          type: 'store',
          value: false
        })
        return resolve(response.data);
      }, error => {
        commit('loadingUpdate', {
          type: 'store',
          value: 'fail',
        })
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
