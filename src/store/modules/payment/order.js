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
  orderGetById({}, order_id) {
    return new Promise((resolve, reject) => {

      // request uri
      let uri = process.env.BACKEND_URI + "/order/" + order_id;

      Vue.http.get(uri).then( // call api

        response => { // response success
          return resolve(response);
        },

        error => { // response error
          return reject(error);
        }

      );
    });

  },

  getOrder() {
    return new Promise((resolve, reject) => {

      let uri = process.env.BACKEND_URI + "/order";

      Vue.http.get(uri).then( // call api

        response => { // success
          return resolve(response);
        },

        error => { // error
          return reject(error);
        }

      );

    })
  }

} // action block end.

export default {
  state,
  getters,
  actions,
  mutations
};
