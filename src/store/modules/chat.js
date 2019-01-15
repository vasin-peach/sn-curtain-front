import Vue from "vue";
import isEmpty from "lodash.isempty";

// !
// ! ─── STATE ──────────────────────────────────────────────────────────────────────
// !

const state = {
  chat: null
}

// !
// ! ─── GETTERS ────────────────────────────────────────────────────────────────────
// !

const getters = {
  chatData: state => state.chat
}

// !
// ! ─── MUTATIONS ──────────────────────────────────────────────────────────────────
// !

const mutations = {
  pushState(state, data) {
    /**
     * @param {OBJECT} state - state
     * @param {OBJECT} - {
     *  @param {ANY} - data to push to target
     *  @param {STRING} - target to push
     * }
     */

    if (isEmpty(data) || !data.data || !data.target) return 0;

    // push
    return state[data.target].push(data.data);

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
    if (isEmpty(data) || !data.data || !data.target) return 0;

    // update
    try {
      if (data.index) {
        state[data.target][data.index] = data.data || 0;
      } else state[data.target] = data.data || 0;
    } catch (err) {
      return 0;
    }
  },
} //// End `updateState` block

// !
// ! ─── ACTIONS ────────────────────────────────────────────────────────────────────
// !

const actions = {

  // * Get Slide
  chatGet({
    commit
  }, uid) {
    return new Promise(async (resolve, reject) => {

      try {
        const result = await Vue.http.get(`${process.env.BACKEND_URI}/chat/${uid}`);
        commit("updateState", {
          data: result.data.data,
          target: 'chat'
        })
        return resolve(result.data.data);
      } catch (error) {
        commit("updateState", {
          data: null,
          target: 'chat'
        })
        return reject(error);
      }

    });
  }, //// End `slideAllGet` block

  // // * Update Slide
  // async slideUpdate({
  //   commit
  // }, data) {

  //   const callResult = await Vue.http.post(`${process.env.BACKEND_URI}/slide`, data);
  //   return callResult;

  // }, //// End `slideUpdate` block

  // // * Delete Slide
  // async slideDelete({
  //   commit
  // }, data) {

  //   const callResult = await Vue.http.post(`${process.env.BACKEND_URI}/slide/delete`, data);
  //   return callResult;

  // } //// End `slideDelete` block


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
