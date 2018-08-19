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
