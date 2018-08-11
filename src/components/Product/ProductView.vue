<template>
  <div id="productview">
    <div class="container">
      <div class="row product-container" v-if="productData">
        <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 product-show">
          <div style="height: 60vh">
            <!-- swiper1 -->
            <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
              <swiper-slide v-if="item.src" v-for="(item, index) in productData[0].assets" :key="index" :style="{'background-image' : 'url('+ item.src +')'}" style="display: block"></swiper-slide>
              <swiper-slide v-else v-for="(item) in [1,2,3,4,5]" :key="item" style="background-image: url('/static/images/lazy/lazyload.svg')"></swiper-slide>
              <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
              <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            </swiper>
            <!-- swiper2 Thumbs -->
            <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
              <swiper-slide v-if="item.src" v-for="(item, index) in productData[0].assets" :key="index" :style="{'background-image' : 'url('+ item.src +')'}" style="display: block"></swiper-slide>
              <swiper-slide v-else v-for="(item) in [1,2,3,4,5]" :key="item" style="background-image: url('/static/images/lazy/lazyload.svg')"></swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="col-12 col-sm-12 col-md col-lg col-xl product-detail right">
          <div style="min-height: 60vh">
            <div class="title">
              {{ productData[0].name }}
            </div>
            <hr>
            <div class="price">
              ฿{{ productData[0].price }}
            </div>
            <div class="detail">
              {{ productData[0].desc[0].val }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'ProductView',
  ///
  // Data
  ///
  data () {
    return {
      id: null,
      swiperOptionTop: {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        slidesPerView: 4,
        touchRatio: 0.2,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        slideToClickedSlide: true,
      },
      swiperSlides: [1, 2, 3, 4, 5],
    }
  },

  ///
  // Mounted
  ///
  mounted() {
    // init product id
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      this.productGet(this.id).then(() => {
        this.initSwiper()
      })
    }
  },

  ///
  // Watch
  ///
  watch: {
    productData: (data) => {
    }
  },

  ///
  // Computed
  ///
  computed: {
    ...mapGetters(['productData']),
  },

  /// 
  // Methods
  ///
  methods: {
    ...mapActions(['productGet']),
    initSwiper() {
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.swiper
        const swiperThumbs = this.$refs.swiperThumbs.swiper
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop
      })
    }
  },

  ///
  // Components
  ///
  components: {
    swiper,
    swiperSlide
  },
}
</script>

<style lang="scss" scoped>
.swiper-container {
  background-color: transparent;
}
.gallery-thumbs .swiper-slide {
  cursor: pointer !important;
}
.swiper-slide {
  background-size: cover;
  background-position: center;
}
.gallery-top {
  height: 80% !important;
  width: 100%;
}
.gallery-thumbs {
  height: 20% !important;
  box-sizing: border-box;
  padding: 10px 0;
}
.gallery-thumbs .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}
.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
</style>
