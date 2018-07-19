<template>
  <div class="section1">
    <div class="container">
      <div class="row pt-4 pb-5">
        <!-- Review -->
        <div class="col-12 col-md-8 p-2" id="review">
          <div class="box flex justify-center align-center border-2">
            <swiper :options="swiperOption">
              <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
                <img :src="'/static/images/preview/preview_0' + slide + '.png'">
                <!-- I'm Slide {{ slide }} -->

              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
        </div>
        <!-- Promotion -->
        <div class="col-12 col-md p-2" id="promotion">
          <div class="box">
            <div class="row m-0 h-100">
              <!-- Promotion Box 1 -->
              <div class="col-6 p-0 col-md-12 mb-2 " id="promotion-1">
                <div class="child-box flex justify-center align-center border-2">
                  <img src="@image/promotion/promotion_1.png" class="border-2">
                </div>
              </div>
              <!-- Promotion Box 2 -->
              <div class="col-6 p-0 col-md-12 mt-2" id="promotion-2">
                <div class="child-box flex justify-center align-center border-2">
                  <img src="@image/promotion/promotion_2.png" class="border-2">
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
import velocity from 'velocity-animate';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// import img from '../../assets/images/test/01.jpg';
export default {
  name: 'Section1',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        autoplay: {
          delay: 5000
        },
        fadeEffect: {
          crossFade: true
        },
        pagination: {
          el: '.swiper-pagination'
        }
      },
      swiperSlides: [1, 2, 3, 4, 5],
    }
  },
  methods: {
  },
  created() {

    // setInterval(() => {
    //   if (this.slideMax == this.currentSlider) {
    //     $('figure').velocity({left: '0%'}, [.53,.49,.18,.97]);
    //     this.currentSlider = 1
    //   } else {
    //     $('figure').velocity({left: '-=100%'}, [.53,.49,.18,.97]);
    //     this.currentSlider += 1
    //   }
    // }, this.slideDelay);

  }
}
</script>

<style>
</style>
