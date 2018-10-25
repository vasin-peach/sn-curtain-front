import Vue from "vue";
import "../../../lib/omise";

// console.log(process.env.OMISE_CLIENT);

// State
const state = {};

// Getters
const getters = {};

// Mutations
const mutations = {};

// Actions
const actions = {
  creditCreateToken({ state, getters }, data) {
    return new Promise((resolve, reject) => {
      Omise.setPublicKey(process.env.OMISE_CLIENT);

      const card = {
        name: data.card_name,
        number: data.card_number.replace(/\s/g, ""),
        expiration_month: data.expires_date.split("/")[0],
        expiration_year: "20" + data.expires_date.split("/")[1],
        security_code: data.cvv
      };

      Omise.createToken("card", card, (statusCode, response) => {
        if (statusCode == 200) {
          const product = {
            email: getters.userData.email,
            product: localStorage.basket,
            discount: localStorage.discount,
            delivery: localStorage.delivery,
            card_token: response.id,
            card: response.card
          };

          let urlRequest = process.env.BACKEND_URI + "/payment/charge";
          Vue.http.post(urlRequest, product).then(
            response => {
              console.log(response);
            },
            error => {
              console.log(error);
            }
          );
        }
      });
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
