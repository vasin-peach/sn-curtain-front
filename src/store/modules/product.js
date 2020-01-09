import Vue from 'vue'
import _ from 'lodash'
import isEmpty from 'lodash.isempty'

///
// State
///

const state = {
  product: null,
  productAll: null,
  productCategoryOption: null,
  productTypeOption: null,
  productNatureOption: null,
}

///
// Getters
///
const getters = {
  productData: (state) => {
    return state.product
  },
  productAllData: (state) => {
    return state.productAll
  },
  productTempData: (state) => {
    return state.productAll
  },
  productCategoryOptionData: (state) => {
    return state.productCategoryOption
  },
  productTypeOptionData: (state) => {
    return state.productTypeOption
  },
  productNatureOptionData: (state) => {
    return state.productNatureOption
  },
}

///
// Mutations
///
const mutations = {
  productUpdate(state, data) {
    data ? (state.product = data) : false
  },
  updateStateProductAll(state, data) {
    state.productAll[data.index] = data.data
  },
  updateState(state, data) {
    /**
     * @param state OBJECT - state object
     * @param data OBJECT - {
     *  data ANY - set data to state
     *  target STRING - state name
     *  index NUMBER - number
     * }
     */

    // validate
    if (isEmpty(data) || !data.data || !data.target) return 0

    // update
    try {
      if (data.index) {
        console.log(state[data.target][data.index])
        state[data.target][data.index] = data.data || 0
      } else state[data.target] = data.data || 0
    } catch (err) {
      return 0
    }
  },

  // * Category Options Filter
  async filterCategoryOption(state, data) {
    /**
     * @param state OBJECT - state object
     * @param data OBJECT - data is want to filter
     */

    // validate
    if (isEmpty(data)) return false

    // filter
    const filterResult = await data.map((items) => {
      return items.category.val
    })

    state.productCategoryOption = Array.from(new Set(filterResult))
  },

  // * Type Options Filter
  async filterTypeOption(state, data) {
    /**
     * @param state OBJECT - state object
     * @param data OBJECT - data is want to filter
     */

    // validate
    if (isEmpty(data)) return false

    // filter
    const filterResult = await data.map((items) => {
      return items.category.type.val
    })
    state.productTypeOption = Array.from(new Set(filterResult))
  },

  // * Nature Options Filter
  async filterNatureOption(state, data) {
    /**
     * @param state OBJECT - state object
     * @param data OBJECT - data is want to filter
     */

    // validate
    if (isEmpty(data)) return false

    // filter
    const filterResult = await data.map((items) => {
      return items.category.type.nature.val
    })
    state.productNatureOption = filterResult
  },
}

///
// Actions
///
const actions = {
  productAll({ commit }) {
    return new Promise(async (resolve, reject) => {
      // ! Call
      const callResult = await Vue.http.get(
        `${process.env.BACKEND_URI}/product/all`,
      )
      if (
        !callResult.data ||
        !callResult.data.data ||
        isEmpty(callResult.data.data)
      )
        return reject(false)

      // ! Update
      commit('updateState', {
        data: callResult.data.data,
        target: 'productAll',
      })

      return resolve(callResult.data.data)
    })
  },

  productGet({ commit }, payload) {
    return new Promise(
      async (resolve, reject) => {
        // check payload
        if (!payload) return reject('payload empty')

        // create uri
        var uriRequest = '/product/id/' + payload

        // send request
        Vue.http
          .get(process.env.BACKEND_URI + uriRequest)
          .then(async (response) => {
            const payload = {
              product: {
                id: response.data.data[0]._id,
                brand: response.data.data[0].brand,
                name: response.data.data[0].name,
              },
            }
            await Vue.http.post(
              `${process.env.BACKEND_URI}/view`,
              payload,
            )
            await Vue.http.post(
              `${process.env.BACKEND_URI}/product/view`,
              {
                id: response.data.data[0]._id,
              },
            )
            commit('productUpdate', response.data.data)
            return resolve(response.data)
          })
      },
      (error) => {
        commit('productUpdate', error)
        return reject(error)
      },
    )
  },

  // ! Delete Product
  productDelete({}, id) {
    /**
     * @param id OBJECT - id send to backend
     */

    return new Promise((resolve, reject) => {
      // validate
      if (!id) return reject('bad param, `id` is empty.')

      // call
      Vue.http
        .post(`${process.env.BACKEND_URI}/product/delete`, {
          id: id,
        })
        .then(
          (response) => {
            return resolve(response.data)
          },
          (error) => {
            return reject(error)
          },
        )
    })
  },

  // ! Update Product
  productUpdate({}, data) {
    /**
     * @param data OBJECT - data to update
     */

    return new Promise(async (resolve, reject) => {
      // validate
      if (!data || isEmpty(data))
        return reject('bad param, `data` is empty')

      // call
      const callResult = await Vue.http.post(
        `${process.env.BACKEND_URI}/product/update`,
        data,
      )
      return resolve(callResult.data.data)
    })
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
