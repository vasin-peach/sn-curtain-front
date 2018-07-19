<template>
  <div id="landing">
    <section1></section1>
    <section2></section2>
    <section3></section3>
    <section4></section4>
  </div>
</template>

<script>
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
export default {
  name: 'Landing',

  components: {
    Section1,
    Section2,
    Section3,
    Section4,
  }
}
</script>

<style>
</style>
