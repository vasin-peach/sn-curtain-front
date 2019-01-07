//
// ─── FUNCTION ───────────────────────────────────────────────────────────────────
//

const orderMessageFunc = {

  // ? get message by order status
  getMessage(status) {

    /**
     * @param status STRING - order status
     */

    // * Validate
    if (status) {
      // * Switch case
      switch (status) {
        case 'evidence':
          return 'รอยืนยันหลักฐานการโอน'
        case 'confirm':
          return 'รอยืนยันรายการ เพื่อดำเนินการ'
        case 'success':
          return 'รายการสำเร็จ'
      }
    }
  }
}

//
// ─── EXPORT ─────────────────────────────────────────────────────────────────────
//


module.exports = orderMessageFunc
