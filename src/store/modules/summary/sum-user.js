import Vue from 'vue';
import isEmpty from 'lodash.isempty';

// ? STATE
const state = {
  membership: 0
}

// ? GETTERS
const getters = {
  memberShipData(state) {
    return state.membership || 0;
  }
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


    if (isEmpty(data) || !data.data || !data.target) return 0;
    try {
      state[data.target] = data.data || 0
    } catch (err) {
      return 0
    }

  }
}


// ? ACTIONS
const actions = {

  // * get membership
  getMemberShip({
    commit
  }) {

    return new Promise(async (resolve, reject) => {

      // ! Call
      try {
        const callResult = await Vue.http.get(`${process.env.BACKEND_URI}/summary/user`);
        commit('updateState', {
          data: callResult.data.data || 0,
          target: 'membership'
        }, );
        return resolve(true);
      } catch (error) {
        return reject(error);
      }

    });
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
