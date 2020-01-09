import Vue from 'vue'
import isEmpty from 'lodash.isempty'
import moment from 'moment'

// ? STATE
const state = {
  saleDay: 0,
  saleWeek: 0,
  saleMonth: 0,
  saleYear: 0,
}

// ? GETTERS
const getters = {
  saleDayData(state) {
    return state.saleDay || 0
  },
  saleWeekData(state) {
    return state.saleWeek || 0
  },
  saleMonthData(state) {
    return state.saleMonth || 0
  },
  saleYearData(state) {
    return state.saleYear || 0
  },
}

// ? MUTATIONS
const mutations = {
  updateState(state, data) {
    /**
     * @param state OBJECT - state object
     * @param data OBJECT - {
     *  data ANY - set data to state
     *  target STRING - state name
     * }
     */

    if (isEmpty(data) || !data.data || !data.target) return 0
    try {
      state[data.target] = data.data || 0
    } catch (err) {
      return 0
    }
  },
}

// ? ACTIONS
const actions = {
  // * get sale by day
  getSaleDay({ commit }) {
    return new Promise(async (resolve, reject) => {
      // ! Call
      try {
        const payload = {
          start: moment()
            .startOf('day')
            .toISOString(),
          end: moment()
            .endOf('day')
            .toISOString(),
        }
        let callResult = await Vue.http.post(
          `${process.env.BACKEND_URI}/summary/sale/date`,
          payload,
        )
        if (
          !callResult.data ||
          !callResult.data.data ||
          !callResult.data.data[0]
        )
          return 0
        callResult = callResult.data.data[0].sum
          .toString()
          .slice(0, -2)
        commit('updateState', {
          data: callResult || 0,
          target: 'saleDay',
        })
        return resolve(true)
      } catch (error) {
        return reject(error)
      }
    })
  },

  // * get sale by week
  getSaleWeek({ commit }) {
    return new Promise(async (resolve, reject) => {
      // ! Call
      try {
        const payload = {
          start: moment()
            .startOf('week')
            .toISOString(),
          end: moment()
            .endOf('week')
            .toISOString(),
        }
        let callResult = await Vue.http.post(
          `${process.env.BACKEND_URI}/summary/sale/date`,
          payload,
        )
        if (
          !callResult.data ||
          !callResult.data.data ||
          !callResult.data.data[0]
        )
          return 0
        callResult = callResult.data.data[0].sum
          .toString()
          .slice(0, -2)
        commit('updateState', {
          data: callResult || 0,
          target: 'saleWeek',
        })
        return resolve(true)
      } catch (error) {
        return reject(error)
      }
    })
  },

  // * get sale by month
  getSaleMonth({ commit }) {
    return new Promise(async (resolve, reject) => {
      // ! Call
      try {
        const payload = {
          start: moment()
            .startOf('month')
            .toISOString(),
          end: moment()
            .endOf('month')
            .toISOString(),
        }
        let callResult = await Vue.http.post(
          `${process.env.BACKEND_URI}/summary/sale/date`,
          payload,
        )
        if (
          !callResult.data ||
          !callResult.data.data ||
          !callResult.data.data[0]
        )
          return 0
        callResult = callResult.data.data[0].sum
          .toString()
          .slice(0, -2)
        commit('updateState', {
          data: callResult || 0,
          target: 'saleMonth',
        })
        return resolve(true)
      } catch (error) {
        return reject(error)
      }
    })
  },

  // * get sale by month
  getSaleYear({ commit }) {
    return new Promise(async (resolve, reject) => {
      // ! Call
      try {
        const payload = {
          start: moment()
            .startOf('year')
            .toISOString(),
          end: moment()
            .endOf('year')
            .toISOString(),
        }
        let callResult = await Vue.http.post(
          `${process.env.BACKEND_URI}/summary/sale/date`,
          payload,
        )
        if (
          !callResult.data ||
          !callResult.data.data ||
          !callResult.data.data[0]
        )
          return 0
        callResult = callResult.data.data[0].sum
          .toString()
          .slice(0, -2)
        commit('updateState', {
          data: callResult || 0,
          target: 'saleYear',
        })
        return resolve(true)
      } catch (error) {
        return reject(error)
      }
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
