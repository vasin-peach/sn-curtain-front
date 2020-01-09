import Vue from 'vue'
import isEmpty from 'lodash.isempty'
// ────────────────────────────────────────────────────────────────────────────────

// !
// ! ─── STATE ──────────────────────────────────────────────────────────────────────
// !

const state = {
  guest: null,
}

// !
// ! ─── GETTERS ────────────────────────────────────────────────────────────────────
// !

const getters = {
  guestData: (state) => state.guest,
}

// !
// ! ─── MUTATIONS ──────────────────────────────────────────────────────────────────
// !

const mutations = {
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
        state[data.target][data.index] = data.data || 0
      } else state[data.target] = data.data || 0
    } catch (err) {
      return 0
    }
  },
} //// End `updateState` block

// !
// ! ─── ACTIONS ────────────────────────────────────────────────────────────────────
// !

const actions = {
  // * Get Guest
  async guestGet({ commit }) {
    try {
      // call
      const result = await Vue.http.get(
        `${process.env.BACKEND_URI}/guest`,
      )

      // update state
      commit('updateState', {
        data: result.data.data,
        target: 'guest',
      })

      // return
      return result.data.data
    } catch (error) {
      // return
      return error
    }
  },

  // * Update Guest
  async guestUpdate({ commit }, payload) {
    // try
    try {
      // call
      const result = await Vue.http.post(
        `${process.env.BACKEND_URI}/guest/update`,
        {
          payload: payload,
        },
      )

      // update state
      commit('updateState', {
        data: result.data.data,
        target: 'guest',
      })

      // return
      return result.data.data
    } catch (error) {
      // return
      return error
    }
  },
}

// !
// ! ─── EXPORT ─────────────────────────────────────────────────────────────────────
// !

export default {
  state,
  getters,
  mutations,
  actions,
}
