<template>
  <div class="payment_atm">
    <transition name="fade" mode="out-in">
      <div class="popup-container" v-show="popupUploadData">
        <upload-component class="float" :destination="'atm'" :maxSize="2000" :type="['image/gif', 'image/jpeg', 'image/png']" :message="{success: {type: 'success', title: 'อัพโหลดหลักฐานการโอนเสร็จสิ้น', text: 'ทางทีมงานจะทำการตรวจสอบหลักฐานการโอนและดำเนินการภายใน 24 ชม.'}}"></upload-component>
      </div>
    </transition>
    <div class="wrapper-header">
      <div class="back">
        <router-link :to="{ name: 'Payment'}">
          <font-awesome-icon icon="chevron-left" aria-hidden="true" /> <span>ย้อนกลับ</span>
        </router-link>
      </div>
      <div class="title">
        <font-awesome-icon icon="credit-card" aria-hidden="true" /> ชำระด้วยการโอน</div>
    </div>

    <hr>
    <div class="atm-body">
      <div class="row m-0">
        <div class="col-12 atm-title">
          <div class="circle">1</div>
          ให้ท่านชำระเงินผ่านตู้ ATM หรือ่าน Internet Banking มายังธนาคารที่กำหนดต่อไปให้
        </div>
        <div class="col-12">
          <div class="atm-card">
            <div class="title">
              ไทยพาณิชย์ (SCB)
            </div>
            <div class="detail">
              ชื่อบัญชี: บริษัท S&N Curtain ประเทศไทยจำกัด <br>
              เลขบัญชี: 468 0601 709 <br>
              จำนวนเงิน: 4,175
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="atm-card">
            <div class="title">
              ไทยพาณิชย์ (SCB)
            </div>
            <div class="detail">
              ชื่อบัญชี: บริษัท S&N Curtain ประเทศไทยจำกัด <br>
              เลขบัญชี: 468 0601 709 <br>
              จำนวนเงิน: 4,175
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="atm-card">
            <div class="title">
              ไทยพาณิชย์ (SCB)
            </div>
            <div class="detail">
              ชื่อบัญชี: บริษัท S&N Curtain ประเทศไทยจำกัด <br>
              เลขบัญชี: 468 0601 709 <br>
              จำนวนเงิน: 4,175
            </div>
          </div>
        </div>
        <div class="col-12 atm-title">
          <div class="circle">2</div>
          หลังจากท่านทำการโอนแล้ว ให้เก็บหลักฐานการโอนแล้วอัพโหลดลงในระบบ ผ่านทางปุ่มด้านล่างนี้
        </div>
        <div class="col-12">
          <div class="button" @click="popupUploadUpdate(true)">อัพโหลดหลักฐานการชำระเงิน</div>
          <div class="button" @click="confirmPaymentLater()">ชำระเงินภายหลัง, กลับไปหน้าแสดงรายการสั่งซื้อ</div>
        </div>
        <div class="col-12 atm-title">
          <div class="circle">3</div>
          <div>
            หลังจากท่านอัพโหลดหลักฐานการชำระเงินแล้ว ท่านร้านจะทำการยืนยันรายการภายใน 24ชม. หากมีข้อสงสัยสามารถติดต่อเจ้าหน้าที่ได้ที่แชท
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import UploadComponent from "../Popup/Upload";
export default {
  name: "payment_atm",

  // ! METHODS
  methods: {
    // * Actions
    ...mapActions(["shoppingClear", "createOrder"]),

    // * Mutations
    ...mapMutations(["popupUploadUpdate"]),

    // * Confirm
    confirmPaymentLater() {
      this.$swal({
        type: "warning",
        title: "ยืนยันรายการ",
        text: "คุณต้องการยืนยันรายการ เพื่อชำระเงินภายหลังหรือไม่?",
        showCancelButton: true,
        confirmButtonText: "ใช่, ยืนยันการทำรายการ",
        confirmButtonColor: "#ee9b5c",
        cancelButtonText: "ไม่, ย้อนกลับ"
      }).then(async result => {
        // ok button
        if (result.value) {
          // ! Call create order
          this.createOrder("wait upload").then(resp => {
            // remove all history about transaction
            this.shoppingClear().then(() => {
              // alert
              this.$swal({
                type: "success",
                title: "ยืนยันการทำรายการ",
                text: "ระบบจะนำคุณไปหน้าโชว์รายชื่อการสั่งซื้อ"
              }).then(() => {
                this.$router.push({ name: "ProfileHistory" });
              });
            });
          });
        }
      });
    }
  },

  // ! COMPUTED
  computed: {
    ...mapGetters(["popupUploadData"])
  },

  // ! COMPONENTS
  components: {
    UploadComponent
  }
};
</script>

<style>
</style>
