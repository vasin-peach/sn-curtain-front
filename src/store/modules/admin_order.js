import Vue from "vue";
import isEmpty from "lodash.isempty";

// !
// ! ─── STATE ──────────────────────────────────────────────────────────────────────
// !

const state = {
  // ออเดอร์ทั้งหมด
  orderAll: null,
  // ออเดอร์ที่ผู้ใช้อัพโหลดหลักฐานมา
  orderEvidence: null,
  // ออเดอร์ที่ยืนยันโดยทีมงานแล้ว
  orderConfirm: null,
  // ออเดอร์ที่ดำเนินการเสร็จแล้ว
  orderSuccess: null,
  // ออเดอร์ที่ถูกยกเลิก,
  orderCancel: null
}

// !
// ! ─── GETTERS ────────────────────────────────────────────────────────────────────
// !

const getters = {
  orderAllData: state => state.orderAll,
  orderEvidenceData: state => state.orderEvidence,
  orderConfirmData: state => state.orderConfirm,
  orderSuccessData: state => state.orderSuccess,
  orderCancelData: state => state.orderCancel
}

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
  },
} //// End `updateState` block

// !
// ! ─── ACTIONS ────────────────────────────────────────────────────────────────────
// !

const actions = {
  orderAllGet({
    commit
  }) {
    return new Promise(async (resolve, reject) => {

      // call
      const callResult = await Vue.http.post(`${process.env.BACKEND_URI}/order/all`);

      // validate result
      if (!callResult.data || !callResult.data.data || isEmpty(callResult.data.data)) return reject(false);

      const originalResult = callResult.data.data

      // update state orderAll
      commit("updateState", {
        data: originalResult,
        target: 'orderAll'
      });

      // update state orderEvidence
      commit("updateState", {
        data: originalResult.filter(x => x.order_status == 'evidence'),
        target: 'orderEvidence'
      })

      // update state orderConfirm
      commit("updateState", {
        data: originalResult.filter(x => x.order_status == 'confirm'),
        target: 'orderConfirm'
      });


      // update state orderSuccess
      commit("updateState", {
        data: originalResult.filter(x => x.order_status == 'success'),
        target: 'orderSuccess'
      });

      // update state orderCancel
      commit("updateState", {
        data: originalResult.filter(x => x.order_status == 'cancel'),
        target: 'orderCancel'
      })

      // return
      return resolve(callResult.data.data);
    });
  }
} //// End `orderAllGet` block

// !
// ! ─── EXPORT ─────────────────────────────────────────────────────────────────────
// !

export default {
  state,
  getters,
  mutations,
  actions,
}
