<template>
  <div class="section5">
    <div class="section-break"></div>
    <div class="container">
      <div class="about-container" id="project01">
        <div class="fade">
          <div class="about-title">
            เราเป็นโรงงานผ้าม่าน ที่ทำเอง มีผ้าและอุปกรณ์เป็นของตัว <br> มีความเป็นมาตราฐานในการตัดเย็บ <br> ประสบการณ์มากกว่า 20ปี
          </div>
          <div class="about-title-img">
            <!-- <img v-lazy="'/static/images/icon/checked.svg'"> -->
          </div>
        </div>
        <div class="about-content">
          <div class="hr-half">
            <div id="dot"></div>
            <div id="line-bottom"></div>
          </div>
          <ul class="p-0">
            <li class="row" id="content1">
              <div class="col-12 col-7 col-sm-7 text-fade1">
                <div class="img" id="img1"></div>
              </div>
              <div class="col text-fade1">
                <p>ผ้าม่าน S&N</p>
                <span>เราเป็นโรงงานผ้าม่าน ที่ทำเอง มีผ้าและอุปกรณ์เป็นของตัวเอง ผ้าม่าน วอล์เปเปอร์ ฉากกั้นแอร์ มู่ลี่ ม่านม้วน ม่านปรับแสง (รับซักผ้าม่าน) มีความเป็นมาตราฐานในการตัดเย็บ ประสบการณ์มากกว่า 20ปี จึงมั่นใจได้ว่าเราจะบริการทุกท่านด้วยความเต็มใจ </span>
              </div>
            </li>
            <div class="hr-half">
              <div id="dot"></div>
              <div id="line-top"></div>
              <div id="line-bottom"></div>
            </div>
            <li class="row" id="content2">
              <div class="col order-12 order-sm-1 text-fade1">
                <p>ถูก เร็ว ดี</p>
                <span>ถูก เพราะ เรามีผ้าและอุปกรณ์ในสต็อกเอง เร็ว เพราะ เราทำเองทุกขั้นตอนไม่เสียเวลาส่งงานต่อเนื่องจากเรามีครบในที่เดียว เรามีมาตราฐานในการตัดเย็บ (ทำไม่สวยเราไม่ทำ) </span>
              </div>
              <div class="col-12 col-7 col-sm-7 order-1 text-fade1">
                <div class="img" id="img2"></div>
              </div>
            </li>
          </ul>
          <div class="hr-half w-100">
            <div id="dot"></div>
            <div id="line-top"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollMagic from 'scrollmagic';
import Paroller from 'paroller.js';
export default {
  name: 'Section5',
    mounted() {
    $(function() {
      // init scrollmagic
      var controller = new ScrollMagic.Controller();

        // build scene with loop
        $('.text-fade1').each(function() {
          var categoryScene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 1,
            reverse: false
          })
          .setClassToggle(this, 'active')
          .addTo(controller);
        })

        $('fade').each(function() {
          var categoryScene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 1,
            reverse: false
          })
          .setClassToggle(this, 'fade-in')
          .addTo(controller);
        })

        var windowSize = $(window).width();
        if (windowSize > 576) {
          $('#content1').paroller({
            factor: -0.05,
            factorXs: 0,
            type: 'foreground',
            direction: 'horizontal'
          });
          $('#content2').paroller({
            factor: 0.05,
            factorXs: 0,
            type: 'foreground',
            direction: 'horizontal'
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

    })
  }
}
</script>

<style>
</style>
