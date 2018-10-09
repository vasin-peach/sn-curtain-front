<template>
  <div class="payment">
    <div class="container">
      <div class="payment-container row">
        <!-- Left -->
        <div class="payment-content col col-sm col-md col-lg col-xl">
          <div class="wrapper">
            <div class="wrapper-header">
              <div class="back">
                <router-link :to="{ name: 'Basket'}">
                  <font-awesome-icon icon="chevron-left" aria-hidden="true" /> <span>ย้อนกลับ</span>
                </router-link>
              </div>
              <div class="title">สถานที่ส่ง</div>
            </div>
            <hr>
            <router-view />
          </div>
        </div>
        <!-- Right -->
        <div class="payment-detail col-12 col-sm-12 col-md-4 col-lg-4 col-xl-3">
          <div class="wrapper">
            <div class="wrapper-header">
              <div class="title">
                รายการ
              </div>
            </div>
            <hr>
            รายการสินค้า
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Payment",
  methods: {
    // ...mapActions(["createToken"])
  },
  created() {
    // this.createToken();
  }
};
</script>

<style>
</style>
