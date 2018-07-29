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
                  <p class="text">{{item.name}}</p>
                  <p>{{item.price}} บาท</p>
                  <div class="button">Buy</div>
                </div>
                <div class="col order-first product-img">
                  <img v-lazy="'/static/images/test/' + item.url">
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
export default {
  name: 'Section4',
  data() {
    return {
<<<<<<< HEAD
      product: null
    }
  },
  mounted() {
    console.log(keys);
    this.getPopular();

    // Init scrollmagic
=======
      product: [
        {
          name: 'Curtain1 Your application is running here',
          url: 'test_01.jpg',
          price: 1200
        },
        {
          name: 'Curtain2',
          url: 'test_02.jpg',
          price: 1200
        },
        {
          name: 'Curtain3',
          url: 'test_03.jpg',
          price: 1200
        },
        {
          name: 'Curtain4',
          url: 'test_04.jpg',
          price: 1200
        },
        {
          name: 'Curtain5',
          url: 'test_01.jpg',
          price: 1500
        },
        {
          name: 'Curtain6',
          url: 'test_02.jpg',
          price: 1600
        }
      ]
    }
  },
    mounted() {
>>>>>>> parent of 5bdc229... :art: create keys environment and add dynamic product in section4.
    $(function() {
      // init scrollmagic
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
<<<<<<< HEAD
  },
  methods: {
    getPopular() {
      this.product = new Array();
      for (let i=0; i<6; i++) {
        this.product[i] = {
          brand: {
            src: '/static/images/lazy/lazyload.svg'
          },
          name: [
            { val: 'ชื่อสินค้า' }
          ],
          price: '0',
        }
      }
      var config = {
        url: keys.BACKEND_URI + '/product/popular',
        timeout: 1000
      }
      this.$http.get(keys.BACKEND_URI + '/product/popular').then(response => {
        this.product = response.body.data;
      })
    }
=======
>>>>>>> parent of 5bdc229... :art: create keys environment and add dynamic product in section4.
  }
}
</script>

<style>
</style>
