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
            <input type="checkbox" id="menu-toggle" v-model="menu_toggle" :disabled="menu_state">
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
      menu_toggle: false,
      menu_state: false,
    }
  },
  watch: {
    menu_toggle: function(status) {
      var _this = this;

      // Menu On
      if (status) {
        $('.header-menu').velocity("slideDown", { duration: 300 }, [.53,.49,.18,.97]);
        $('.header-fade').velocity("slideDown", { duration: 300 }, [.53,.49,.18,.97]);
        // text animate
        $('#menu-1').velocity({ opacity: "1", top: "40px" }, { duration: 300, delay: 50, _cacheValues:false}, [.53,.49,.18,.97]);
        $('#menu-2').velocity({ opacity: "1", top: "40px" }, { duration: 300, delay: 100, _cacheValues:false}, [.53,.49,.18,.97]);
        $('#menu-3').velocity({ opacity: "1", top: "40px" }, { duration: 300, delay: 150, _cacheValues:false}, [.53,.49,.18,.97]);
        $('#menu-4').velocity({ opacity: "1", top: "40px" }, { duration: 300, delay: 200, _cacheValues:false}, [.53,.49,.18,.97]);
        
        // disable scroll
        $('html').addClass('stop-scrolling');
        $('html').bind('touchmove', function(e) {e.preventDefault()});

        // disable button
        this.menu_state = true;
        setTimeout(function () {
          _this.menu_state = false;
        }, 450);
        
      // Menu Off
      } else {
        $('.header-menu').velocity("slideUp", { duration: 300, delay: 150 }, [.53,.49,.18,.97]);
        $('.header-fade').velocity("slideUp", { duration: 300, delay: 200 }, [.53,.49,.18,.97]);
        // text animate
        $('#menu-1').velocity({ opacity: "0", top: "0px" }, { duration: 150}, [.53,.49,.18,.97]);
        $('#menu-2').velocity({ opacity: "0", top: "0px" }, { duration: 200}, [.53,.49,.18,.97]);
        $('#menu-3').velocity({ opacity: "0", top: "0px" }, { duration: 250}, [.53,.49,.18,.97]);
        $('#menu-4').velocity({ opacity: "0", top: "0px" }, { duration: 300}, [.53,.49,.18,.97]);

        // enable scroll
        $('html').removeClass('stop-scrolling');
        $('html').unbind('touchmove');

        // disable button
        this.menu_state = true;
        setTimeout(function () {
          _this.menu_state = false;
        }, 450);

      }
    }
  }
}
</script>

<style>
</style>
