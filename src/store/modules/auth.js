import Vue from 'vue';
import router from '../../router';
import _ from 'lodash';


const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
  localLogin({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {

      // check payload 
      if (!payload) return reject('payload empty');

      // send request
      Vue.http.post(process.env.BACKEND_URI + "/auth/local/login", payload).then(response => {
        Vue.swal({
          type: "success",
          title: "ทำการเข้าสู่ระบบ",
          text: "ทำการเข้าสู่ระบบแล้ว."
        }).then(() => {
          router.push({
            name: 'Login'
          })
        })
      }, error => {
        if (error.status == 500) {
          Vue.swal({
            type: "warning",
            title: "อีเมลล์หรือรหัสผ่านไม่ถูกต้อง",
            text: "อีเมลล์หรือรหัสผ่านไม่ถูกต้อง."
          });
        }
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

  localProfile({
    commit
  }) {
    return new Promise((resolve, reject) => {
      Vue.http.get(process.env.BACKEND_URI + "/auth/local/profile").then(response => {
        console.log(response);
      });
    });
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
