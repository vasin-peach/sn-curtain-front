<template>
  <div id="storeview">
    <transition name="fade" mode="out-in">
      <div v-if="!storeData() || loadingData().store">
        <loading></loading>
      </div>
      <div class="store-container container" v-else key="content">
        <div v-for="(item, count) in storeData()" :key="count">
          {{ item }}
        </div>
      </div>
    </transition>
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
