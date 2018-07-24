<template>
  <div class="section2">
    <div class="container">
      <div class="row category-container">
        <div class="col-4 col-md-2 category-box fade" v-for="(item, index) in category" :key="index">
          <router-link :to="{ name: 'Store' }">
            <div class="category-content">
              <img :src="'/static/images/category/' + item.name">
            </div>
            <div class="category-title">
              {{ item.title }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollMagic from 'scrollmagic';
export default {
  name: 'Section2',
  data() {
    return {
      category: [
        {
        name: 'category-01.png',
        title: 'ม่านตาไก่'
        },
        {
        name: 'category-02.png',
        title: 'ม่านตาไก่'
        },
        {
        name: 'category-03.png',
        title: 'ม่านตาไก่'
        },
        {
        name: 'category-04.png',
        title: 'ม่านตาไก่'
        },
        {
        name: 'category-05.png',
        title: 'ม่านตาไก่'
        },
        {
        name: 'category-06.png',
        title: 'ม่านตาไก่'
        },
      ]
    }
  },
  mounted() {
    $(function() {
      // init scrollmagic
      var controller = new ScrollMagic.Controller();

        // build scene with loop
        $('.fade').each(function() {
          var categoryScene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 1,
            // reverse: false
          })
          .setClassToggle(this, 'fade-in')
          .addTo(controller);
        })
    })
  }
}
</script>

<style>
</style>
