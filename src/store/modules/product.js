import Vue from "vue";
import _ from "lodash";
import isEmpty from "lodash.isempty";

///
// State
///

const state = {
  product: null,
  productAll: null
};

///
// Getters
///
const getters = {
  productData: state => {
    return state.product;
  },
  productAllData: state => {
    return state.productAll;
  }
};

///
// Mutations
///
const mutations = {
  productUpdate(state, data) {
    data ? (state.product = data) : false;
  },
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
      state[data.target] = data.data || 0;
    } catch (err) {
      return 0;
    }
  }
};

///
// Actions
///
const actions = {
  productAll({ commit }) {
    return new Promise(async (resolve, reject) => {
      // ! Call
      const callResult = await Vue.http.get(
        `${process.env.BACKEND_URI}/product/all`
      );
      if (
        !callResult.data ||
        !callResult.data.data ||
        isEmpty(callResult.data.data)
      )
        return reject(false);

      // ! Update
      commit("updateState", {
        data: callResult.data.data,
        target: "productAll"
      });

      return resolve(callResult.data.data);
    });
  },

  productGet({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // check payload
      if (!payload) return reject("payload empty");

      // create uri
      var uriRequest = "/product/id/" + payload;

      // send request
      Vue.http.get(process.env.BACKEND_URI + uriRequest).then(
        response => {
          commit("productUpdate", response.data.data);
          return resolve(response.data);
        },
        error => {
          commit("productUpdate", error);
          return reject(error);
        }
      );
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
