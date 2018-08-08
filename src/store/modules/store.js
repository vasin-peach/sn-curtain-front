import Vue from 'vue';

///
// State
///

const state = {
  store: null,
  storePopular: null
}


///
// Getters
///
const getters = {
  storeData: (state) => {
    return state.store
  },
  storePopularData: (state) => {
    return state.storePopular
  }
}


///
// Mutations
///
const mutations = {
  storeUpdate(state, data) {
    data ? state.store = data : false;
  },
  storePopularUpdate(state, data) {
    data ? state.storePopular = data : false;
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
      var search = payload.search || " "
      var page = payload.page || 1
      var fabric = payload.fabric || null
      var color = payload.color || null
      var type = payload.type || null

      // var uriRequest = "/product/get/" + search + "/" + page + (fabric ? "/" + fabric + (color ? "/" + color + (type ? "/" + type : "") : "") : "")
      var uriRequest = "/product/get/" +
        (search ? search + "/" : " /") +
        (page ? page + "/" : " /") +
        (fabric ? fabric + "/" : " /") +
        (color ? color + "/" : " /") +
        (type ? type : " ")

      // request
      Vue.http.get(process.env.BACKEND_URI + uriRequest).then(response => {
        commit('storeUpdate', response.data.data);
        commit('loadingUpdate', {
          type: 'store',
          value: false
        })
        return resolve(response.data);
      }, error => {
        switch (error.status) {
          case 0:
            commit('loadingUpdate', {
              type: 'store',
              value: 'fail',
            })
            break;
          case 404:
            commit('loadingUpdate', {
              type: 'store',
              value: 'notfound',
            })
        }
        // return reject(error);
      })
    })
  },

  storePopularGet({
    commit
  }) {
    return new Promise((resolve, reject) => {
      // store loading
      commit('loadingUpdate', {
        type: 'storePopular',
        value: true
      });

      // request
      Vue.http.get(process.env.BACKEND_URI + '/product/popular').then(response => {
        commit('storePopularUpdate', response.data.data);
        commit('loadingUpdate', {
          type: 'storePopular',
          value: false
        })
        return resolve(response.data);
      }, error => {
        switch (error.status) {
          case 0:
            commit('loadingUpdate', {
              type: 'store',
              value: 'fail',
            })
            break;
          case 404:
            commit('loadingUpdate', {
              type: 'store',
              value: 'notfound',
            })
        }
        // return reject(error);
      })
    })
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}
