import Vue from "vue";
import isEmpty from "lodash.isempty";

// !
// ! ─── ACTIONS ────────────────────────────────────────────────────────────────────
// !

const actions = {
  async viewGet() {

    // * Call
    try {
      const response = await Vue.http.get(`${process.env.BACKEND_URI}/view`);
      return response.data.data;
    } catch (error) {
      return error;
    }
  },

  async viewCreate(data) {
    // * Validate
    if (!data || isEmpty(data)) return 'param is empty'

    // * Call
    try {
      const response = await Vue.http.post(`${process.env.BACKEND_URI}/view`, data);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
}

// !
// ! ─── EXPORT ─────────────────────────────────────────────────────────────────────
// !

export default {
  actions
}
