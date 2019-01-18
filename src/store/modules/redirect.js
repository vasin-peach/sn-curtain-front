import Vue from 'vue';
import isEmpty from 'lodash.isempty';

const actions = {

  updateRedirect({}, data) {

    return new Promise((resolve, reject) => {

      // ! Validate
      if (!data || isEmpty(data)) return;

      // !Call

      data = data.replace(/\//g, '|')
      Vue.http.get(`${process.env.BACKEND_URI}/redirect/update/${data}`);

    });
  }
}

//
// ─── EXPORT ─────────────────────────────────────────────────────────────────────
//

export default {
  actions
}
