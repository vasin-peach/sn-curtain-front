<template>
  <div class="section2">
    <div class="container">
      <div class="row category-container d-flex justify-content-between">
        <div
          class="col-3 col-md-2 category-box fade"
          v-for="(item, index) in category"
          :key="index"
        >
          <router-link :to="{ name: 'Store-Filter', params: { category: item.params} }">
            <div class="category-content">
              <img
                v-lazy="'/static/images/category/' + item.name"
                :alt="item.name"
              >
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
          name: "new-category-01.png",
          params: "ผ้าม่าน,ม่านตาไก่",
          title: "ม่านตาไก่"
        },
        {
          name: "new-category-02.png",
          params: "ผ้าม่าน,ม่านจีบ",
          title: "ม่านจีบ"
        },
        {
          name: "new-category-03.png",
          params: "ผ้าม่าน,ม่านพับ",
          title: "ม่านพับ"
        },
        {
          name: "new-category-04.png",
          params: "ผ้าม่าน,ม่านคอกระเช้า",
          title: "ม่านคอกระเช้า"
        },
        {
          name: "new-category-05.png",
          params: "ผ้าม่าน,ม่านหลุย",
          title: "ม่านหลุย"
        },
        {
          name: "new-category-06.png",
          params: "ผ้าม่าน,ม่านมู่ลี่",
          title: "ม่านมู่ลี่"
        },
        {
          name: "new-category-07.png",
          params: "ผ้าม่าน,ม่านม้วน",
          title: "ม่านม้วน"
        },
        {
          name: "new-category-08.png",
          params: "ผ้าม่าน,ม่านกั้นแอร์",
          title: "ม่านกั้นแอร์"
        },
        {
          name: "new-category-09.png",
          params: "ผ้าม่าน,ม่านลอน",
          title: "ม่านลอน"
        },
        {
          name: "new-category-10.png",
          params: "วอลล์เปอเปอร์",
          title: "วอลล์เปอเปอร์"
        },
        {
          name: "new-category-11.png",
          params: "ผ้าม่าน,มุ้งลวด-มุ้งจีบ",
          title: "มุ้งลวด-มุ้งจีบ"
        },
        {
          name: "new-category-12.png",
          params: "อุปกรณ์",
          title: "อุปกรณ์ม่าน"
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
