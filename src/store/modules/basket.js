import Vue from 'vue';
import _ from 'lodash';
///
// State
///

const state = {
  basket: [],
  discount: 0,
  transport: 0,
  paymentPayload: {
    basket: [],
    discount: null,
    delivery: null
  }
}


///
// Getters
///
const getters = {
  basketData: state => {
    return state.basket
  },
  discountData: state => {
    return state.discount
  },
  transportData: state => {
    return state.transport
  },
  paymentPayloadData: state => {
    return state.paymentPayload
  }
}


///
// Mutations
///
const mutations = {
  basketUpdate(state, data) {
    state.basket = data;
    state.paymentPayload.basket = data;
  },
  basketDelete(state, id) {
    var getIndex = state.basket.findIndex(item => item.id == id)
    if (getIndex >= 0) {
      state.basket.splice(getIndex, 1);
      localStorage.setItem("basket", JSON.stringify(state.basket));
    }
  },
  discountUpdate(state, data) {
    state.discount = data;
  },
  discountCodeUpdate(state, data) {
    state.paymentPayload.discount = data
  },

  transportUpdate(state, data) {
    state.transport = data;
  },
  deliveryTypeUpdate(state, data) {
    state.paymentPayload.delivery = data
  }
}


///
// Actions
///
const actions = {
  basketUpdateSession({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      let uriRequest = process.env.BACKEND_URI + "/basket/update";
      Vue.http.post(uriRequest, data).then(response => {
        resolve(response.data);
      }, error => {
        reject(error);
      })
    })
  },
  basketGetSession({
    commit
  }) {
    return new Promise((resolve, reject) => {
      let uriRequest = process.env.BACKEND_URI + "/basket/get";
      Vue.http.get(uriRequest).then(response => {
        resolve(response.data);
      }, error => {
        reject(error);
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
