<template>
  <div class="loading-warpper container">
    <div class="fingerprint-spinner" :class="{'fail': loadingData().store == 'fail', 'notfound': loadingData().store == 'notfound'}">
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="title color-red1" v-if="loadingData().store == 'fail'">ไม่สามารถเชื่อมต่อได้</div>
      <div class="title color-red2 no-animate" v-else-if="loadingData().store == 'notfound'">ไม่พบสินค้า</div>
      <div class="title" v-else>LOADING</div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: 'loading',
  methods: {
    ...mapGetters(['loadingData'])
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
