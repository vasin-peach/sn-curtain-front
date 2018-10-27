import Vue from "vue";
import "../../../lib/omise";

// State
const state = {
  popupPaymentOptions: false
};

// Getters
const getters = {
  popupPaymentOptionsData: state => {
    return state.popupPaymentOptions
  }
};

// Mutations
const mutations = {
  popupPaymentOptionsUpdate(state, data) {
    state.popupPaymentOptions = data || false;
  }
};

export default {
  state,
  getters,
  mutations
};
