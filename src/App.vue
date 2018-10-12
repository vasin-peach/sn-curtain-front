<template>
  <div id="app">
    <router-view name="header" />
    <router-view name="body" />
    <router-view name="footer" />
    <router-view name="floatbar" />
  </div>
</template>

<script>
import TweenMax from "gsap/TweenMax";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { mapActions } from 'vuex';
export default {
  name: "App",
  methods: {
    ...mapActions(['csrfGet'])
  },
  mounted() {
    this.csrfGet();
  },
};
</script>

<style>
</style>
