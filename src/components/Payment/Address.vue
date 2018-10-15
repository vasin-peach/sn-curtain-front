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
          <div class="col">
            <div class="input-group">
              <b-form-group label="รหัสไปรษณีย์">
                <b-form-input :state="!errors.has('zip')" v-validate="{ required: true, regex: /^(\d{5})?$/ }" name="zip" v-model="form.zip" type="text" placeholder="รหัสไปรษณีย์" maxlength="5"></b-form-input>
                <b-form-invalid-feedback v-show="errors.has('zip')">
                  {{ errors.first('zip') }}
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
export default {
  name: "payment_address",
  data() {
    return {
        form: {
          first_name: "",
          last_name: ""
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
  }
};
</script>

<style>
</style>
