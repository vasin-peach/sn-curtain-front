import Vue from 'vue'

// STATE
const state = {
  csrf: null,
}

// GETTERS
const getters = {
  csrfData: (state) => {
    return state.csrf
  },
}

// MUTATIONS
const mutations = {
  csrfUpdate(state, data) {
    state.csrf = data
  },
}

// ACTIONS
const actions = {
  csrfGet({ commit }) {
    return new Promise((resolve, reject) => {
      let uriRequest = process.env.BACKEND_URI + '/csrf/get'
      Vue.http.get(uriRequest).then(
        (response) => {
          commit('csrfUpdate', response.data.data)
          return resolve(response.data.data)
        },
        (error) => {
          return reject(error)
        },
      )
    })
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
