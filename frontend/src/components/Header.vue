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
          <a href="#" id="menu-1">หน้าหลัก</a>
        </li>
        <li>
          <a href="#" id="menu-2">บริการ</a>
        </li>
        <li>
          <a href="#" id="menu-3">สินค้า</a>
        </li>
        <li>
          <a href="#" id="menu-4">ติดต่อ</a>
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

      // Menu On
      if (status) {
        headerMenu.velocity("finish", true).velocity("slideDown", { duration: 300 }, [.53,.49,.18,.97]);
        headerFade.velocity("finish", true).velocity("slideDown", { duration: 300 }, [.53,.49,.18,.97]);
        // text animate
        $('#menu-1').velocity("finish", true).velocity({ opacity: "1", top: "40px" }, { duration: 300, delay: 50, _cacheValues:false}, [.53,.49,.18,.97]);
        $('#menu-2').velocity("finish", true).velocity({ opacity: "1", top: "40px" }, { duration: 350, delay: 100, _cacheValues:false}, [.53,.49,.18,.97]);
        $('#menu-3').velocity("finish", true).velocity({ opacity: "1", top: "40px" }, { duration: 400, delay: 150, _cacheValues:false}, [.53,.49,.18,.97]);
        $('#menu-4').velocity("finish", true).velocity({ opacity: "1", top: "40px" }, { duration: 450, delay: 200, _cacheValues:false}, [.53,.49,.18,.97]);
        
        // disable scroll
        $('html').addClass('stop-scrolling');
        $('html').bind('touchmove', function(e) {e.preventDefault()});

      // Menu Off
      } else {
        headerMenu.velocity("finish", true).velocity("slideUp", { duration: 300, delay: 150 }, [.53,.49,.18,.97]);
        headerFade.velocity("finish", true).velocity("slideUp", { duration: 300, delay: 250 }, [.53,.49,.18,.97]);
        // text animate
        $('#menu-1').velocity("finish", true).velocity({ opacity: "0", top: "0px" }, { duration: 150}, [.53,.49,.18,.97]);
        $('#menu-2').velocity("finish", true).velocity({ opacity: "0", top: "0px" }, { duration: 200}, [.53,.49,.18,.97]);
        $('#menu-3').velocity("finish", true).velocity({ opacity: "0", top: "0px" }, { duration: 250}, [.53,.49,.18,.97]);
        $('#menu-4').velocity("finish", true).velocity({ opacity: "0", top: "0px" }, { duration: 300}, [.53,.49,.18,.97]);

        // enable scroll
        $('html').removeClass('stop-scrolling');
        $('html').unbind('touchmove');
      }
    }
  }
}
</script>

<style>
</style>
