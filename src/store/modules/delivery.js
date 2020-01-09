import Vue from 'vue'

///
// State
///
const state = {
  deliveryPrice: 0,
}

// ? Getters
const getters = {
  deliveryPriceData: (state) => {
    return state.deliveryPrice
  },
}

// ? Mutations
const mutations = {
  deliveryPriceUpdate(state, data) {
    /**
     * @param data value to update to delivery price
     */

    state.deliveryPrice = data
  },
}

// ? Actions
const actions = {
  getDeliveryPrice({ commit }, weight) {
    /**
     * @param weight sum weight of product in basket
     */

    return new Promise((resolve, reject) => {
      // ! Call
      Vue.http
        .get(process.env.BACKEND_URI + '/weight/' + weight)
        .then(
          (resp) => {
            // * Success
            commit('deliveryPriceUpdate', resp.data.data)
            return resolve(resp.data.data)
          },
          (err) => {
            // * Errro
            commit('deliveryPriceUpdate', 0)
            return reject(err)
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
