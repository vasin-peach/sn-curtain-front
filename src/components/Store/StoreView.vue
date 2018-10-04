<template>
  <div id="storeview">
    <div class="container">
      <transition name="fade" mode="out-in">
        <div v-if="!storeData || loadingData.store">
          <loading></loading>
        </div>
        <div class="row store-container" v-else key="content">
          <div class="col-6 col-sm-6 col-lg-4 col-xl-3 store-item" v-for="(item, count) in storeData.data" :key="count">
            <router-link :to="{ name: 'Product', params: { id: item._id } }">
              <div class="card-container">
                <div class="card-head">
                  <img v-lazy="item.brand.src" :alt="item.name || 'ชื่อสินค้า'">
                </div>
                  <div class="card-content">
                    <p class="title">{{item.name || 'ชื่อสินค้า' }}</p>
                    <p class="price">฿{{item.price || 'ไม่ระบุ' }}</p>
                    <hr>
                    <div class="detail row m-0">
                      <div class="col-12 col-sm-6">
                        <span class="fabric-title">View: </span>
                        <span class="fabric-content">{{ item.view || 0 }}</span>
                      </div>
                      <span class="color-orange1 d-none d-sm-block">|</span>
                      <div class="col-12 col-sm-6">
                        <span class="color-title">Like:</span>
                        <span class="fabric-content">{{ item.like || 0 }}</span>
                        <!-- <span class="color-box" :style="{background: item.category.color.hex || '#ccc'}"></span> -->
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div class="button">ดูสินค้า</div>
                  </div>
                </div>
            </router-link>
          </div>
        </div>
      </transition>
      <div class="pagination-container" v-if="storeData">
        <div class="pagination-wrapper">
          <b-pagination align="center" :total-rows="storeData.count" v-model="currentPage" :per-page="12"></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../Loading";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  ///
  // Name
  ///
  name: "StoreView",

  ///
  // Data
  ///
  data() {
    return {
      currentPage: 1
    };
  },

  ///
  // Watch
  ///
  watch: {
    currentPage: function(page) {
      this.storeGet({
        search: this.storeTempData.search,
        page: this.currentPage,
        color: this.storeTempData.color,
        type: this.storeTempData.type,
        fabric: this.storeTempData.fabric
      });
      TweenMax.to($(window), 0.4, {
        scrollTo: { y: $(".bar-container").height() - 50, autoKill: true },
        ease: Power3.easeInOut,
        autoKill: true,
        overwrite: 5
      });
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
    ...mapActions(["storeGet"])
  },

  ///
  // Computed
  ///
  computed: {
    ...mapGetters(["storeData", "loadingData", "storeTempData"])
  },

  ///
  // Component
  ///
  components: {
    Loading
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
