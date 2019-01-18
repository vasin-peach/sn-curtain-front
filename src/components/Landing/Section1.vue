<template>
  <div class="section1">
    <div class="container">

      <transition
        name="fade"
        mode="out-in"
      >
        <div v-if="!slideMainData">
          <loading></loading>
        </div>
        <div
          class="row pt-4 pb-5"
          v-else
        >
          <!-- Review -->
          <div
            class="col-12 col-md-8 p-2"
            id="review"
          >
            <div class="box flex justify-center align-center border-2">
              <swiper :options="swiperOption">
                <swiper-slide
                  v-for="(slide, index) in slideMainData"
                  :key="index"
                  style="display: block"
                >
                  <a
                    :href="slide.url"
                    target="_blank"
                  >
                    <img
                      v-lazy="slide.src"
                      :alt="slide.url"
                    >
                  </a>
                </swiper-slide>
                <div
                  class="swiper-pagination"
                  slot="pagination"
                ></div>
              </swiper>
            </div>
          </div>
          <!-- Promotion -->
          <div
            class="col-12 col-md p-2"
            id="promotion"
          >
            <div class="box">
              <div class="row m-0 h-100">
                <!-- Promotion Box 1 -->
                <div
                  class="col-6 p-0 col-md-12 mb-2"
                  id="promotion-1"
                  v-if="slideSubData[0]"
                >
                  <a
                    class="child-box flex justify-center align-center border-2"
                    :href="slideSubData[0].url"
                    target="_blank"
                  >
                    <img
                      v-lazy="slideSubData[0].src"
                      class="border-2"
                      :alt="slideSubData[0].url"
                    >
                  </a>
                </div>
                <!-- Promotion Box 2 -->
                <div
                  class="col-6 p-0 col-md-12 mt-2"
                  id="promotion-2"
                  v-if="slideSubData[1]"
                >
                  <a
                    class="child-box flex justify-center align-center border-2"
                    :href="slideSubData[1].url"
                    target="_blank"
                  >
                    <img
                      v-lazy="slideSubData[1].src"
                      class="border-2"
                      :alt="slideSubData[1].url"
                    >
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import { mapActions, mapGetters } from "vuex";
import Loading from "../Loading";
export default {
  name: "Section1",
  components: {
    swiper,
    swiperSlide,
    Loading
  },
  data() {
    return {
      swiperOption: {
        dragable: false,
        autoplay: {
          delay: 5000
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      swiperSlides: [1, 2, 3, 4, 5]
    };
  },
  methods: {
    ...mapActions(["slideAllGet"])
  },
  computed: {
    ...mapGetters(["slideMainData", "slideSubData"])
  },
  mounted() {
    this.slideAllGet();
  }
};
</script>

<style>
</style>
