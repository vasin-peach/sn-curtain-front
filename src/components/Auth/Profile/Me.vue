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
        <div class="email group">
          <div class="title">
            อีเมลล์
          </div>
          <div class="input">
            <input type="text" name="name" v-model="form.email.val" disabled>
          </div>
        </div>
        <div class="name group">
          <div class="title">
            ชื่อ
          </div>
          <div class="input">
            <input type="text" name="name" v-model="form.name.val" :disabled="form.name.status">
            <span @click="form.name.status = false">แก้ไข</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
          status: true
        }
      }
    }
  },
  mounted() {
    this.form.email.val = this.userData.email;
    this.form.name.val = this.userData.name;
  },
  computed: {
    ...mapGetters(['userData'])
  },
}
</script>

<style>
</style>
