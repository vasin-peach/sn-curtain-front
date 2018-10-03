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
                  <b-form-select v-model="category" :options="storeFilterData ? storeFilterData.category : {text: 'LOADING...'}"></b-form-select>
                </div>
              </div>

              <div class="col-sm-12 col-md-4 bar-filter-select">
                <div class="ml-2 mr-2">
                  <div class="title">
                    ชนิด
                  </div>
                  <b-form-select v-model="type" :options="storeFilterData ? storeFilterData.type : {text: 'LOADING...'}"></b-form-select>
                </div>
              </div>

              <div class="col-sm-12 col-md-4 bar-filter-select">
                <div class="ml-2">
                  <div class="title">
                    ลักษณะ
                  </div>
                  <b-form-select v-model="nature" :options="storeFilterData ? storeFilterData.nature : {text: 'LOADING...'}"></b-form-select>
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
      category: null,
      type: null,
      nature: null,
      timeout: null,
      page: 1,
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
      this.category = this.$route.params.category;
      this.type = null;
      this.nature = null;
      this.search = null;
      this.timeout = null;
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
    },
    type: function(name) {
      this.triggerSearch();
      this.storeTempUpdate({ type: "type", data: name });
    },
    nature: function(name) {
      this.triggerSearch();
      this.storeTempUpdate({ type: "nature", data: name });
    }
  },

  ///
  // Mounted
  ///
  mounted() {
    if (!this.storeData) {
      this.storeGet({
        page: 1
      });
    }

    if (this.$route.params.category) {
      this.type = this.$route.params.category;
      this.triggerFilter();
    }

    this.storeFilterGet();
    this.options = this.storeFilterData;
  },

  ///
  // Methods
  ///
  methods: {
    ...mapMutations(["storeTempUpdate", "storeUpdate"]),
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
    ...mapGetters(["storeData", "storeFilterData"])
  }
};
</script>

<style>
</style>
