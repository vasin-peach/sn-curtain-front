// // ? GETTERS
// const getters = {
//   getState(state) {
//     return (target) => {

//       /**
//        * @param state OBJECT - state object
//        * @param target STRING - state name
//        */

//       console.log(state.membership);

//       if (!target) return false;
//       return state[target] || false;
//     }
//   }
// }

// // ? MUTATIONS
// const mutations = {
//   updateState(state, data, target) {

//     /**
//      * @param state OBJECT - state object
//      * @param data ANY - set data to state
//      * @param target STRING - state name
//      */

//     if (!data || !target) return false;
//     try {
//       state[target] = data || false
//     } catch (err) {
//       return false
//     }

//   }
// }

// export default {
//   getters,
//   mutations
// }
