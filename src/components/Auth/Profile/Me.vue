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
              ชื่อที่แสดง
            </div>
            <div class="input">
              <b-form-input v-validate="'required'" type="text" name="display_name" v-model="form.name.display_name.val" :disabled="form.name.display_name.status"></b-form-input>
              <div v-show="errors.has('display_name')" class="error">
                {{ errors.first('display_name') }}
              </div>
            </div>
          </div>
          <div class="name group">
            <div class="title">
              ชื่อต้น
            </div>
            <div class="input">
              <b-form-input v-validate="'required|min:3'" type="text" name="first_name" v-model="form.name.first_name.val" :disabled="form.name.first_name.status" placholder="ชื่อต้น (ภาษาไทย)"></b-form-input>
              <div v-show="errors.has('first_name')" class="error">
                {{ errors.first('first_name') }}
              </div>
            </div>
          </div>
          <div class="name group">
            <div class="title">
              นามสกุล
            </div>
            <div class="input">
              <b-form-input v-validate="'required|min:3'" type="text" name="last_name" v-model="form.name.last_name.val" :disabled="form.name.last_name.status" placholder="นามสกุล (ภาษาไทย)"></b-form-input>
              <div v-show="errors.has('last_name')" class="error">
                {{ errors.first('last_name') }}
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
          <hr>
          <div class="address group">
            <div class="title">
              บ้านเลขที่
            </div>
            <div class="input">
              <b-form-input :state="!errors.has('house_no')" v-validate="{ required: true, min: 3 }" name="house_no" v-model="form.house_no.val" type="text" placeholder="เช่น 38/5, 24/589" :disabled="form.house_no.status" maxlength="10"></b-form-input>
              <b-form-invalid-feedback v-show="errors.has('house_no')">
                {{ errors.first('house_no') }}
              </b-form-invalid-feedback>
            </div>
          </div>
          <div class="address group">
            <div class="title">
              หมู่บ้าน
            </div>
            <div class="input">
              <b-form-input :state="!errors.has('village_no')" v-validate="{ required: true, }" name="village_no" v-model="form.village_no.val" type="text" placeholder="หมู่บ้าน"  :disabled="form.village_no.status"></b-form-input>
              <b-form-invalid-feedback v-show="errors.has('village_no')">
                {{ errors.first('village_no') }}
              </b-form-invalid-feedback>
            </div>
          </div>
          <div class="address group">
            <div class="title">
              แขวง/ตำบล
            </div>
            <div class="input">
              <b-form-input :state="!errors.has('district')" v-validate="{ required: true, }" name="district" v-model="form.district.val" type="text" placeholder="แขวง/ตำบล" :disabled="form.district.status"></b-form-input>
              <b-form-invalid-feedback v-show="errors.has('district')">
                {{ errors.first('district') }}
              </b-form-invalid-feedback>
            </div>
          </div>
          <div class="address group">
            <div class="title">
              เขต/อำเภอ
            </div>
            <div class="input">
              <b-form-input :state="!errors.has('amphoe')" v-validate="{ required: true }" name="amphoe" v-model="form.amphoe.val" type="text" placeholder="เขต/อำเภอ"  :disabled="form.amphoe.status"></b-form-input>
              <b-form-invalid-feedback v-show="errors.has('amphoe')">
                {{ errors.first('amphoe') }}
              </b-form-invalid-feedback>
            </div>
          </div>
          <div class="address group">
            <div class="title">
              ถนน
            </div>
            <div class="input">
              <b-form-input :state="!errors.has('road')" v-validate="{ required: true }" name="road" v-model="form.road.val" type="text" placeholder="ถนน"  :disabled="form.road.status"></b-form-input>
              <b-form-invalid-feedback v-show="errors.has('road')">
                {{ errors.first('road') }}
              </b-form-invalid-feedback>
            </div>
          </div>
          <div class="address group">
            <div class="title">
              จังหวัด
            </div>
            <div class="input">
              <b-form-input :state="!errors.has('province')" v-validate="{ required: true }" name="province" v-model="form.province.val" type="text" placeholder="จังหวัด"  :disabled="form.province.status"></b-form-input>
              <b-form-invalid-feedback v-show="errors.has('province')">
                {{ errors.first('province') }}
              </b-form-invalid-feedback>
            </div>
          </div>
          <div class="address group">
            <div class="title">
              รหัสไปรษณีย์
            </div>
            <div class="input">
              <b-form-input :state="!errors.has('zip')" v-validate="{ required: true, regex: /^(\d{5})?$/ }" name="zip" v-model="form.zip.val" type="text" placeholder="เช่น 10510"  :disabled="form.zip.status" maxlength="5"></b-form-input>
              <b-form-invalid-feedback v-show="errors.has('zip')">
                {{ errors.first('zip') }}
              </b-form-invalid-feedback>
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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ProfileMe",
  data() {
    return {
      form: {
        email: {
          val: null,
          status: true
        },
        name: {
          display_name: {
            val: null,
            status: false
          },
          first_name: {
            val: null,
            status: false
          },
          last_name: {
            val: null,
            status: false
          }
        },
        tel: {
          val: null,
          status: false
        },
        house_no: {
          val: null,
          status: false
        },
        village_no: {
          val: null,
          status: false
        },
        district: {
          val: null,
          status: false
        },
        amphoe: {
          val: null,
          status: false
        },
        road: {
          val: null,
          status: false
        },
        province: {
          val: null,
          status: false
        },
        zip: {
          val: null,
          status: false
        },
        gender: {
          val: null,
          status: false,
          options: [
            {
              text: "ชาย",
              value: "male"
            },
            {
              text: "หญิง",
              value: "female"
            },
            {
              text: "อื่นๆ",
              value: "other"
            }
          ]
        },
        birthday: {
          val: null,
          status: false
        },
      }
    };
  },
  mounted() {
    this.updateForm();
  },
  computed: {
    ...mapGetters(["userData"])
  },
  watch: {},
  methods: {
    ...mapActions(["profileUpdate", "profile"]),
    updateForm() {
      this.form.email.val = this.userData.email;
      this.form.name.display_name.val = this.userData.name.display_name;
      this.form.name.first_name.val = this.userData.name.first_name;
      this.form.name.last_name.val = this.userData.name.last_name;
      this.form.gender.val = this.userData.gender;
      this.form.birthday.val = this.userData.birthday.split("T")[0];
      this.form.tel.val = this.userData.tel;
      this.form.house_no.val = this.userData.address.house_no;
      this.form.village_no.val = this.userData.address.village_no;
      this.form.district.val = this.userData.address.district;
      this.form.amphoe.val = this.userData.address.amphoe;
      this.form.road.val = this.userData.address.road;
      this.form.province.val = this.userData.address.province;
      this.form.zip.val = this.userData.address.zip;
    },
    validateForm() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const payload = {
            email: this.userData.email,
            provider: this.userData.provider,
            data: {
              name: {
                display_name: this.form.name.display_name.val || null,
                first_name: this.form.name.first_name.val || null,
                last_name: this.form.name.last_name.val || null
              },
              tel: this.form.tel.val || null,
              gender: this.form.gender.val || null,
              birthday: this.form.birthday.val || null,
              address: {
                house_no: this.form.house_no.val || null,
                village_no: this.form.village_no.val || null,
                district: this.form.district.val || null,
                amphoe: this.form.amphoe.val || null,
                road: this.form.road.val || null,
                province: this.form.province.val || null,
                zip: this.form.zip.val || null
              }
            }
          };
          this.profileUpdate(payload);
        }
      });
    }
  }
};
</script>

<style>
</style>
