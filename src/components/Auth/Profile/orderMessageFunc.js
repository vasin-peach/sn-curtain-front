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
        case 'wait_upload':
          return 'รอการอัพโหลดหลักฐาน'
        case 'wait_confirm':
          return 'รอการตรวจเช็คหลักฐาน'
        case 'order_wait':
          return 'รอการยืนยันรายการจากทางร้าน'
        case 'order_success':
          return 'รายการสำเร็จ'
      }
    }
  }
}

//
// ─── EXPORT ─────────────────────────────────────────────────────────────────────
//


module.exports = orderMessageFunc
