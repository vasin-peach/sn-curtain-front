import Vue from 'vue';
import _ from 'lodash';

///
// Function
///
function createFilterFormat(data) {

  if (!data) return null;
  let response = null

  // make array unique
  response = Array.from(new Set(data))

  // create format of option
  response = response.map((item, key) => {
    return Object.assign({}, {
      text: item,
      value: item
    });
  });

  // add default option at begining
  response.unshift({
    text: "กรุณาเลือก",
    value: null
  });


  return response;
}


///
// State
///

const state = {
  store: null,
  storePopular: null,
  storeFilter: null,
  storeFilterCategory: null,
  storeFilterType: null,
  storeFilterNature: null,
  storeTemp: {}
}


///
// Getters
///
const getters = {
  storeData: (state) => {
    return state.store;
  },
  storePopularData: (state) => {
    return state.storePopular;
  },
  storeFilterData: (state) => {
    return state.storeFilter;
  },
  storeTempData: (state) => {
    return state.storeTemp;
  },
  storeFilterCategoryData: (state) => {
    return state.storeFilterCategory;
  },
  storeFilterTypeData: (state) => {
    return state.storeFilterType;
  },
  storeFilterNatureData: (state) => {
    return state.storeFilterNature;
  },
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
  },
  storeCategoryUpdate(state, filter) {

    // get category;
    let category = state.storeFilter.map(data => {
      return data.val;
    });

    // set category options
    state.storeFilterCategory = createFilterFormat(category);
  },
  storeTypeUpdate(state, filter) {

    // check category is empty
    if (!filter || !filter.category) {
      return state.storeFilterType = [{
        text: "กรุณาเลือกประเภท",
        value: null
      }]
    }

    // filter type by category
    let type = state.storeFilter.filter(data => {
      return data.val == filter.category;
    });

    // if (category.indexOf(filter) < 0) return false;

    // get type;
    type = type.map(data => {
      return data.type.val;
    })

    // set type options
    state.storeFilterType = createFilterFormat(type);
  },
  storeNatureUpdate(state, filter) {
    // check category is empty
    if (!filter || !filter.category || !filter.type) {
      return state.storeFilterNature = [{
        text: "กรุณาเลือกชนิด",
        value: null
      }]
    }

    // filter type by category
    let nature = state.storeFilter.filter(data => {
      return data.val == filter.category && data.type.val == filter.type;
    });


    // if (category.indexOf(filter) < 0) return false;

    // get nature;
    nature = nature.map(data => {
      return data.type.nature;
    })

    var natureTemp = []

    for (let item of nature[0]) {
      natureTemp.push(item.val);
    }

    // set nature options
    state.storeFilterNature = createFilterFormat(natureTemp);
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
      var search = payload.search || " ";
      var page = payload.page || 1;
      var category = payload.category || null;
      var type = payload.type || null;
      var nature = payload.nature || null;

      var uriRequest = "/product/get/" +
        (search ? search + "/" : " /") +
        (page ? page + "/" : " /") +
        (category ? category + "/" : " /") +
        (type ? type + "/" : " /") +
        (nature ? nature : " ");

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

        const item = response.data.data;

        // // create new object format for select options
        // response.data.data.type.unshift({
        //   value: null,
        //   text: 'กรุณาเลือกประเภทผ้าม่าน'
        // });
        // response.data.data.fabric.unshift({
        //   value: null,
        //   text: 'กรุณาเลือกคุณภาพของผ้า'
        // });
        // response.data.data.color.unshift({
        //   value: null,
        //   text: 'กรุณาเลือกสีของผ้าม่าน'
        // });

        commit('storeFilterUpdate', item);
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
