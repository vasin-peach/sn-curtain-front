<template>
  <div class="section5">
    <div class="section-break"></div>
    <div class="container">
      <div
        class="about-container"
        id="project01"
      >
        <div class="fade">
          <div class="about-title">
            เราเป็นโรงงานผ้าม่าน ตัดเย็บเอง นำเข้าผ้าและอุปกรณ์ด้วยตัวเอง <br> มีความเป็นมาตรฐานในการตัดเย็บ <br> ประสบการณ์มากกว่า 20ปี
          </div>
          <div class="about-title-img">
            <!-- <img v-lazy="'/static/images/icon/checked.svg'"> -->
          </div>
        </div>
        <div class="about-content fade">
          <div class="hr-half">
            <div class="dot"></div>
            <div class="line-bottom"></div>
          </div>
          <ul class="p-0">
            <li
              class="row"
              id="content1"
            >
              <div class="col-12 col-7 col-sm-7">
                <img
                  v-lazy="'static/images/test/test_01.jpg'"
                  alt="test1"
                >
              </div>
              <div class="col">
                <p class="font-bourbon">เราคือใคร?</p>
                <span>เราเป็นโรงงานผ้าม่าน ที่ทำเอง มีผ้าและอุปกรณ์เป็นของตัวเอง ผ้าม่าน วอล์เปเปอร์ ฉากกั้นแอร์ มู่ลี่ ม่านม้วน ม่านปรับแสง (รับซักผ้าม่าน) มีความเป็นมาตรฐานในการตัดเย็บ ประสบการณ์มากกว่า 20ปี ด้วยความเข้าใจในความต้องการของลูกค้า เราจึงคัดสรรวัตถุดิบที่มีคุณภาพในราคาถูก เพื่อตอบสนองความต้องการของลูกค้าในทุกระดับ ดังนั้นลูกค้าจึงมั่นใจได้ว่าเราจะบริการทุกท่านด้วยความเต็มใจ </span>
              </div>
            </li>
            <div class="hr-half">
              <div class="dot"></div>
              <div class="line-top"></div>
              <div class="line-bottom"></div>
            </div>
            <li
              class="row"
              id="content2"
            >
              <div class="col order-12 order-sm-1">
                <p class="font-bourbon">ถูก เร็ว ดี</p>
                <span><b>ถูก</b> เพราะ เรามีผ้าและอุปกรณ์ในสต็อกเอง <br><b>เร็ว</b> เพราะ เราทำเองทุกขั้นตอนไม่เสียเวลาส่งงานต่อเนื่องจากเรามีครบจบในที่เดียว <br><b>ดี</b> เพราะคุณภาพของสินค้า เราควบคุมเองทั้งหมด จึงมั่นใจได้ว่าสินค้าแต่ละชิ้นนั้นถูกผลิตอย่างดีที่สุด.</span>
              </div>
              <div class="col-12 col-7 col-sm-7 order-1">
                <img
                  v-lazy="'static/images/test/test_03.jpg'"
                  alt="test2"
                >
              </div>
            </li>
          </ul>
          <div class="hr-half w-100">
            <div class="dot"></div>
            <div class="line-top"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollMagic from "scrollmagic";
import Paroller from "paroller.js";
export default {
  name: "Section5",
  mounted() {
    $(function() {
      // init scrollmagic
      var controller = new ScrollMagic.Controller();

      // build scene with loop
      $(".text-fade1").each(function() {
        var categoryScene = new ScrollMagic.Scene({
          triggerElement: this,
          triggerHook: 1,
          reverse: false
        })
          .setClassToggle(this, "active")
          .addTo(controller);
      });

      $("fade").each(function() {
        var categoryScene = new ScrollMagic.Scene({
          triggerElement: this,
          triggerHook: 1,
          reverse: false
        })
          .setClassToggle(this, "fade-in")
          .addTo(controller);
      });

      var windowSize = $(window).width();
      if (windowSize > 576) {
        $("#content1").paroller({
          factor: -0.05,
          factorXs: 0,
          type: "foreground",
          direction: "horizontal"
        });
        $("#content2").paroller({
          factor: 0.05,
          factorXs: 0,
          type: "foreground",
          direction: "horizontal"
        });
      } else {
        // $('#content1 .img').paroller({
        //   factor: 0,
        //   type: 'background',
        //   direction: 'vertical'
        // });
        // $('#content2 .img').paroller({
        //   factor: 0,
        //   type: 'background',
        //   direction: 'vertical'
        // });
      }
    });
  }
};
</script>

<style>
</style>
