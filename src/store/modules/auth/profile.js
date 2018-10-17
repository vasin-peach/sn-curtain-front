import Vue from 'vue';
import router from '../../../router';
import _ from 'lodash';


const state = {
  user: null
}

const getters = {
  // userData: state => {
  //   return state.user
  // },
}

const mutations = {
  // update(state, data) {
  //   state.user = data;
  // },
}

const actions = {
  profileUpdate({
    commit,
    dispatch
  }, payload) {
    return new Promise((resolve, reject) => {

      // check payload 
      if (!payload) return reject('payload empty');

      // send request
      Vue.http.post(process.env.BACKEND_URI + "/auth/profile/update", payload).then(response => {
        Vue.swal({
          type: "success",
          title: "บันทึก",
          text: "ทำการอัพเดทข้อมูลส่วนตัวแล้ว."
        })
        return resolve(response);
      }, error => {
        Vue.swal({
          type: "error",
          title: "ผิดพลาด",
          text: "ไม่สามารถอัพเดทข้อมูลส่วนตัวได้ กรุณาติดต่อผู้ดูแลระบบ."
        });
        return reject(error);
      })

    })
  },

  localRegister({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {

      // check payload 
      if (!payload) return reject('payload empty');

      // send request
      Vue.http.post(process.env.BACKEND_URI + "/auth/local/register", payload).then(response => {
        Vue.swal({
          type: "success",
          title: "สมัครสมาชิกเสร็จสิ้น",
          text: "ท่านสามารถเข้าสู่ระบบเพื่อใช้งานได้แล้ว."
        }).then(() => {
          router.push({
            name: 'Login'
          })
        })
      }, error => {
        var status = error.body.status;
        if (status == 409) {
          Vue.swal({
            type: "warning",
            title: "อีเมลล์นี้ถูกใช้ไปแล้ว",
            text: "อีเมลลน์นี้ถูกใช้ไปแล้ว กรุณาลองอีเมลล์อื่น."
          });
        }
      })
    })
  },

  profile({
    commit
  }) {
    return new Promise((resolve, reject) => {
      Vue.http.get(process.env.BACKEND_URI + "/auth/profile").then(response => {
        commit('userUpdate', response.data.data);
        return resolve(response.data);
      }, error => {
        commit('userUpdate', null);
        return reject(error);
      });
    });
  },
  profileAddressUpdate({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      const payload = {
        house_no: data.house_no,
        village_no: data.village_no,
        amphoe: data.amphoe,
        district: data.district,
        road: data.road,
        province: data.province,
        zip: data.zip
      }

      Vue.http.post(process.env.BACKEND_URI + "/auth/profile/address/update", payload).then(response => {
        console.log(response);
        return resolve(response);
      }, error => {
        console.log(error);
        return reject(error);
      })
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
