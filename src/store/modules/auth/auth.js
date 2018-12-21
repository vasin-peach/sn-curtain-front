import Vue from 'vue';
import router from '../../../router';
import _ from 'lodash';


const state = {
  popupAuth: false,
  user: null
}

const getters = {
  popupAuthData: state => {
    return state.popupAuth
  },
  userData: state => {
    return state.user
  },
}

const mutations = {
  userUpdate(state, data) {
    state.user = data;
  },
  popupAuthUpdate(state, data) {
    state.popupAuth = data || false;
  }
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
            name: 'Profile'
          })
        })
      }, error => {
        if (error.status == 500 || error.status == 401) {
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

  getPermission() {
    return new Promise((resolve, reject) => {
      Vue.http.get(process.env.BACKEND_URI + "/permission").then(response => {
        return resolve(response);
      }, error => {
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
