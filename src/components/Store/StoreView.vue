<template>
  <div id="storeview">
    <div class="container">
      <transition name="fade" mode="out-in">
        <div v-if="!storeData() || loadingData().store">
          <loading></loading>
        </div>
        <div class="row store-container" v-else key="content">
          <div class="col-6 col-sm-6 col-lg-4 col-xl-3 store-item" v-for="(item, count) in storeData()" :key="count">
            <router-link :to="{ name: 'Product' }">
              <div class="card-container">
                <div class="card-head">
                  <img v-lazy="item.brand.src" :alt="item.name || 'ชื่อสินค้า'">
                </div>
                <div class="card-content">
                  <p class="title">{{item.name || 'ชื่อสินค้า' }}</p>
                  <p class="price">{{item.price || 'ไม่ระบุ' }} บาท</p>
                  <hr>
                  <div class="detail row m-0">
                    <div class="col-12 col-sm-6">
                      <span class="fabric-title">ผ้า: </span>
                      <span class="fabric-content">{{ item.fabric || 'ไม่ระบุ' }}</span>
                    </div>
                    <span class="color-orange1 d-none d-sm-block">|</span>
                    <div class="col-12 col-sm-6">
                      <span class="color-title">สี:</span>
                      <span class="color-box" :style="{background: item.category.color.hex || '#ccc'}"></span>
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="button">Buy</div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Loading from '../Loading';
import { mapGetters, mapActions, mapMutations } from "vuex"
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
    }
  },

  ///
  // Watch
  ///

  ///
  // Mounted
  ///
  mounted() {},

  ///
  // Methods
  ///
  methods: {
    ...mapGetters(["storeData", "loadingData"])
  },

  ///
  // Component
  ///
  components: {
    Loading
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease-in;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
