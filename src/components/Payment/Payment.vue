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
              <div class="title">
                <font-awesome-icon icon="map-marked-alt" aria-hidden="true" /> สถานที่ส่ง</div>
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
                      <router-link :to="{ name: 'Product', params: { id: items.id} }">
                        <img v-lazy="items.data.brand.src">
                      </router-link>
                    </div>
                    <div class="col">
                      <span>{{ numberWithCommas(items.buyOption * items.amount) }}</span>
                      <span>({{items.amount}})</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="order-detail">
                <div class="row m-0">
                  <div class="col">
                    สินค้ารวม
                  </div>
                  <div class="col">
                    {{ numberWithCommas(productPrice) }}
                  </div>
                </div>
                <div class="row m-0">
                  <div class="col">
                    ส่วนลด
                  </div>
                  <div class="col">
                    {{ numberWithCommas(discountPrice) }}
                  </div>
                </div>
                <div class="row m-0">
                  <div class="col">
                    ค่าขนส่ง
                  </div>
                  <div class="col">
                    {{ numberWithCommas(transportPrice) }}
                  </div>
                </div>
                <div class="row m-0">
                  <div class="col-12">
                    <hr>
                  </div>
                </div>
                <div class="row m-0">
                  <div class="col">
                    รวม
                  </div>
                  <div class="col">
                    {{numberWithCommas(productPrice + transportPrice - discountPrice)}}
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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Payment",
  data() {
    return {
      productPrice: 0,
      discountPrice: 0,
      transportPrice: 0
    };
  },
  watch: {
    basketData: function() {
      this.initPrice();
    }
  },
  methods: {
    ...mapActions(['getSession']),
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    initPrice() {
      // init sum of product
      this.productPrice = this.basketData.reduce((total, current) => {
        return total + current.buyOption * current.amount;
      }, 0);

      // init price of discount
      this.discountPrice = Math.round(this.discountData);

      // init price of delivery
      this.transportPrice = Math.round(this.transportData);
    }
  },
  computed: {
    ...mapGetters(["basketData", "discountData", "transportData"])
  },
  mounted() {
    this.initPrice();
    this.getSession();
  }
};
</script>

<style>
</style>
