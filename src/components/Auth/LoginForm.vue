<template>
  <div class="login-form">
    <div class="bg-fade"></div>
    <div class="login-wrapper">
      <div class="login-head">
        <div class="login-head-wrapper">
          <img src="/static/images/brand-no-text.svg">
        </div>
      </div>
      <div class="login-container">
        <div class="login-body row">
          <div class="col-12">
            <div class="input-group">
              <!-- <span class="input-group-append">
                <div class="input-group-text border-right-0 border">
                  <font-awesome-icon icon="user-circle" aria-hidden="true" />
                </div>
              </span> -->
              <b-form-group label="ชื่อผู้ใช้ หรือ อีเมลล์">
                <b-form-input v-model="username" type="text" placeholder="Email"></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="col-12">
            <div class="input-group">
              <b-form-group label="รหัสผ่าน">
                <b-form-input v-model="password" type="password" placeholder="Password"></b-form-input>
              </b-form-group>
              <!-- <span class="input-group-append">
                <div class="input-group-text border-right-0 border">
                  <font-awesome-icon icon="lock" aria-hidden="true" />
                </div>
              </span> -->
            </div>
          </div>
          <div class="col-12">
            <div class="button-login">
              เข้าสู่ระบบ
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      username: null,
      password: null
    }
  },
  mounted() {

  },
  methods: {

  },
  computed: {

  },
  watch: {
    
  }
}
</script>

<style>
</style>
