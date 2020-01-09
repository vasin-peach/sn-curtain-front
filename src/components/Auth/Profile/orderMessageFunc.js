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
          return 'กำลังดำเนินการ'
        case 'success':
          return 'รายการเสร็จสิ้น'
        case 'cancel':
          return 'รายการถูกยกเลิก'
      }
    }
  },
}

//
// ─── EXPORT ─────────────────────────────────────────────────────────────────────
//

module.exports = orderMessageFunc
