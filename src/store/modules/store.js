import Vue from 'vue';
import _ from 'lodash'

///
// State
///

const state = {
  store: null,
  storePopular: null,
  storeFilter: null,
  storeTemp: {}
}


///
// Getters
///
const getters = {
  storeData: (state) => {
    return state.store
  },
  storePopularData: (state) => {
    return state.storePopular
  },
  storeFilterData: (state) => {
    return state.storeFilter
  },
  storeTempData: (state) => {
    return state.storeTemp
  }
}


///
// Mutations
///
const mutations = {
  storeUpdate(state, data) {
    state.store = data;
  },
  storePopularUpdate(state, data) {
    data ? state.storePopular = data : false;
  },
  storeFilterUpdate(state, data) {
    data ? state.storeFilter = data : false;
  },
  storeCountUpdate(state, data) {
    data ? state.storeCount = data : false;
  },
  storeTempUpdate(state, data) {
    switch (data.type) {
      case 'search':
        state.storeTemp.search = data.data
        break;
      case 'page':
        state.storeTemp.page = data.data
        break;
      case 'color':
        state.storeTemp.color = data.data
        break;
      case 'type':
        state.storeTemp.type = data.data
        break;
      case 'fabric':
        state.storeTemp.fabric = data.data
        break;
    }
  }
}

///
// Actions
///
const actions = {
  storeGet({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {

      // check payload 
      if (!payload) return reject('payload empty');

      // store loading
      commit('loadingUpdate', {
        type: 'store',
        value: true
      });
      var search = payload.search || " "
      var page = payload.page || 1
      var fabric = payload.fabric || null
      var color = payload.color || null
      var type = payload.type || null

      var uriRequest = "/product/get/" +
        (search ? search + "/" : " /") +
        (page ? page + "/" : " /") +
        (fabric ? fabric + "/" : " /") +
        (color ? color + "/" : " /") +
        (type ? type : " ")

      // request
      Vue.http.get(process.env.BACKEND_URI + uriRequest).then(response => {
        commit('storeUpdate', response.data.data);
        commit('loadingUpdate', {
          type: 'store',
          value: false
        })
        return resolve(response.data);
      }, error => {
        switch (error.status) {
          case 0:
            commit('loadingUpdate', {
              type: 'store',
              value: 'fail',
            })
            break;
          case 404:
            commit('loadingUpdate', {
              type: 'store',
              value: 'notfound',
            })
        }
        // return reject(error);
      })
    })
  },
  storeFilterGet({
    commit
  }) {
    return new Promise((resolve, reject) => {

      // store loading
      commit('loadingUpdate', {
        type: 'storePopular',
        value: true
      });

      // request
      Vue.http.get(process.env.BACKEND_URI + '/product/category').then(response => {


        // create new object format for select options
        response.data.data.type.unshift({
          value: null,
          text: 'กรุณาเลือกประเภทผ้าม่าน'
        });
        response.data.data.fabric.unshift({
          value: null,
          text: 'กรุณาเลือกคุณภาพของผ้า'
        });
        response.data.data.color.unshift({
          value: null,
          text: 'กรุณาเลือกสีของผ้าม่าน'
        });

        commit('storeFilterUpdate', response.data.data)
        commit('loadingUpdate', {
          type: 'storePopular',
          value: false
        })
      })
    })
  },
  storePopularGet({
    commit
  }) {
    return new Promise((resolve, reject) => {
      // store loading
      commit('loadingUpdate', {
        type: 'storePopular',
        value: true
      });

      // request
      Vue.http.get(process.env.BACKEND_URI + '/product/popular').then(response => {
        commit('storePopularUpdate', response.data.data);
        commit('loadingUpdate', {
          type: 'storePopular',
          value: false
        })
        return resolve(response.data);
      }, error => {
        switch (error.status) {
          case 0:
            commit('loadingUpdate', {
              type: 'store',
              value: 'fail',
            })
            break;
          case 404:
            commit('loadingUpdate', {
              type: 'store',
              value: 'notfound',
            })
        }
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
