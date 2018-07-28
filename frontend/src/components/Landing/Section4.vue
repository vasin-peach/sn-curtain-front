<template>
  <div class="section4">
    <div class="container">
      <div class="product-header fade">
        <span class="">สินค้าแนะนำ</span>
        <hr>
      </div>
      <div class="product-container">
        <div class="row">
          <div class="col-sm-6 product-item fade" v-for="(item, index) in product" :key="index">
            <router-link :to="{ name: 'Product' }">
              <div class="row m-0">
                <div class="col-6 col-sm-12 col-md-4 product-content">
                  <p class="text">{{item.name[0].val}}</p>
                  <p>{{item.price}} บาท</p>
                  <div class="button">Buy</div>
                </div>
                <div class="col order-first product-img">
                  <img v-lazy="item.brand.src">
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="product-footer">
        <hr class="bg-dark1">
        <router-link :to="{ name: 'Store' }">
          <div class="dot"></div>
          <p>MORE</p>
          <span>สินค้าเพิ่มเติม</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollMagic from 'scrollmagic';
import keys from '../../../keys/keys.js';
export default {
  name: 'Section4',
  data() {
    return {
      product: ['0', '1', '2', '3', '4', '5', '6']
    }
  },
  mounted() {

    this.getPopular();

    // Init scrollmagic
    $(function() {
      var controller = new ScrollMagic.Controller();

        // build scene with loop
        $('.fade').each(function() {
          var categoryScene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 1,
            reverse: false
          })
          .setClassToggle(this, 'fade-in')
          .addTo(controller);
        })
    })
  },
  methods: {
    getPopular() {
      var config = {
        url: keys.BACKEND_URI + '/product/popular',
        timeout: 1000
      }
      this.$http.get(keys.BACKEND_URI + '/product/popular').then(response => {
        this.product = response.body.data;
      }).catch(err => {
        this.product = new Array();

        for (let i=0; i<6; i++) {
          this.product[i] = {
            brand: {
              src: '/static/images/lazy/lazyload.svg'
            },
            name: [
              { val: 'ไม่พบสินค้า' }
            ],
            price: 'X',
          }
        }
      })
    }
  }
}
</script>

<style>
</style>
