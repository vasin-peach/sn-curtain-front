import Vue from "vue";
import "../../../lib/omise";

// console.log(process.env.OMISE_CLIENT);

// State
const state = {
  // delivery: []
};

// Getters
const getters = {
  // deliveryData: state => {
  //   return state.delivery
  // },
};

// Mutations
const mutations = {
  // deliveryUpdate(state, data) {
  //   state.delivery = data
  // }
};

// Actions
const actions = {
  getSession({
    commit,
    getters
  }) {
    return new Promise((resolve, reject) => {
      var uriRequest = process.env.BACKEND_URI + "/basket/get";
      Vue.http
        .get(uriRequest)
        .then(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
    });
  },

  createToken({
    commit
  }) {
    return new Promise((resolve, reject) => {
      Omise.setPublicKey(process.env.OMISE_CLIENT);

      const card = {
        name: "BUMBIN ARAUPORN",
        number: "4242424242424242",
        expiration_month: "02",
        expiration_year: "2020",
        security_code: "111"
      };

      Omise.createToken("card", card, (statusCode, response) => {
        if (statusCode == 200) {
          let urlRequest = process.env.BACKEND_URI + "/payment/charge";
          Vue.http.post(urlRequest, response).then(
            response => {
              console.log(response);
            },
            error => {
              console.log(error);
            }
          );
        }
      });

      // var uriRequest = process.env.BACKEND_URI + "/delivery";
      // Vue.http.get(uriRequest).then(response => {
      //   commit("deliveryUpdate", response.data.data);
      //   return resolve(response.data);
      // }, err => {
      //   return reject(err)
      // })
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
