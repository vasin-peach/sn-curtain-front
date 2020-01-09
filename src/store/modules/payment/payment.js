import Vue from 'vue'
import '../../../lib/omise'

// State
const state = {
  popupPaymentOptions: false,
  popupUpload: false,
}

// Getters
const getters = {
  popupPaymentOptionsData: (state) => {
    return state.popupPaymentOptions
  },
  popupUploadData: (state) => {
    return state.popupUpload
  },
}

// Mutations
const mutations = {
  popupPaymentOptionsUpdate(state, data) {
    state.popupPaymentOptions = data || false
  },
  popupUploadUpdate(state, data) {
    state.popupUpload = data || false
  },
}

export default {
  state,
  getters,
  mutations,
}
