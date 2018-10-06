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

        <div class="trigger-filter" @click="triggerFilter">
          <img src="/static/images/icon/arrow-up.svg">
        </div>

        <div id="bar-filter" class="bar-filter row m-0 no-gutters">
          <div class="col-sm-12 col-md-4 bar-filter-select">
            <div class="mr-2">
              <div class="title">
                ประเภท
              </div>
              <b-form-select v-model="category" :options=" storeFilterCategoryData ? storeFilterCategoryData : {text: 'LOADING...'}" :disabled="storeFilterCategoryData == null"></b-form-select>
            </div>
          </div>

          <div class="col-sm-12 col-md-4 bar-filter-select">
            <div class="ml-2 mr-2">
              <div class="title">
                ชนิด
              </div>
              <div v-if="storeFilterTypeData">
                <b-form-select v-model="type" :options="storeFilterTypeData ? storeFilterTypeData : {text: 'LOADING...'}" :disabled="storeFilterTypeData.length == 1" :class="{'disable': storeFilterTypeData.length == 1 }"></b-form-select>
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-4 bar-filter-select">
            <div class="ml-2">
              <div class="title">
                ลักษณะ
              </div>
              <div v-if="storeFilterNatureData">
                <b-form-select v-model="nature" :options="storeFilterNatureData ? storeFilterNatureData : {text: 'LOADING...'}" :disabled="storeFilterNatureData.length == 1" :class="{'disable': storeFilterNatureData.length == 1}"></b-form-select>
              </div>
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
      firstTime: true,
      search: null,
      category: null,
      type: null,
      nature: null,
      timeout: null,
      page: 1,
      disable: {
        type: false,
        nature: false
      },
      animate: {
        trigger: 0
      },
      store: this.storeData
    };
  },

  ///
  // Watch
  ///
  watch: {
    $route: function(type) {

      // refresh firsttime
      this.firstTime = true;

      // init category & type
      let params = this.$route.params.category.split(',');
      this.category = params[0];
      if (this.firstTime && params.length >= 2) this.type = params[1]; this.firstTime = false 

    },
    search: function(name) {

      var _this = this;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function() {
        _this.triggerSearch();
      }, 500);
      this.storeTempUpdate({ type: "search", data: name });

    },
    category: function(name) {

      this.triggerSearch();
      this.storeTempUpdate({ type: "category", data: name });
      this.storeTypeUpdate({ category: name });
      this.type = null;
      this.nature = null;

      // check if not firsttime change type option to null
      let params = this.$route.params.category.split(',');
      if (this.firstTime && params.length >= 2) this.type = params[1]; this.firstTime = false 

    },
    type: function(name) {

      this.triggerSearch();
      this.storeTempUpdate({ type: "type", data: name });
      this.storeNatureUpdate({ category: this.category, type: this.type });
      this.nature = null;

    },
    nature: function(name) {

      this.triggerSearch();
      this.storeTempUpdate({ type: "nature", data: name });

    },
    storeFilterData: function(data) {

      this.storeCategoryUpdate(this.category);
      this.storeTypeUpdate({ category: this.category });
      this.storeNatureUpdate(null);
      
    }
  },

  ///
  // Mounted
  ///
  mounted() {

    // init page
    if (!this.storeData) {
      this.storeGet({
        page: 1
      });
    }

    // init category
    let params = this.$route.params.category.split(',');
    this.category = params[0];

    // open search option
    this.triggerFilter();
    this.storeFilterGet();
    this.options = this.storeFilterData;

  },

  ///
  // Methods
  ///
  methods: {
    ...mapMutations([
      "storeTempUpdate",
      "storeUpdate",
      "storeCategoryUpdate",
      "storeTypeUpdate",
      "storeNatureUpdate"
    ]),
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
        category: this.category,
        type: this.type,
        nature: this.nature
      });
    }
  },

  ///
  // Computed
  ///
  computed: {
    ...mapGetters([
      "storeData",
      "storeFilterData",
      "storeFilterCategoryData",
      "storeFilterTypeData",
      "storeFilterNatureData"
    ])
  }
};
</script>

<style>
</style>
