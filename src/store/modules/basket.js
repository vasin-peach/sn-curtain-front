import Vue from 'vue';
import _ from 'lodash';
///
// State
///

const state = {
  basket: []
}


///
// Getters
///
const getters = {
  basketData: state => {
    return state.basket
  },
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
