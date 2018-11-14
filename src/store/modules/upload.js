import Vue from 'vue';
import router from '../../router';
// import isEmpty from 'lodash.isempty';

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

  }

}


export default {
  state,
  getters,
  actions,
  mutations
}
