<template>
  <div class="product">
    <ProductView></ProductView>
    <div class="container"><hr></div>
    <Section4></Section4>
    <Section6></Section6>
  </div>
</template>

<script>
import ProductView from './ProductView';
import Section4 from '../Landing/Section4';
import Section6 from '../Landing/Section6';
export default {
  name: "Product",
  ///
  // Component
  ///
  components: {
    ProductView,
    Section4,
    Section6
  }
}
</script>

<style>
</style>
