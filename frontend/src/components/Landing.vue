<template>
  <div id="landing">
    <div class="section1">
      <div class="container">
        <div class="row pt-4 pb-5">
          <!-- Review -->
          <div class="col-12 col-md-8 p-2" id="review">
            <div class="box flex justify-center align-center border-2">
              <div id="slider">
                <figure>
                  <img src="@image/test/01.jpg" class="border-2 slide-img">
                  <img src="@image/test/02.jpg" class="border-2 slide-img">
                  <img src="@image/test/03.jpg" class="border-2 slide-img">
                  <img src="@image/test/04.jpg" class="border-2 slide-img">
                  <img src="@image/test/04.jpg" class="border-2 slide-img">
                </figure>
                <ul class="slider-radio">
                  <li v-for="item in slideMax" :key="item" @click="sliderActive(item)">
                    <span :class="{'active': currentSlider == item}"></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- Promotion -->
          <div class="col-12 col-md p-2" id="promotion">
            <div class="box">
              <div class="row m-0 h-100">
                <!-- Promotion Box 1 -->
                <div class="col-6 p-0 col-md-12 mb-2 " id="promotion-1">
                  <div class="child-box flex justify-center align-center border-2">
                    <img src="@image/test/02.jpg" class="border-2">
                  </div>
                </div>
                <!-- Promotion Box 2 -->
                <div class="col-6 p-0 col-md-12 mt-2" id="promotion-2">
                  <div class="child-box flex justify-center align-center border-2">
                    <img src="@image/test/02.jpg" class="border-2">
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
import velocity from 'velocity-animate';
export default {
  name: 'Landing',
  data () {
    return {
      slideMax: 5,
      currentSlider: 1,
      sldieState: false,
      slideDelay: 5000,
      slideAmount: null,
      pageRange: 1,
      timer: null,
    }
  },
  created() {
    setInterval(() => {
      if (this.slideMax == this.currentSlider) {
        $('figure').velocity({left: '0%'}, [.53,.49,.18,.97]);
        this.currentSlider = 1
      } else {
        $('figure').velocity({left: '-=100%'}, [.53,.49,.18,.97]);
        this.currentSlider += 1
      }
    }, this.slideDelay)
  },
  methods: {
    sliderActive(item) {
      // make sure current event is not same slide
      if (this.currentSlider == item) return false;
      this.pageRange = item - this.currentSlider;
      this.slideAmount = Math.abs(100 * this.pageRange);

      // slide left, right
      if (this.pageRange > 0) {
        $('figure').velocity({left: '-=' + this.slideAmount + '%'}, [.53,.49,.18,.97]);
      } else {
        $('figure').velocity({left: '+=' + this.slideAmount + '%'}, [.53,.49,.18,.97]);
      }

      // change active button
      this.currentSlider = item;

    }
  }
}
</script>

<style>
</style>
