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
            <div class="wrapper-content">
              <div class="order-box scrollCancel">
                <div class="order-item" v-for="items in basketData" :key="items.id">
                  <div class="row m-0">
                    <div class="col-7 col-sm-7 col-md-7">
                      <img v-lazy="items.data.brand.src">
                    </div>
                    <div class="col">
                      <span>{{ numberWithCommas(items.buyOption * items.amount) }}</span>
                      <span>({{items.amount}})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Payment",
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  computed: {
    ...mapGetters(["basketData"])
  },
  created() {
    // this.createToken();
  }
};
</script>

<style>
</style>
