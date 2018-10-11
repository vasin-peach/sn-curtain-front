import Vue from 'vue';
import _ from 'lodash';
///
// State
///

const state = {
  basket: [],
  discount: 0,
  transport: 0,
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
  }
}


///
// Mutations
///
const mutations = {
  basketUpdate(state, data) {
    state.basket = data;
  },
  basketDelete(state, id) {
    var getIndex = state.basket.findIndex(item => item.id == id)
    if (getIndex >= 0) {
      state.basket.splice(getIndex, 1);
      localStorage.setItem("basket", JSON.stringify(state.basket))
    }
  },
  discountUpdate(state, data) {
    state.discount = data;
  },
  transportUpdate(state, data) {
    state.transport = data;
  }
}


///
// Actions
///
const actions = {}

export default {
  state,
  getters,
  actions,
  mutations
}
