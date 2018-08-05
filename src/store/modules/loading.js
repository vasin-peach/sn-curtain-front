///
// State
///

const state = {
  loading: {
    page: false,
    store: false,
  }
}


///
// Getters
///
const getters = {
  loadingData: state => {
    return state.loading
  }
}


///
// Mutations
///
const mutations = {
  loadingUpdate(state, data) {
    switch (data.type) {
      case 'page': // Page
        if (state.loading.page) {
          setTimeout(() => {
            state.loading.page = data.value;
          }, 1000);
        } else {
          state.loading.page = data.value;
        }
        break;

      case 'store': // Store
        if (state.loading.store) {
          setTimeout(() => {
            state.loading.store = data.value;
          }, 1000);
        } else {
          state.loading.store = data.value;
        }
        break;

      default: // Default
        if (state.loading.page) {
          setTimeout(() => {
            state.loading.page = data.value;
          }, 1000);
        } else {
          state.loading.full = data.value;
        }
        break;

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
