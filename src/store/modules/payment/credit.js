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

        if (statusCode == 200) { // check request card token status is 200

          const product = { // declear production payload
            email: getters.userData.email,
            product: localStorage.basket,
            discount: localStorage.discount,
            delivery: localStorage.delivery,
            card_token: response.id,
            card: response.card
          };

          // create request uri
          let urlRequest = process.env.BACKEND_URI + "/payment/charge";

          Vue.http.post(urlRequest, product).then( // call

            response => { // response success


              if (response.body.status == 200) { // check response from backend status is 200

                // check error code
                let errorCode = response.body.data.failure_code;

                if (!errorCode) { // success

                  Vue.swal({
                    type: 'success',
                    title: 'ชำระเงินเสร็จสิ้น',
                    text: 'ท่านสามารถดูรายระเอียดรายได้ใน ข้อมูลส่วนตัว -> รายการ.'
                  });

                } else if (errorCode == 'invalid_security_code') { // invalid_security_code

                  Vue.swal({
                    type: 'warning',
                    title: 'CVV ไม่ถูกต้อง',
                    text: 'ไม่สามารถชำระเงินได้ เนื่องจากรหัสความปลอดภัย (CVV) ไม่ถูกต้อง, หรือบัตรยังไม่ได้รับการอนุมัติ.'
                  });

                } else if (errorCode == 'payment_rejected') { // payment_rejected

                  Vue.swal({
                    type: 'warning',
                    title: 'การชำระเงินถูกปฎิเสธโดยผู้ออกบัตร',
                    text: 'ไม่สามารถชำระเงินได้ เนื่องจากถูกปฎิเสธโดยผู้ออกบัตร, หรือผู้ซื้อ.'
                  });

                } else if (errorCode == 'insufficient_fund') { // insufficient_fund

                  Vue.swal({
                    type: 'warning',
                    title: 'วงเงินภายในบัตรไม่เพียงพอ',
                    text: 'ไม่สามารถชำระเงินได้ เนื่องจากเงินไม่เพียงพอ, หรือวงเงินภายในบัตรไม่เพียงพอ.'
                  });

                } else if (errorCode == 'stolen_or_lost_card') { // stolen_or_lost_card

                  Vue.swal({
                    type: 'warning',
                    title: 'ปฎิเสธการชำระเงิน',
                    text: 'ธุรกรรมนี้ได้ถูกปฎิเสธ เนื่องจากบัตรหายหรือถูกโจรกรรม.'
                  });

                } else if (errorCode == 'failed_processing') { // payment_rejected

                  Vue.swal({
                    type: 'warning',
                    title: 'การดำเนินการไม่สำเร็จ',
                    text: 'การประมวลผลบัตรล้วเหลว กรุณาทำรายการใหม่อีกครั้ง'
                  });

                } else if (errorCode == 'failed_fraud_check') { // failed_fraud_check

                  Vue.swal({
                    type: 'warning',
                    title: 'ปฎิเสธการชำระเงิน',
                    text: 'ธุรกรรมนี้ได้ถูกปฎิเสธ เนื่องจากบัตรไม่ผ่านการตรวจสอบระบบคัดกรองทุจริต (fraud check).'
                  });

                } else if (errorCode == 'invalid_account_number') { // invalid_account_number

                  Vue.swal({
                    type: 'warning',
                    title: 'เลขบัตรไม่ถูกต้อง',
                    text: 'ไม่สามารถชำระเงินได้ เลขบัตรไม่ถูกต้อง กรุณาทำรายการใหม่อีกครั้ง.'
                  });

                }

              } else { // if response from backend status is not 200
                Vue.swal({
                  type: 'error',
                  title: 'ผิดพลาด',
                  text: 'เกิดข้อผิดพลาดในการชำระเงิน กรุณาติดต่อเจ้าหน้าที่ผ่านแชท.'
                });
              }
            }, // response succes block end.

            // response error
            () => {
              Vue.swal({
                type: 'error',
                title: 'ผิดพลาด',
                text: 'เกิดข้อผิดพลาดในการชำระเงิน กรุณาติดต่อเจ้าหน้าที่ผ่านแชท.'
              });
            }

          ); // http request block end.

        } else if (statusCode == 400) { // if request card token status is 400.

          if (response.code == 'invalid_card') { // invalid_card
            Vue.swal({
              type: 'warning',
              title: 'เลขบัตรไม่ถูกต้อง',
              text: 'ไม่สามารถชำระเงินได้ เลขบัตรไม่ถูกต้อง กรุณาทำรายการใหม่อีกครั้ง.'
            });
          }

        } else { // other condition idk lol.

          Vue.swal({
            type: 'warning',
            title: 'เลขบัตรไม่ถูกต้อง',
            text: 'ไม่สามารถชำระเงินได้ เลขบัตรไม่ถูกต้อง กรุณาทำรายการใหม่อีกครั้ง.'
          });

        } // condition response status block end.

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
