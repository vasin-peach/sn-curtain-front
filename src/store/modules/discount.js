import Vue from 'vue';

///
// Actions
///
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
  }
}

export default {
  actions,
}
