import Vue from 'vue';

///
// State
///
const state = {
  delivery: []
}


///
// Getters
///
const getters = {
  deliveryData: state => {
    return state.delivery
  },
}

///
// Mutations
///
const mutations = {
  deliveryUpdate(state, data) {
    state.delivery = data
  }
}

///
// Actions
///
const actions = {
  deliveryGet({
    commit
  }) {
    return new Promise((resolve, reject) => {

      var uriRequest = process.env.BACKEND_URI + "/delivery";
      Vue.http.get(uriRequest).then(response => {
        commit("deliveryUpdate", response.data.data);
        return resolve(response.data);
      }, err => {
        return reject(err)
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
