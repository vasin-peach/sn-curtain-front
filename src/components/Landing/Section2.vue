<template>
  <div class="section2">
    <div class="container">
      <div class="row category-container d-flex justify-content-between">
        <div class="col-4 col-md-2 category-box fade" v-for="(item, index) in category" :key="index">
          <router-link :to="{ name: 'Store-Filter', params: { category: item.params} }">
            <div class="category-content">
              <img v-lazy="'/static/images/category/' + item.name" :alt="item.name">
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
import ScrollMagic from "scrollmagic";
export default {
  name: "Section2",
  data() {
    return {
      category: [
        {
          name: "category-01.png",
          params: "ประเภท1",
          title: "ม่านเลื่อน"
        },
        {
          name: "category-02.png",
          params: "ประเภท1,ชนิด2",
          title: "ม่านพับ"
        },
        {
          name: "category-03.png",
          params: "ประเภท1,ชนิด3",
          title: "ม่านคอกระเช้า"
        },
        {
          name: "category-04.png",
          params: "ประเภท2",
          title: "ม่านตาไก่"
        },
        {
          name: "category-05.png",
          params: "ประเภท2,ชนิด1",
          title: "ม่านตาไก่"
        },
        {
          name: "category-06.png",
          params: "ประเภท2,ชนิด2",
          title: "ม่านตาไก่"
        }
      ]
    };
  },
  mounted() {
    $(function() {
      // init scrollmagic
      var controller = new ScrollMagic.Controller();

      // build scene with loop
      $(".fade").each(function() {
        var categoryScene = new ScrollMagic.Scene({
          triggerElement: this,
          triggerHook: 1,
          reverse: false
        })
          .setClassToggle(this, "fade-in")
          .addTo(controller);
      });
    });
  }
};
</script>

<style>
</style>
