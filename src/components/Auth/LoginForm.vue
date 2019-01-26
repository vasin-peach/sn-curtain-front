<template>
  <div class="login-form">
    <div
      class="bg-fade"
      @click="popupAuthUpdate(false)"
    ></div>
    <div class="login-wrapper">
      <div
        class="close"
        @click="popupAuthUpdate(false)"
      >
        <font-awesome-icon
          icon="times"
          aria-hidden="true"
        />
      </div>
      <div class="login-head">
        <div class="login-head-wrapper">
          <img src="/static/images/brand-no-text.svg">
        </div>
      </div>
      <div class="login-container">
        <form @submit.prevent="validateLogin">
          <div class="login-body row">
            <!-- <div class="col-12">
              <div class="input-group">
                <b-form-group label="อีเมลล์">
                  <b-form-input :state="!errors.has('email')" v-validate="'required|min:4|email'" name="email" v-model="form.email" type="text" placeholder="Email"></b-form-input>
                  <b-form-invalid-feedback v-show="errors.has('email')">
                    {{ errors.first('email') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>
            </div>
            <div class="col-12">
              <div class="input-group">
                <b-form-group label="รหัสผ่าน">
                  <b-form-input :state="!errors.has('password')" v-validate="'required|min:4'" name="password" v-model="form.password" type="password" placeholder="Password"></b-form-input>
                  <b-form-invalid-feedback v-show="errors.has('password')">
                    {{ errors.first('password') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>
            </div>
            <div class="col-12">
              <button type="submit" class="button-login">
                เข้าสู่ระบบ
              </button>
            </div> -->
            <div class="col-6 pr-1">
              <a :href="keys.BACKEND_URI + '/auth/facebook/login'">
                <div class="button-facebook">
                  <font-awesome-icon
                    :icon="['fab', 'facebook-square']"
                    aria-hidden="true"
                  />
                </div>
              </a>
            </div>
            <div class="col-6 pl-1">
              <a :href="keys.BACKEND_URI + '/auth/google/login'">
                <div class="button-google">
                  <font-awesome-icon
                    :icon="['fab', 'google-plus-square']"
                    aria-hidden="true"
                  />
                </div>
              </a>
            </div>
            <!-- <div class="col-12">
              <div class="button-register">
                <span>ยังไม่มีบัญชี?</span>
                <router-link :to="{ name: 'Register' }">
                  <span>สมัครสมาชิก</span>
                </router-link>
              </div>
            </div> -->
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  name: "LoginForm",
  data() {
    return {
      keys: process.env,
      form: {
        email: "",
        password: ""
      }
    };
  },
  mounted() {},
  methods: {
    ...mapMutations(["popupAuthUpdate"]),
    ...mapActions(["localLogin"]),
    validateLogin() {
      this.$validator.validateAll().then(result => {
        if (result) {
          var payload = {
            username: this.form.email,
            password: this.form.password
          };
          this.localLogin(payload);
        }
      });
    }
  },
  computed: {},
  watch: {}
};
</script>

<style>
</style>
