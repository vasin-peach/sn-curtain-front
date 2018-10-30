<template>
  <div class="payment_credit">
    <div class="wrapper-header">
      <div class="back">
        <router-link :to="{ name: 'Payment'}">
          <font-awesome-icon icon="chevron-left" aria-hidden="true" /> <span>ย้อนกลับ</span>
        </router-link>
      </div>
      <div class="title">
        <font-awesome-icon icon="credit-card" aria-hidden="true" /> ชำระด้วย เครดิต/เดบิต</div>
    </div>
    <hr>
    <form @submit.prevent="validateCredit">
      <transition name="fade" mode="out-in">
        <div v-if="loadingState">
          <loading :style="{height: loadingHeight - 20 + 'px'}"></loading>
        </div>
        <div class="credit-body" ref="credit_body" key="credit-body" v-else>
          <div class="row credit-card">
            <div class="col">
              <img src="../../assets/images/credit/visa.png" :class="{ 'active': card_type == 'visa'}">
              <!-- <span class="d-none d-sm-block" v-if="card_type == 'visa'">VISA</span> -->
            </div>
            <div class="col">
              <img src="../../assets/images/credit/jcb.png" :class="{ 'active': card_type == 'jcb'}">
              <!-- <span class="d-none d-sm-block" v-if="card_type == 'jcb'">JCB</span> -->
            </div>
            <div class="col">
              <img src="../../assets/images/credit/mastercard.png" :class="{ 'active': card_type == 'mastercard'}">
              <!-- <span class="d-none d-sm-block" v-if="card_type == 'mastercard'">MASTERCARD</span> -->
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="input-group">
                <b-form-group label="CARDNUMBER">
                  <b-form-input :state=" !errors.has('card_number')" id="card_number" name="card_number" v-validate="{required: true, min:19, card: true}" v-model="form.card_number" type="text" placeholder="เลขบัตร" v-mask="'#### #### #### ####'"></b-form-input>
                  <b-form-invalid-feedback v-show="errors.has('card_number')">
                    {{ errors.first('card_number') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="input-group">
                <b-form-group label="CARDHOLDERS NAME">
                  <b-form-input :state="!errors.has('card_name')" name="card_name" v-validate="'required|min:3'" v-model="form.card_name" type="text" placeholder="ชื่อผู้ถือบัตร"></b-form-input>
                  <b-form-invalid-feedback v-show="errors.has('card_name')">
                    {{ errors.first('card_name') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-sm-12 col-md-6">
              <div class="input-group">
                <b-form-group label="EXPIRY DATE">
                  <b-form-input :state="!errors.has('expires_date')" v-validate="'required|min:5'" name="expires_date" v-model="form.expires_date" type="text" placeholder="วันหมดอายุ" v-mask="'##/##'"></b-form-input>
                  <b-form-invalid-feedback v-show="errors.has('expires_date')">
                    {{ errors.first('expires_date') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>
            </div>
            <div class="col-12 col-sm-12 col-md-6">
              <div class="input-group">
                <b-form-group label="CVV">
                  <b-form-input :state="!errors.has('cvv')" v-validate="'required|min:3'" name="cvv" v-model="form.cvv" type="text" placeholder="รหัสลับ" v-mask="'###'"></b-form-input>
                  <b-form-invalid-feedback v-show="errors.has('cvv')">
                    {{ errors.first('cvv') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <hr>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <button type="submit" class="button w-100 p-3">
                ชำระเงิน
                <font-awesome-icon icon="lock" aria-hidden="true" class="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </transition>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mask } from "vue-the-mask";
import { ErrorBag } from "vee-validate";
import Loading from '../Loading';
import _ from "lodash";
export default {
  name: "payment_credit",
  data() {
    return {
      form: {
        card_number: 4532156407749521,
        card_name: "Vasin Sermsampan",
        expires_date: "07/21",
        cvv: "121"
      },
      card_type: null,
      loadingHeight: 0,
      loadingState: false,
    };
  },
  watch: {
    "form.card_number": function(data) {
      // remove space from card_number
      let card_number = data.replace(/ /g, "");

      // check regex card type

      if (/^4[0-9]{6,}$/.test(card_number)) {
        // check card is visa
        this.card_type = "visa";
      } else if (
        // check card is mastercard
        /^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/.test(
          card_number
        )
      ) {
        this.card_type = "mastercard";
      } else if (/^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/.test(card_number)) {
        // check card is jcb
        this.card_type = "jcb";
      } else {
        this.card_type = null;
      }
    }
  },
  methods: {
    ...mapActions(['creditCreateToken', 'getOrder', 'shoppingClear']),
    validateCredit() {

      this.$validator.validateAll().then(result => { // validate all input

       
        if (!result) return false;  // exist if validate is false

        // enable loading
        this.loadingState = true;
        
        this.creditCreateToken(this.form).then((response) => { // call function in state

          // disable loading
          this.loadingState = false

          // remove all history about transaction
          this.shoppingClear().then(() => {

            // navigation to bill
            this.$router.push({ name: 'Bill_View', params: {id: response.data._id} });
          })


        }).catch(() => {

          // disable loading
          this.loadingState = false

        });

      });
      
    }
  },
  directives: { mask },
  components: { Loading },
  mounted() {

    // get height from credit_body
    this.loadingHeight = this.$refs.credit_body.clientHeight;
  }
};
</script>

<style>
</style>