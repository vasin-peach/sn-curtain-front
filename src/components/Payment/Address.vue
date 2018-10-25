<template>
  <div class="payment_address">
    <transition name="fade" mode="out-in">
      <div class="popup-container" v-show="popupPaymentOptionsData">
        <options class="float"></options>
      </div>
    </transition>
    <div class="wrapper-header">
      <div class="back">
        <router-link :to="{ name: 'Basket'}">
          <font-awesome-icon icon="chevron-left" aria-hidden="true" /> <span>ย้อนกลับ</span>
        </router-link>
      </div>
      <div class="title">
        <font-awesome-icon icon="map-marked-alt" aria-hidden="true" /> สถานที่ส่ง</div>
    </div>
    <hr>
    <form @submit.prevent="validateAddress">
      <div class="address-body">
        <div class="row">
          <div class="col-12 col-sm-12 col-md-6">
            <div class="input-group">
              <b-form-group label="ชื่อต้น (ภาษาไทย)">
                <b-form-input :state="!errors.has('first_name')" v-validate="'required|min:4'" name="first_name" v-model="form.first_name" type="text" placeholder="ชื่อต้น"></b-form-input>
                <b-form-invalid-feedback v-show="errors.has('first_name')">
                  {{ errors.first('first_name') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
          </div>
          <div class="col">
            <div class="input-group">
              <b-form-group label="นามสกุล (ภาษาไทย)">
                <b-form-input :state="!errors.has('last_name')" v-validate="'required|min:4'" name="last_name" v-model="form.last_name" type="text" placeholder="ชื่อต้น"></b-form-input>
                <b-form-invalid-feedback v-show="errors.has('last_name')">
                  {{ errors.first('last_name') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="input-group">
              <b-form-group label="เบอร์โทรศัพท์">
                <b-form-input :state="!errors.has('tel')" v-validate="{ required: true, min:9, max: 10, numeric: true  }" name="tel" v-model="form.tel" type="text" placeholder="เบอร์โทรศัพท์" maxlength="10"></b-form-input>
                <b-form-invalid-feedback v-show="errors.has('tel')">
                  {{ errors.first('tel') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <hr>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-12 col-md-6">
            <div class="input-group">
              <b-form-group label="บ้านเลขที่">
                <b-form-input :state="!errors.has('house_no')" v-validate="{ required: true, min: 3 }" name="house_no" v-model="form.house_no" type="text" placeholder="เช่น 38/5, 24/589" maxlength="10"></b-form-input>
                <b-form-invalid-feedback v-show="errors.has('house_no')">
                  {{ errors.first('house_no') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
          </div>
          <div class="col">
            <div class="input-group">
              <b-form-group label="หมู่บ้าน">
                <b-form-input :state="!errors.has('village_no')" v-validate="{ required: true, }" name="village_no" v-model="form.village_no" type="text" placeholder="หมู่บ้าน"></b-form-input>
                <b-form-invalid-feedback v-show="errors.has('village_no')">
                  {{ errors.first('village_no') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="input-group">
              <b-form-group label="แขวง/ตำบล">
                <b-form-input :state="!errors.has('district')" v-validate="{ required: true, }" name="district" v-model="form.district" type="text" placeholder="แขวง/ตำบล" maxlength="5"></b-form-input>
                <b-form-invalid-feedback v-show="errors.has('district')">
                  {{ errors.first('district') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="input-group">
              <b-form-group label="เขต/อำเภอ">
                <b-form-input :state="!errors.has('amphoe')" v-validate="{ required: true }" name="amphoe" v-model="form.amphoe" type="text" placeholder="เขต/อำเภอ"></b-form-input>
                <b-form-invalid-feedback v-show="errors.has('amphoe')">
                  {{ errors.first('amphoe') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="input-group">
              <b-form-group label="ถนน">
                <b-form-input :state="!errors.has('road')" v-validate="{ required: true }" name="road" v-model="form.road" type="text" placeholder="ถนน"></b-form-input>
                <b-form-invalid-feedback v-show="errors.has('road')">
                  {{ errors.first('road') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="input-group">
              <b-form-group label="จังหวัด">
                <b-form-input :state="!errors.has('province')" v-validate="{ required: true }" name="province" v-model="form.province" type="text" placeholder="จังหวัด"></b-form-input>
                <b-form-invalid-feedback v-show="errors.has('province')">
                  {{ errors.first('province') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="input-group">
              <b-form-group label="รหัสไปรษณีย์">
                <b-form-input :state="!errors.has('zip')" v-validate="{ required: true, regex: /^(\d{5})?$/ }" name="zip" v-model="form.zip" type="text" placeholder="เช่น 10510" maxlength="5"></b-form-input>
                <b-form-invalid-feedback v-show="errors.has('zip')">
                  {{ errors.first('zip') }}
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
        <div class="row">
          <div class="col">
            <div class="input-group">
              <b-form-checkbox v-model="form.save" :value="true" :unchecked-value="false"></b-form-checkbox>
              <span>ใช้ที่อยู่นี้เป็นที่อยู่หลัก</span>
            </div>
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
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
// import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
// import thailand from "@data/thailand.raw.json";
import _ from "lodash";
import Options from "./Options";
export default {
  name: "payment_address",
  data() {
    return {
      form: {
        first_name: null,
        last_name: null,
        tel: null,
        house_no: null,
        village_no: null,
        amphoe: null,
        district: null,
        road: null,
        province: null,
        zip: null,
        save: false
      }
    };
  },
  methods: {
    ...mapActions(["profileAddressUpdate"]),
    ...mapMutations(["popupPaymentOptionsUpdate"]),
    validateAddress() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          // empty text array
          var errorText = [];

          // get error message from validator and push to error text
          for (let key in this.errors.items) {
            let item = this.errors.items[key];
            errorText.push(item.msg);
          }

          // remove duplicate error and combind array to word
          errorText = _.uniq(errorText).join("<br>");

          // alert error
          this.$swal({
            type: "warning",
            title: "ที่อยู่ไม่ถูกต้อง",
            html: errorText
          });
        } else {
          // if user save this address
          if (this.form.save) {
            // save address to user
            this.profileAddressUpdate(this.form);
          }

          // update address to cookie
          this.$cookie.set("paymentAddress", JSON.stringify(this.form), {
            expireds: "1h"
          });

          // show choose payment option
          this.popupPaymentOptionsUpdate(true);
        }
      });
    },

    updateForm() {
      this.form.first_name = this.userData.name
        ? this.userData.name.first_name
        : null || null;
      this.form.last_name = this.userData.name
        ? this.userData.name.last_name
        : null || null;
      this.form.tel = this.userData.tel || null;
      // check user has address object
      if (this.userData.address) {
        this.form.house_no = this.userData.address.house_no || null;
        this.form.village_no = this.userData.address.village_no || null;
        this.form.amphoe = this.userData.address.amphoe || null;
        this.form.district = this.userData.address.district || null;
        this.form.road = this.userData.address.road || null;
        this.form.province = this.userData.address.province || null;
        this.form.zip = this.userData.address.zip || null;
      }
    }
  },
  mounted() {
    // call update form
    this.updateForm();
  },
  computed: {
    ...mapGetters(["popupPaymentOptionsData", "userData"])
  },
  components: {
    Options
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
