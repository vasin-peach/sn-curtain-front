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
            <a href="#">
              <div class="row m-0">
                <div class="col-6 col-sm-12 col-md-4 product-content">
                  <p class="text">{{item.name}}</p>
                  <p>{{item.price}} บาท</p>
                  <div class="button">Buy</div>
                </div>
                <div class="col order-first product-img">
                  <img :src="'/static/images/test/' + item.url">
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="product-footer">
        <hr class="bg-dark1">
        <a href="#">
          <div class="dot"></div>
          <p>MORE</p>
          <span>สินค้าเพิ่มเติม</span>
        </a>
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
      product: [
        {
          name: 'Curtain1 Your application is running here',
          url: '01.png',
          price: 1200
        },
        {
          name: 'Curtain2',
          url: '02.png',
          price: 1200
        },
        {
          name: 'Curtain3',
          url: '03.png',
          price: 1200
        },
        {
          name: 'Curtain4',
          url: '04.png',
          price: 1200
        },
        {
          name: 'Curtain5',
          url: '01.png',
          price: 1500
        },
        {
          name: 'Curtain6',
          url: '02.png',
          price: 1600
        }
      ]
    }
  },
    mounted() {
    $(function() {
      // init scrollmagic
      var controller = new ScrollMagic.Controller();

        // build scene with loop
        $('.fade').each(function() {
          var categoryScene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 1,
            // reverse: false
          })
          .setClassToggle(this, 'fade-in')
          .addTo(controller);
        })
    })
  }
}
</script>

<style>
</style>
