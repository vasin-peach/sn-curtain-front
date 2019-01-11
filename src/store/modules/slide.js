import Vue from "vue";
import isEmpty from "lodash.isempty";

// !
// ! ─── STATE ──────────────────────────────────────────────────────────────────────
// !

const state = {
  slideAll: null,
  slideMain: null,
  slideSub: null,
}

// !
// ! ─── GETTERS ────────────────────────────────────────────────────────────────────
// !

const getters = {
  slideAllData: state => state.slideAll,
  slideMainData: state => state.slideMain,
  slideSubData: state => state.slideSub
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
  slideAllGet({
    commit
  }) {
    return new Promise(async (resolve, reject) => {

      // call
      const callResult = await Vue.http.get(`${process.env.BACKEND_URI}/slide`);

      // validate result
      if (!callResult.data || !callResult.data.data || isEmpty(callResult.data.data)) {

        // update state to empty arrray
        commit("updateState", {
          data: [],
          target: 'slideAll'
        });
        commit("updateState", {
          data: [],
          target: 'slideMain'
        });
        commit("updateState", {
          data: [],
          target: 'slideSub'
        });

        // return is empty
        return reject('empty');
      }

      const originalResult = callResult.data.data

      // update state slideAll
      commit("updateState", {
        data: originalResult,
        target: 'slideAll'
      });

      // update state slideEvidence
      commit("updateState", {
        data: originalResult.filter(x => x.type == 'main'),
        target: 'slideMain'
      })

      // update state slideConfirm
      commit("updateState", {
        data: originalResult.filter(x => x.type == 'sub'),
        target: 'slideSub'
      });

      // return
      return resolve(callResult.data.data);
    });
  }, //// End `slideAllGet` block

  // * Update Slide
  async slideUpdate({
    commit
  }, data) {

    const callResult = await Vue.http.post(`${process.env.BACKEND_URI}/slide`, data);
    return callResult;

  }, //// End `slideUpdate` block

  // * Delete Slide
  async slideDelete({
    commit
  }, id) {

    const callResult = await Vue.http.post(`${process.env.BACKEND_URI}/slide/delete`, {
      id: id
    });
    return callResult;

  } //// End `slideDelete` block


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
