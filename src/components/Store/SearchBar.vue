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
              <input class="form-control py-2 border-left-0 border" type="search" placeholder="ค้นหา" id="search" v-model="search">
            </div>
          </div>
        </div>

        <div class="trigger-filter" @click="triggerFilter()">
          <img src="/static/images/icon/arrow-up.svg">
        </div>

        <div id="bar-filter" class="bar-filter row m-0 no-gutters">
          <div class="col-sm-12 col-md-4 bar-filter-select">
            <div class="mr-2">
              <div class="title">
                ประเภทผ้าม่าน
              </div>
              <b-form-select v-model="type" :options="storeFilterData() ? storeFilterData().type : {text: 'S&N CURTAIN'}"></b-form-select>
            </div>
          </div>

          <div class="col-sm-12 col-md-4 bar-filter-select">
            <div class="ml-2 mr-2">
              <div class="title">
                ชนิดของผ้า
              </div>
              <b-form-select v-model="fabric" :options="storeFilterData() ? storeFilterData().fabric : {text: 'S&N CURTAIN'}"></b-form-select>
            </div>
          </div>

          <div class="col-sm-12 col-md-4 bar-filter-select">
            <div class="ml-2">
              <div class="title">
                สีของผ้า
              </div>
              <b-form-select v-model="color" :options="storeFilterData() ? storeFilterData().color : {text: 'S&N CURTAIN'}"></b-form-select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { TweenMax, TimelineMax, Power0 } from "gsap";
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
      type: null,
      fabric: null,
      color: null,
      timeout: null,
      page: 1,
      options: {
        type: [
          { value: null, text: "เลือกชนิดของผ้าม่าน" },
          { value: "ม่านตาไก่", text: "ม่านตาไก่" },
          { value: "ม่านคอกระเช้า", text: "ม่านคอกระเช้า" },
          { value: "value3", text: "ผ้าชนิด 3" }
        ],
        fabric: [
          { value: null, text: "เลือกคุณภาพของผ้า" },
          { value: "มาตรฐาน", text: "มาตรฐาน" },
          { value: "ประหยัด", text: "ประหยัด" },
          { value: "หรูหรา", text: "หรูหรา" }
        ],
        color: [
          { value: null, text: "เลือกสีของผ้าม่าน" },
          { value: "แดง", text: "แดง" },
          { value: "น้ำตาล", text: "น้ำตาล" },
          { value: "value3", text: "ผ้าชนิด 3" }
        ]
      },
      animate: {
        trigger: 0
      },
      store: this.storeData()
    };
  },

  ///
  // Watch
  ///
  watch: {
    $route: function(type) {
      this.type = this.$route.params.type
      this.search =  null
      this.fabric =  null
      this.color =  null
      this.timeout =  null
    },
    search: function(name) {
      var _this = this;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function() {
        _this.triggerSearch();
      }, 500);
      this.storeTempUpdate({ type: 'search', data: name})
    },
    type: function(name) {
      this.triggerSearch();
      this.storeTempUpdate({ type: 'type', data: name})
    },
    fabric: function(name) {
      this.triggerSearch();
      this.storeTempUpdate({ type: 'fabric', data: name})
    },
    color: function(name) {
      this.triggerSearch();
      this.storeTempUpdate({ type: 'color', data: name})
    },
  },

  ///
  // Mounted
  ///
  mounted() {
    if (!this.storeData()) {
      this.storeGet({
        page: 1
      });
    }

    // if (!this.storeFilterData()) {
    this.storeFilterGet()    
    this.options = this.storeFilterData()
    // }


    if (this.$route.params.type) {
      this.type = this.$route.params.type;
      this.triggerFilter();
    }
  },

  ///
  // Methods
  ///
  methods: {
    ...mapMutations(["storeTempUpdate"]),
    ...mapGetters(["storeData", "storeFilterData"]),
    ...mapActions(["storeGet", "storeFilterGet"]),
    triggerFilter() {
      if (this.animate.trigger) {
        // Slideup
        TweenLite.to(".bar-container", 0.3, {
          ease: Power2.easeOut,
          height: "100px"
        });
        TweenLite.to(".trigger-filter", 0.2, {
          ease: Power2.easeOut,
          rotation: 0
        });
        TweenLite.to(".bar-filter", 0.1, { autoAlpha: 0, display: "none" });
        this.animate.trigger = 0;
      } else {
        // Slidedown
        TweenLite.set(".bar-filter", { display: "flex" });
        TweenLite.set(".bar-container", {
          ease: Power2.easeOut,
          height: "auto"
        });
        TweenLite.from(".bar-container", 0.3, {
          ease: Power2.easeOut,
          height: "100px"
        });
        TweenLite.to(".trigger-filter", 0.2, {
          ease: Power2.easeOut,
          rotation: 180
        });
        TweenLite.to(".bar-filter", 0.4, { autoAlpha: 1 });
        this.animate.trigger = 1;
      }
    },
    triggerSearch() {
      this.storeGet({
        search: this.search,
        page: this.page,
        color: this.color,
        type: this.type,
        fabric: this.fabric
      });
    }
  },
  ///
  // Props
  ///
  props: {
    
  }
};
</script>

<style>
</style>
