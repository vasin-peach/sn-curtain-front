import Vue from 'vue'
import _ from 'lodash'
///
// State
///

const state = {
  basket: [],
  discount: 0,
  taxPrice: 0,
  // transport: 0,
  paymentPayload: {
    basket: [],
    discount: null,
    // delivery: null
  },
}

///
// Getters
///
const getters = {
  basketData: (state) => {
    return state.basket
  },
  discountData: (state) => {
    return state.discount
  },
  taxPriceData: (state) => {
    return state.taxPrice
  },
  // transportData: state => {
  //   return state.transport
  // }
}

///
// Mutations
///
const mutations = {
  basketUpdate(state, data) {
    state.basket = data
    state.paymentPayload.basket = data
  },
  // ไม่ได้ใช้แล้ว บัคที่ olditems
  basketDelete(state, id) {
    var getIndex = state.basket.findIndex((item) => item.id == id)
    if (getIndex >= 0) {
      state.basket.splice(getIndex, 1)
      localStorage.setItem('basket', JSON.stringify(state.basket))
    }
  },
  discountUpdate(state, data) {
    state.discount = data
  },
  discountCodeUpdate(state, data) {
    localStorage.setItem('discount', JSON.stringify(data))
  },

  // transportUpdate(state, data) {
  //   state.transport = data;
  // },
  // deliveryTypeUpdate(state, data) {
  //   localStorage.setItem("delivery", JSON.stringify(data));
  // }
}

///
// Actions
///
const actions = {
  basketUpdateSession({ commit }, data) {
    return new Promise((resolve, reject) => {
      let uriRequest = process.env.BACKEND_URI + '/basket/update'
      Vue.http.post(uriRequest, data).then(
        (response) => {
          resolve(response.data)
        },
        (error) => {
          reject(error)
        },
      )
    })
  },
  basketGetSession({ commit }) {
    return new Promise((resolve, reject) => {
      let uriRequest = process.env.BACKEND_URI + '/basket/get'
      Vue.http.get(uriRequest).then(
        (response) => {
          resolve(response.data)
        },
        (error) => {
          reject(error)
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
