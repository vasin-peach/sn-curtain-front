<template>
  <div class="store">
    <SearchBar></SearchBar>
    <StoreView></StoreView>
    <Section2></Section2>
    <Section6></Section6>
  </div>
</template>

<script>
///
// Import
///
import SearchBar from './SearchBar';
import StoreView from './StoreView';
import Section2 from '../Landing/Section2';
import Section6 from '../Landing/Section6';

export default {
  ///
  // Name
  ///
  name: "Store",

  ///
  // Data
  ///
  data() {
    return {}
  },

  ///
  // Mounted
  ///
  mounted() {},

  ///
  // Methods
  ///
  methods: {},

  ///
  // Component
  ///
  components: {
    SearchBar,
    StoreView,
    Section2,
    Section6
  }
}
</script>

<style>
.section2 {
  box-shadow: none !important;
}
</style>
