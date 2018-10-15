<template>
  <div class="payment_address">
    <form @submit.prevent="validateAddress">
      <div class="address-body">
        <div class="row">
          <div class="col-12 col-sm-12 col-md-6">
            <div class="input-group">
              <b-form-group label="ชื่อต้น">
                <b-form-input :state="!errors.has('first_name')" v-validate="'required|min:4'" name="first_name" v-model="form.first_name" type="text" placeholder="ชื่อต้น"></b-form-input>
                <b-form-invalid-feedback v-show="errors.has('first_name')">
                  {{ errors.first('first_name') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
          </div>
          <div class="col">
            <div class="input-group">
              <b-form-group label="นามสกุล">
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
                <b-form-input :state="!errors.has('house_number')" v-validate="{ required: true, min: 3 }" name="house_number" v-model="form.house_number" type="text" placeholder="เช่น 38/5, 24/589" maxlength="10"></b-form-input>
                <b-form-invalid-feedback v-show="errors.has('house_number')">
                  {{ errors.first('house_number') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
          </div>
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
            <div class="input-group">
              <b-form-group label="แขวง/ตำบล">
                <vue-bootstrap-typeahead v-model="form.district" v-if="autoComplete.district" :data="autoComplete.district" :maxMatches="5" name="district" type="text" placeholder="แขวง/ตำบล"></vue-bootstrap-typeahead>
                <b-form-input disabled placeholder="โปรดรอ" v-else></b-form-input>
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
                <vue-bootstrap-typeahead v-model="form.amphoe" v-if="autoComplete.amphoe" :data="autoComplete.amphoe" :maxMatches="5" name="amphoe" type="text" placeholder="เขต/อำเภอ" required></vue-bootstrap-typeahead>
                <b-form-input disabled placeholder="โปรดรอ" v-else></b-form-input>
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
              <b-form-group label="จังหวัด">
                <vue-bootstrap-typeahead v-model="form.province" v-if="autoComplete.province" :data="autoComplete.province" :maxMatches="5" name="province" type="text" placeholder="จังหวัด" required></vue-bootstrap-typeahead>
                <b-form-input disabled placeholder="โปรดรอ" v-else></b-form-input>
                <b-form-invalid-feedback v-show="errors.has('province')">
                  {{ errors.first('province') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
import thailand from '@data/thailand.raw.json';
import _ from 'lodash';
export default {
  name: "payment_address",
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        amphoe: "",
        district: "",
      },
      autoComplete: {
        amphoe: "",
        district: "",
      }
    }
  },
  methods: {
    validateAddress() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          console.log('hi');
        }
      })
    }
  },
  mounted() {
    this.autoComplete.amphoe = _.uniq(thailand.map(item => item.amphoe));
    this.autoComplete.district = _.uniq(thailand.map(item => item.district));
    this.autoComplete.province = _.uniq(thailand.map(item => item.province));

  },
  components: {
     VueBootstrapTypeahead
  }
};
</script>

<style>
</style>
