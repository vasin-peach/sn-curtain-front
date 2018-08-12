///
// State
///

const state = {
  basket: null
}


///
// Getters
///
const getters = {
  basketData: state => {
    return state.loading
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
