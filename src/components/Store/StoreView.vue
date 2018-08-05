<template>
  <div id="storeview">
    <transition name="loadfade" mode="out-in">
      <div class="loading-container loading-store position-relative" v-if="!storeData() || loadingData().store">
        <loading></loading>
      </div>
      <div class="store-container container" v-else>
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
.loadfade-enter-active,
.loadfade-leave-active {
  transition: opacity 2s;
}

.loadfade-enter,
.loadfade-leave-to {
  opacity: 0;
}
</style>
