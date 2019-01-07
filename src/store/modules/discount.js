import Vue from 'vue';
import isEmpty from 'lodash.isempty';

// !
// ! ─── STATE ──────────────────────────────────────────────────────────────────────
// !

const state = {
  // ข้อมูลส่วนลดต้นฉบับ
  discountAll: null,
  // ข้อมูลส่วนลดที่หมดอายุแล้ว
  discountExpired: null,
} //// End `state` block

// !
// ! ─── GETTERS ────────────────────────────────────────────────────────────────────
// !

const getters = {
  discountAllData: state => state.discountAll,
} //// end `getters` block




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
  }, //// End `updateState` block
} //// End `mutation` block

// !
// ! ─── ACTIONS ────────────────────────────────────────────────────────────────────
// !


const actions = {
  discountGet({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {

      // check payload 
      if (!payload) return reject('payload empty');

      // create uri
      var uriRequest = process.env.BACKEND_URI + "/discount/id/" + payload;

      Vue.http.get(uriRequest).then(response => {
        return resolve(response.data);
      }, error => {
        return reject(error);
      })
    })
  }, //// end `discountGet` block

  async discountAllGet({
    commit
  }) {

    /**
     * @param {MUTATIONS} commit - function from mutations
     */

    try {

      // call
      const callResult = await Vue.http.get(`${process.env.BACKEND_URI}/discount/all`);

      // update state
      commit('updateState', {
        data: callResult.data.data,
        target: 'discountAll'
      });


      // return function
      return callResult;

    } catch (err) {

      // return function
      return err;
    }
  } //// end `discountAllGet` block
} //// end `actions` block

export default {
  state,
  getters,
  mutations,
  actions,
}
