<template>
  <div class="section6">
    <div class="container">
      <div class="map-container row m-0">
        <div class="map-bars col-md-5 col-lg-4">
          <ul class="p-0">
            <div class="map-title font-bourbon fade">S&N CURTAIN</div>
            <li class="row m-0 fade">
              <div class="col-2 col-sm-2 col-md-3 col-lg-2">
                <img v-lazy="'/static/images/icon/marker.svg'" alt="market">
              </div>
              <div class="col flex align-center font-mitr">
                18 ถนน หทัยมิตร แขวง ทรายกองดิน เขต คลองสามวา กรุงเทพมหานคร 10510
              </div>
            </li>
            <li class="row m-0 fade">
              <div class="col-2 col-sm-2 col-md-3 col-lg-2">
                <img v-lazy="'/static/images/icon/mail.svg'" alt="mail">
              </div>
              <div class="col flex align-center font-mitr">
                curtain9@gmail.com
              </div>
            </li>
            <li class="row m-0 fade">
              <div class="col-2 col-sm-2 col-md-3 col-lg-2">
                <img v-lazy="'/static/images/icon/mobile.svg'" alt="mobile">
              </div>
              <div class="col flex align-center font-mitr">
                089 796 3038
              </div>
            </li>
          </ul>
        </div>
        <div class="map-content col fade">
          <iframe title="googlemap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.65377662837!2d100.72865131439063!3d13.85980919851661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d64b5b43c2f63%3A0xad39a89da2f8b3c7!2z4Lic4LmJ4Liy4Lih4LmI4Liy4LiZIFMmTg!5e0!3m2!1sth!2sth!4v1532175295486" style="border:0" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollMagic from 'scrollmagic';
export default {
  name: 'Section6',
  mounted() {
    // init scrollmagic
      var controller = new ScrollMagic.Controller();
              $('fade').each(function() {
          var categoryScene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 1,
            reverse: false
          })
          .setClassToggle(this, 'fade-in')
          .addTo(controller);
        })
  }
}
</script>

<style>
</style>
