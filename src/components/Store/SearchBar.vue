<template>
  <div id="searchbar">
    <div class="bar-container">
      <div class="container">
        <div class="bar-search row m-0">
          <div class="col p-0">
            <div class="input-group">
              <span class="input-group-append">
                <div class="input-group-text border-right-0 border">
                  <font-awesome-icon icon="search" aria-hidden="true" />
                </div>
              </span>
              <input class="form-control py-2 border-left-0 border" type="search" placeholder="ค้นหา" id="search">
            </div>
          </div>
        </div>

        <div class="trigger-filter" @click="triggerFilter()">
          <img src="static/images/icon/arrow-up.svg">
        </div>

        <div id="bar-filter" class="bar-filter row m-0 no-gutters">
          <div class="col-sm-12 col-md-4 bar-filter-select">
            <div class="mr-2">
              <div class="title">
                ประเภทผ้าม่าน
              </div>
              <b-form-select v-model="filter1" :options="options.filter1"></b-form-select>
            </div>
          </div>

          <div class="col-sm-12 col-md-4 bar-filter-select">
            <div class="ml-2 mr-2">
              <div class="title">
                ชนิดของผ้า
              </div>
              <b-form-select v-model="filter2" :options="options.filter2"></b-form-select>
            </div>
          </div>

          <div class="col-sm-12 col-md-4 bar-filter-select">
            <div class="ml-2 mr-2">
              <div class="title">
                สีของผ้า
              </div>
              <b-form-select v-model="filter3" :options="options.filter3"></b-form-select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TweenMax, TimelineMax, Power0 } from 'gsap'
export default {
  ///
  // Name
  ///
  name: "SearchBar",

  ///
  // Data
  ///
  data() {
    return {
      search: null,
      filter1: null,
      filter2: null,
      filter3: null,
      options: {
        filter1: [
          { value: null, text: '-- เลือกประเภทของผ้าม่าน --'},
          { value: 'value1', text: 'ผ้าชนิด 1' },
          { value: 'value2', text: 'ผ้าชนิด 2' },
          { value: 'value3', text: 'ผ้าชนิด 3' }
        ],
         filter2: [
          { value: null, text: '-- เลือกชนิดของผ้าม่าน --'},
          { value: 'value1', text: 'ผ้าชนิด 1' },
          { value: 'value2', text: 'ผ้าชนิด 2' },
          { value: 'value3', text: 'ผ้าชนิด 3' }
        ],
        filter3: [
          { value: null, text: '-- เลือกสีของผ้าม่าน --'},
          { value: 'value1', text: 'ผ้าชนิด 1' },
          { value: 'value2', text: 'ผ้าชนิด 2' },
          { value: 'value3', text: 'ผ้าชนิด 3' }
        ]
      },
      animate: {
        trigger: 0
      }
    }
  },

  ///
  // Mounted
  ///
  mounted() {},

  ///
  // Methods
  ///
  methods: {
    triggerFilter() {
      if (this.animate.trigger) {
        // Slideup
        TweenLite.to(".bar-container", 0.3, { ease: Power2.easeOut, height: '100px'})
        TweenLite.to(".trigger-filter", 0.2, { ease: Power2.easeOut, rotation: 0})
        TweenLite.to(".bar-filter", 0.1, { autoAlpha: 0})
        this.animate.trigger = 0;
      } else {
        // Slidedown
        TweenLite.set(".bar-container", { ease: Power2.easeOut, height: "auto"});
        TweenLite.from(".bar-container", 0.3, { ease: Power2.easeOut, height: '100px'})
        TweenLite.to(".trigger-filter", 0.2, {ease: Power2.easeOut, rotation: 180})
        TweenLite.to(".bar-filter", 0.4, { autoAlpha: 1})
        this.animate.trigger = 1;
      
      }
    }
  }
}
</script>

<style>
</style>
