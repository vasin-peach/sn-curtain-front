///
// State
///

const state = {
  loading: {
    page: false,
    store: false,
    storePopular: false,
    atm: false,
  },
}

///
// Getters
///
const getters = {
  loadingData: (state) => {
    return state.loading
  },
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
            state.loading.page = data.value
          }, 300)
        } else {
          state.loading.page = data.value
        }
        break

      case 'store': // Store
        if (state.loading.store) {
          setTimeout(() => {
            state.loading.store = data.value
          }, 300)
        } else {
          state.loading.store = data.value
        }
        break

      case 'storePopular': // Store
        if (state.loading.storePopular) {
          setTimeout(() => {
            state.loading.storePopular = data.value
          }, 300)
        } else {
          state.loading.storePopular = data.value
        }
        break

      case 'atm': // atm
        if (state.loading.atm) {
          setTimeout(() => {
            state.loading.atm = data.value
          }, 300)
        } else {
          state.loading.atm = data.value
        }
        break

      default:
        // Default
        if (state.loading.page) {
          setTimeout(() => {
            state.loading.page = data.value
          }, 300)
        } else {
          state.loading.full = data.value
        }
        break
    }
  },
}

///
// Actions
///
const actions = {}

export default {
  state,
  getters,
  actions,
  mutations,
}
