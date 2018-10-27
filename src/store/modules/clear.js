import Vue from 'vue';

const mutations = {}

const actions = {
  shoppingClear({
    commit
  }) {
    return new Promise((resolve, reject) => {

      // clear localStorage
      localStorage.clear();

      // clear cookie
      Vue.cookie.delete("paymentAddress");

      // remove product in basket
      commit('basketUpdate', []);

      return resolve(true);

    }, () => {
      return reject(false);
    });

  }
}

export default {
  actions,
  mutations
}
