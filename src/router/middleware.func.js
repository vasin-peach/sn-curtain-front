//
// ─── IMPORT ─────────────────────────────────────────────────────────────────────
//

import store from '../store/main';
import isEmpty from 'lodash.isempty';

//
// ─── FUNCTION ───────────────────────────────────────────────────────────────────
//

const middlewareFunction = {

  async checkPermission(level) {

    /**
     * @param level permission level is you want to check
     */

    return new Promise(async (resolve, reject) => {


      // ! Validate
      if (!level) return reject('bad param, param `level` is empty.');
      if (isNaN(level)) return reject('bad param, param `level` must be number');

      // ! Call Func
      store.dispatch('getPermission').then(result => { // success

        // check permission level
        if (result.data.data >= level) return resolve(true)
        else return reject(false);

      }, error => { // error
        return reject(false);
      })
    })

  }

}

//
// ─── EXPORT ─────────────────────────────────────────────────────────────────────
//

export default middlewareFunction;
