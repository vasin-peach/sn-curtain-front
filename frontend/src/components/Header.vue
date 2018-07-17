<template>
  <div class="header">
    <div class="header-container bg-dark1 h-sm">
      <div class="container">
        <div class="row">
          <div class="col-0 col-md-4">
          </div>
          <div class="col-6 col-md-4 brand">
            <img src="@image/brand.svg">
          </div>
          <div class="col-6 col-md-4 menu">
            <input type="checkbox" id="menu-toggle" v-model="menu_toggle">
            <label id="trigger" for="menu-toggle"></label>
            <label id="burger" for="menu-toggle"></label>
          </div>
        </div>
      </div>
    </div>
    <div class="header-menu">
      <ul>
        <li>
          <a href="#">หน้าหลัก</a>
        </li>
        <li>
          <a href="#">บริการ</a>
        </li>
        <li>
          <a href="#">สินค้า</a>
        </li>
        <li>
          <a href="#">ติดต่อ</a>
        </li>
      </ul>
    </div>
    <div class="header-fade">
    </div>
  </div>
</template>

<script>
import velocity from 'velocity-animate';
export default {
  name: 'Header',
  data() {
    return {
      menu_toggle: false
    }
  },
  watch: {
    menu_toggle: function(status) {

      var headerMenu = $('.header-menu');
      var headerFade = $('.header-fade');

      if (status) {
        headerMenu.velocity("finish").velocity("slideDown", [.53,.49,.18,.97], { duration: 300 })
        headerFade.velocity("finish").velocity("slideDown", [.53,.49,.18,.97], { duration: 300 })
        // disable scroll
        $('html').addClass('stop-scrolling');
        $('html').bind('touchmove', function(e) {e.preventDefault()});
      } else {
        headerMenu.velocity("finish").velocity("slideUp", [.53,.49,.18,.97], { duration: 300 })
        headerFade.velocity("finish").velocity("slideUp", [.53,.49,.18,.97], { duration: 300 })
        // enable scroll
        $('html').removeClass('stop-scrolling');
        $('html').unbind('touchmove');
      }

      // if (status) {
      //   headerMenu.velocity("finish").velocity("slideDown", [500, 20], { duration: 300})
      //   headerFade.velocity("finish").velocity("slideDown", [500, 20], { duration: 300})
      // } else {
      //   headerMenu.velocity("finish").velocity("slideUp", [500, 20], { duration: 300})
      //   headerFade.velocity("finish").velocity("slideUp", [500, 20], { duration: 300})
      // }
    }
  }
}
</script>

<style>
</style>
