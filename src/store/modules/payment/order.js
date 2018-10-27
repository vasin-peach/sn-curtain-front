import Vue from "vue";

// console.log(process.env.OMISE_CLIENT);

// State
const state = {};

// Getters
const getters = {};

// Mutations
const mutations = {};

// Actions
const actions = {
  getOrder() {
    return new Promise((resolve, reject) => {

      // request uri
      let uri = process.env.BACKEND_URI + "/order";

      Vue.http.get(uri).then( // call api

        response => { // response success
          console.log(response);
          return resolve(response);
        },

        error => { // response error
          console.log(error);
          return reject(error);
        }

      );
    });

  },

} // action block end.

export default {
  state,
  getters,
  actions,
  mutations
};
