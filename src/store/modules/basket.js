import _ from 'lodash';
import {
  router
} from 'sw-toolbox';
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
    var itemStatus = false
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

    // if (_.isEmpty(basket)) basket.push(data);
    // else Object.keys(basket).forEach((key) => {
    //   if (data.id == basket[key].id && data.amount != basket[key].amount) { // update item
    //     basket[key].data = data.data
    //     basket[key].amount = data.amount
    //     return true
    //   } else if (data.id != basket[key].id) { // push new item
    //     basket.push(data);
    //     return true
    //   }
    // })
  },
  // basketPop(state, data) {
  //   var basket = state.basket
  //   if (_.isEmpty(basket)) return false
  //   else Object.keys(basket).forEach((key) => {
  //     basket[key].id == data.id && basket[key].amount == 1 ? delete basket[key] : basket[key].amount -= 1
  //   })
  // }
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
