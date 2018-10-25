import Vue from "vue";
import "../../../lib/omise";

// console.log(process.env.OMISE_CLIENT);

// State
const state = {};

// Getters
const getters = {};

// Mutations
const mutations = {};

// Actions
const actions = {
  creditCreateToken({
    state,
    getters
  }, data) {
    return new Promise((resolve, reject) => {
      Omise.setPublicKey(process.env.OMISE_CLIENT);

      const card = {
        name: data.card_name,
        number: data.card_number.replace(/\s/g, ""),
        expiration_month: data.expires_date.split("/")[0],
        expiration_year: "20" + data.expires_date.split("/")[1],
        security_code: data.cvv
      };

      Omise.createToken("card", card, (statusCode, response) => {
        if (statusCode == 200) {
          const product = {
            email: getters.userData.email,
            product: localStorage.basket,
            discount: localStorage.discount,
            delivery: localStorage.delivery,
            card_token: response.id,
            card: response.card
          };

          // create request uri
          let urlRequest = process.env.BACKEND_URI + "/payment/charge";

          // call
          Vue.http.post(urlRequest, product).then(
            // response success
            response => {

              // check callback status
              if (response.body.status == 200) {

                // check error code
                let errorCode = response.body.data.failure_code;

                console.log(response.body);
                console.log(errorCode);

                if (!errorCode) {

                  // success
                  Vue.swal({
                    type: 'success',
                    title: 'ชำระเงินเสร็จสิ้น',
                    text: 'ท่านสามารถดูรายระเอียดรายได้ใน ข้อมูลส่วนตัว -> รายการ.'
                  });

                } else if (errorCode == 'invalid_security_code') {

                  // invalid_security_code
                  Vue.swal({
                    type: 'warning',
                    title: 'CVV ไม่ถูกต้อง',
                    text: 'ไม่สามารถชำระเงินได้ เนื่องจากรหัสความปลอดภัย (CVV) ไม่ถูกต้อง, หรือบัตรยังไม่ได้รับการอนุมัติ.'
                  });
                } else if (errorCode == 'payment_rejected') {

                  // payment_rejected
                  Vue.swal({
                    type: 'warning',
                    title: 'การชำระเงินถูกปฎิเสธโดยผู้ออกบัตร',
                    text: 'ไม่สามารถชำระเงินได้ เนื่องจากถูกปฎิเสธโดยผู้ออกบัตร, หรือผู้ซื้อ.'
                  });

                } else if (errorCode == 'insufficient_fund') {

                  // insufficient_fund
                  Vue.swal({
                    type: 'warning',
                    title: 'วงเงินภายในบัตรไม่เพียงพอ',
                    text: 'ไม่สามารถชำระเงินได้ เนื่องจากเงินไม่เพียงพอ, หรือวงเงินภายในบัตรไม่เพียงพอ.'
                  });

                } else if (errorCode == 'stolen_or_lost_card') {

                  // stolen_or_lost_card
                  Vue.swal({
                    type: 'warning',
                    title: 'ปฎิเสธการชำระเงิน',
                    text: 'ธุรกรรมนี้ได้ถูกปฎิเสธ เนื่องจากบัตรหายหรือถูกโจรกรรม.'
                  });

                } else if (errorCode == 'failed_processing') {

                  // payment_rejected
                  Vue.swal({
                    type: 'warning',
                    title: 'การดำเนินการไม่สำเร็จ',
                    text: 'การประมวลผลบัตรล้วเหลว กรุณาทำรายการใหม่อีกครั้ง'
                  });

                } else if (errorCode == 'failed_fraud_check') {

                  // failed_fraud_check
                  Vue.swal({
                    type: 'warning',
                    title: 'ปฎิเสธการชำระเงิน',
                    text: 'ธุรกรรมนี้ได้ถูกปฎิเสธ เนื่องจากบัตรไม่ผ่านการตรวจสอบระบบคัดกรองทุจริต (fraud check).'
                  });

                } else if (errorCode == 'invalid_account_number') {

                  // invalid_account_number
                  Vue.swal({
                    type: 'warning',
                    title: 'เลขบัตรไม่ถูกต้อง',
                    text: 'ไม่สามารถชำระเงินได้ เลขบัตรไม่ถูกต้อง กรุณาทำรายการใหม่อีกครั้ง.'
                  });

                }
              }
            },
            // response error
            error => {
              Vue.swal({
                type: 'error',
                title: 'ผิดพลาด',
                text: 'เกิดข้อผิดพลาดในการชำระเงิน กรุณาติดต่อเจ้าหน้าที่ผ่านแชท.'
              })
            }
          );
        }
      });
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
