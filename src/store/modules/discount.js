import Vue from 'vue';
import isEmpty from 'lodash.isempty';
import swal from 'sweetalert2';

// !
// ! ─── STATE ──────────────────────────────────────────────────────────────────────
// !

const state = {
  // ข้อมูลส่วนลดต้นฉบับ
  discountAll: null,
  // ข้อมูลส่วนลดที่หมดอายุแล้ว
  discountExpired: null,
} //// End `state` block

// !
// ! ─── GETTERS ────────────────────────────────────────────────────────────────────
// !

const getters = {
  discountAllData: state => state.discountAll,
} //// end `getters` block




// !
// ! ─── MUTATIONS ──────────────────────────────────────────────────────────────────
// !

const mutations = {
  updateState(state, data) {
    /**
     * @param state OBJECT - state object
     * @param data OBJECT - {
     *  data ANY - set data to state
     *  target STRING - state name
     *  index NUMBER - number
     * }
     */

    // validate
    if (isEmpty(data) || !data.data || !data.target) return 0;

    // update
    try {
      if (data.index) {
        state[data.target][data.index] = data.data || 0;
      } else state[data.target] = data.data || 0;
    } catch (err) {
      return 0;
    }
  }, //// End `updateState` block
} //// End `mutation` block

// !
// ! ─── ACTIONS ────────────────────────────────────────────────────────────────────
// !


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
  }, //// end `discountGet` block

  async discountAllGet({
    commit
  }) {

    /**
     * @param {MUTATIONS} commit - function from mutations
     */

    try {

      // call
      const callResult = await Vue.http.get(`${process.env.BACKEND_URI}/discount/all`);

      // update state
      commit('updateState', {
        data: callResult.data.data,
        target: 'discountAll'
      });


      // return function
      return callResult;

    } catch (err) {

      // return function
      return err;
    }
  }, //// end `discountAllGet` block

  async discountUpdate({
    commit
  }, data) {

    /**
     * @param {MUTATIONS} commit - function from mutations
     * @param {OBJECT} data - object to update
     */

    try {

      // * Call
      const callResult = await Vue.http.post(`${process.env.BACKEND_URI}/discount/update`, data);
      swal({
        type: 'success',
        title: 'อัพเดทเสร็จสิ้น',
        text: 'ทำการอัพเดทส่วนลด ' + callResult.body.data.name + ' เสร็จสิ้น.'
      });

      return callResult;

    } catch (err) {

      // * Alert
      if (err.body.err == 'code is exist') return swal({
        type: 'error',
        title: 'โค้ดส่วนลดนี้ถูกใช้ไปแล้ว',
        text: 'โค้ดส่วนลดจำเป็นต้องไม่ซ้ำกับ โค้ดส่วนลดอื่นๆที่เคยสร้างไว้'
      });

      swal({
        type: 'error',
        title: 'เกิดข้อผิดพลาดในการอัพเดทส่วนลด',
        text: err.body.err
      });

      // return function
      return err;
    }
  }, //// end `discountUpdate` block

  async discountDelete({
    commit
  }, id) {

    /**
     * @param {MUTATIONS} commit - function from mutations
     * @param {STRING} id - discount id to delete
     */

    try {

      // * Call
      const callResult = await Vue.http.post(`${process.env.BACKEND_URI}/discount/delete`, {
        id: id
      });
      swal({
        type: 'success',
        title: 'ลบส่วนลดเสร็จสิ้น',
        text: 'ทำการลบส่วนลด ' + callResult.body.data.name + ' เสร็จสิ้น.'
      });

      return callResult;

    } catch (err) {

      // * Alert
      swal({
        type: 'error',
        title: 'เกิดข้อผิดพลาดในการอัพเดทส่วนลด',
        text: err.body.err
      });

      // return function
      return err;
    }
  }, //// end `discountUpdate` block
} //// end `actions` block

export default {
  state,
  getters,
  mutations,
  actions,
}
