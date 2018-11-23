import Vue from 'vue';
import isEmpty from 'lodash.isempty';

const state = {}
const getters = {}
const mutations = {}
const actions = {

  async uploadProfile({
    commit
  }, data) {


    // check image data
    if (!data) return Promise.reject('empty');

    var formData = new FormData();
    formData.append('image', data);

    // call backend
    let resp = await Vue.http.post(process.env.BACKEND_URI + '/upload/profile', formData)

    console.log(resp);

  },

  upload({}, data) {

    /**
     * @param data OBJECT - {
     *  file: OBJECT - image data
     *  destination: STRING - route to upload to backend
     *  objectId: NUMBER - _id to update
     * }
     */

    return new Promise(async (resolve, reject) => {

      // ! Validate
      if (!data || isEmpty(data)) return reject('bad params');

      // create from and append image to from
      var form = new FormData();
      form.append('image', data.file);
      form.append('objectId', data.objectId);

      // ! Call
      try {
        const resp = await Vue.http.post(`${process.env.BACKEND_URI}/upload/${data.destination}`, form);
        return resolve(resp);
      } catch (err) {
        return reject(err);
      }

    });

  }
}


export default {
  state,
  getters,
  actions,
  mutations
}
