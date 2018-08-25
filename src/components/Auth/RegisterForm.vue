<template>
  <div class="register-form">
    <div class="bg-fade"></div>
    <div class="register-wrapper">
      <div class="register-head">
        <div class="register-head-wrapper">
          <img src="/static/images/brand-no-text.svg">
        </div>
      </div>
      <div class="register-container">
        <form @submit.prevent="validateRegister">
          <div class="register-body row">
            <div class="col-12">
              <div class="input-group">
                <b-form-group label="ชื่อ - นามสกุล">
                  <b-form-input :state="!errors.has('full_name')" v-validate="'required|min:4'" name="full_name" v-model="form.full_name" type="text" placeholder="Full Name"></b-form-input>
                  <b-form-invalid-feedback v-show="errors.has('full_name')">
                    {{ errors.first('full_name') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>
            </div>
            <div class="col-12">
              <div class="input-group">
                <b-form-group label="อีเมลล์">
                  <b-form-input :state="!errors.has('email')" v-validate="'required|email|min:4'" name="email" v-model="form.email" type="email" placeholder="Email"></b-form-input>
                  <b-form-invalid-feedback v-show="errors.has('email')">
                    {{ errors.first('email') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>
            </div>
            <div class="col-12">
              <div class="input-group">
                <b-form-group label="รหัสผ่าน">
                  <b-form-input :state="!errors.has('password')" v-validate="'required|min:4'" ref="password" name="password" v-model="form.password" type="password" placeholder="Password"></b-form-input>
                  <b-form-invalid-feedback v-show="errors.has('password')">
                    {{ errors.first('password') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>
            </div>
            <div class="col-12">
              <div class="input-group">
                <b-form-group label="ยืนยัน รหัสผ่าน">
                  <b-form-input :state="!errors.has('confirm_password')" v-validate="'required|min:4|confirmed:password'" name="confirm_password" v-model="form.confirm_password" type="password" placeholder="Confirm Password"></b-form-input>
                  <b-form-invalid-feedback v-show="errors.has('confirm_password')">
                    {{ errors.first('confirm_password') }}
                  </b-form-invalid-feedback>
                </b-form-group>

              </div>
            </div>
            <div class="col-12">
              <button type="submit" class="button-login">
                สมัครสมาชิก
              </button>
            </div>
            <div class="col-12">
              <div class="button-register">
                <span>มีบัญชีอยู่แล้ว?</span>
                <router-link :to="{ name: 'Login' }">
                  <span>เข้าสู่ระบบ</span>
                </router-link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'LoginForm',
  data() {
    return {
      form: {
        full_name: "",
        email: "",
        password: "",
        confirm_password: ""
      }
    }
  },
  mounted() {
    this.localProfile();
  },
  methods: {
    ...mapActions(['localRegister', 'localProfile']),
    validateRegister() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          var payload = {
            name: this.form.full_name,
            email: this.form.email,
            password: this.form.password,
          }
          this.localRegister(payload)
        }
      })
    }
  },
  computed: {

  },
  watch: {
    
  }
}
</script>

<style>
</style>
