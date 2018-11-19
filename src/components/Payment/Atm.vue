<template>
  <div class="payment_atm">
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
          <div class="button">อัพโหลดหลักฐานการชำระเงิน</div>
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
export default {
  name: "payment_atm",
  methods: {
    // Confirm
    confirmPaymentLater() {
      this.$swal({
        type: "warning",
        title: "ยืนยันรายการ",
        text: "คุณต้องการยืนยันรายการ เพื่อชำระเงินภายหลังหรือไม่?",
        showCancelButton: true,
        confirmButtonText: "ใช่, ยืนยันการทำรายการ",
        confirmButtonColor: "#ee9b5c",
        cancelButtonText: "ไม่, ย้อนกลับ"
      }).then(result => {
        if (result.value)
          this.$swal({
            type: "success",
            title: "ยืนยันการทำรายการ",
            text: "ระบบจะนำคุณไปหน้าโชว์รายชื่อการสั่งซื้อ"
          }).then(() => {
            this.$router.push({ name: "ProfileHistory" });
          });
      });
    }
  }
};
</script>

<style>
</style>
