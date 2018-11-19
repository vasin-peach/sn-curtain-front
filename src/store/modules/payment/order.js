import Vue from "vue";
import isEmpty from 'lodash.isempty';

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
  },

  createOrder({
    getters
  }, data) {

    /**
     * @param status BOOLEN - bill status
     */

    return new Promise(async (resolve, reject) => {

      // validate
      if (!data) return reject(false);


      const product = { // declear production payload
        email: getters.userData.email,
        product: localStorage.basket,
        discount: localStorage.discount,
        delivery: await getters.deliveryPriceData,
        payment: JSON.parse(Vue.cookie.get("paymentAddress") || 'null') || null
      };

      // call backend
      Vue.http.post(`${process.env.BACKEND_URI}/order`, product).then(

        response => { // response success
          console.log(response);
        },

        (error) => { // response error
          console.log(error);
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
