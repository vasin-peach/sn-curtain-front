<template>
  <div class="profile-me">
    <div class="profile-me-container">
      <div class="profile-me-header">
        <div class="title">ข้อมูลส่วนตัว</div>
        <span>
          คุณสามารถจัดการข้อมูลส่วนตัวของคุณได้ในหน้านี้
        </span>
        <hr>
      </div>
      <div class="profile-me-body">
        <b-form @submit.prevent="validateForm">
          <div class="email group">
            <div class="title">
              อีเมลล์
            </div>
            <div class="input">
              <b-form-input v-validate="'required'" type="text" name="email" v-model="form.email.val" :disabled="form.email.status"></b-form-input>
            </div>
          </div>
          <div class="name group">
            <div class="title">
              ชื่อ
            </div>
            <div class="input">
              <b-form-input v-validate="'required'" type="text" name="name" v-model="form.name.val" :disabled="form.name.status"></b-form-input>
              <div v-show="errors.has('name')" class="error">
                {{ errors.first('name') }}
              </div>
            </div>
          </div>
          <div class="tel group">
            <div class="title">
              เบอร์โทร
            </div>
            <div class="input">
              <b-form-input v-validate="'numeric|min:9|max:10'" type="text" name="tel" v-model="form.tel.val" :disabled="form.tel.status" maxlength="10"></b-form-input>
              <div v-show="errors.has('tel')" class="error">
                {{ errors.first('tel') }}
              </div>
            </div>
          </div>
          <div class="address group">
            <div class="title">
              ที่อยู่
            </div>
            <div class="input">
              <b-form-textarea v-model="form.address.val" name="address" :disabled="form.address.status"></b-form-textarea>
              <div v-show="errors.has('address')" class="error">
                {{ errors.first('address') }}
              </div>
            </div>
          </div>
          <hr>
          <div class="gender group">
            <div class="title">
              เพศ
            </div>
            <div class="input">
              <b-form-radio-group v-model="form.gender.val" name="gender" :options="form.gender.options" :disabled="form.gender.status"></b-form-radio-group>
              <div v-show="errors.has('gender')" class="error">
                {{ errors.first('gender') }}
              </div>
            </div>
          </div>
          <div class="birthday group">
            <div class="title">
              วันเกิด
            </div>
            <div class="input">
              <b-form-input type="date" name="birthday" v-model="form.birthday.val " :disabled="form.birthday.status "></b-form-input>
              <div v-show="errors.has('birthday ')" class="error">
                {{ errors.first('birthday ') }}
              </div>
            </div>
          </div>
          <div class="text-center">
            <button type=" submit" class="button">บันทึก</button>
          </div>
          <hr>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'ProfileMe',
  data() {
    return {
      form: {
        email: {
          val: null,
          status: true
        },
        name: {
          val: null,
          status: false
        },
        tel: {
          val: null,
          status: false
        },
        gender: {
          val: null,
          status: false,
          options: [
            {
              text: 'ชาย', value: 'male',
            },
            {
              text: 'หญิง', value: 'female',
            },
            {
              text: 'อื่นๆ', value: 'other'
            }
          ]
        },
        birthday: {
          val: null,
          status: false
        },
        address: {
          val: null,
          status: false
        }
      }
    }
  },
  mounted() {
    this.form.email.val = this.userData.email;
    this.form.name.val = this.userData.name;
    this.form.gender.val = this.userData.gender;
    this.form.birthday.val = this.userData.birthday.split('T')[0];
  },
  computed: {
    ...mapGetters(['userData'])
  },
  watch: {
  },
  methods: {
    ...mapActions(['profileUpdate', 'profile']),
    validateForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const payload = {
            email: this.userData.email,
            provider: this.userData.provider,
            data: {
              name: this.form.name.val,
              tel: this.form.tel.val || null,
              address: this.form.address.val || null,
              gender: this.form.gender.val || null,
              birthday: this.form.birthday.val || null
            }
          }
          this.profileUpdate(payload);
        }
        

      });
    
    }
  }
}
</script>

<style>
</style>
