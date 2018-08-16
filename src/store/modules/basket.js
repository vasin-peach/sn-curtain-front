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
  basketPush(state, data) {
    var basket = state.basket

    // push if basket empty
    if (_.isEmpty(basket)) basket.push(data);

    var original = basket.find((item, index) => {
      return item.id === data.id
    })

    // same item but diffirent amount
    var getIndex = basket.findIndex(item => item.id == data.id && item.amount != data.amount)
    if (getIndex >= 0) {
      basket.splice(getIndex);
      basket.push(data)
    }

    if (!original) {
      basket.push(data);
    }
  },
}


///
// Actions
///
const actions = {
  basketGet({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      if (!payload) return reject('payload empty');

      var requestURL = process.env.BACKEND_URO + "/basket/get/"

      Vue.http.get(requestURL).then(response => {
        commit('basketUpdate', response.data);
        return resolve(response.data)
      }, error => {
        switch (error.status) {
          case 0:
            commit('loadingUpdate', {
              type: 'store',
              value: 'fail',
            })
            break;
          case 404:
            commit('loadingUpdate', {
              type: 'store',
              value: 'notfound',
            })
        }
      })
    })
  },
  basketCreate({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      if (!payload) return reject('payload empty');

      var requestURL = process.env.BACKEND_URO + "/basket/create/" + payload.key + "/" + payload.data

      Vue.http.get(requestURL).then(response => {
        return resolve(response.data)
      }, error => {
        switch (error.status) {
          case 0:
            commit('loadingUpdate', {
              type: 'store',
              value: 'fail',
            })
            break;
          case 404:
            commit('loadingUpdate', {
              type: 'store',
              value: 'notfound',
            })
        }
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
