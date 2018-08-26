<template>
  <div class="header">
    <div class="header-container bg-dark1 h-sm">
      <div class="container">
        <div class="row">
          <div class="col-0 col-md-4">
          </div>
          <div class="col-6 col-md-4 brand">
            <router-link :to="{ name: 'Landing'}">
              <img src="@image/brand.svg">
            </router-link>
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
      <div @click="menu_off()">
        <router-link :to="{ name: 'Landing' }" id="menu-1">หน้าหลัก</router-link>
        <router-link :to="{ name: 'Login' }" id="menu-2" v-if="!userData">เข้าสู่ระบบ</router-link>
        <router-link :to="{ name: 'Profile' }" id="menu-2" v-else>ข้อมูลส่วนตัว</router-link>
        <router-link :to="{ name: 'Store' }" id="menu-3">สินค้า</router-link>
        <router-link :to="{ name: 'Service' }" id="menu-4">บริการ</router-link>
        <a :href="BACKEND_URI + '/auth/logout'" id="menu-5" v-if="userData">ออกจากระบบ</a>
      </div>
    </div>
    <div class="header-fade">
    </div>
  </div>
</template>

<script>
import velocity from 'velocity-animate';
import { mapGetters } from 'vuex';
export default {
  name: 'Header',
  data() {
    return {
      menu_toggle: false,
      menu_state: false,
      BACKEND_URI: process.env.BACKEND_URI
    }
  },
  watch: {
    menu_toggle: function(status) {
      status ? this.menu_on() : this.menu_off();
    }
  },
  methods: {
    menu_on() {

        var _this = this;
        this.menu_toggle = true;

        $('.header-menu').velocity("slideDown", { duration: 300 }, [.53,.49,.18,.97]);
        $('.header-fade').velocity("slideDown", { duration: 300 }, [.53,.49,.18,.97]);
        // text animate
        $('#menu-1').velocity({ opacity: "1", top: "40px" }, { duration: 300, delay: 50, _cacheValues:false}, [.53,.49,.18,.97]);
        $('#menu-2').velocity({ opacity: "1", top: "40px" }, { duration: 300, delay: 100, _cacheValues:false}, [.53,.49,.18,.97]);
        $('#menu-3').velocity({ opacity: "1", top: "40px" }, { duration: 300, delay: 150, _cacheValues:false}, [.53,.49,.18,.97]);
        $('#menu-4').velocity({ opacity: "1", top: "40px" }, { duration: 300, delay: 200, _cacheValues:false}, [.53,.49,.18,.97]);
        $('#menu-5').velocity({ opacity: "1", top: "40px" }, { duration: 300, delay: 200, _cacheValues:false}, [.53,.49,.18,.97]);
        // $('#menu-6').velocity({ opacity: "1", top: "40px" }, { duration: 300, delay: 200, _cacheValues:false}, [.53,.49,.18,.97]);
        
        // // disable scroll
        // $('html').addClass('stop-scrolling');
        // $('html').bind('touchmove', function(e) {e.preventDefault()});

        // disable button
        this.menu_state = true;
        setTimeout(function () {
          _this.menu_state = false;
        }, 450);

    },
    menu_off() {
      
        var _this = this;
        this.menu_toggle = false;

        $('.header-menu').velocity("slideUp", { duration: 300, delay: 150 }, [.53,.49,.18,.97]);
        $('.header-fade').velocity("slideUp", { duration: 300, delay: 200 }, [.53,.49,.18,.97]);
        // text animate
        $('#menu-1').velocity({ opacity: "0", top: "0px" }, { duration: 250}, [.53,.49,.18,.97]);
        $('#menu-2').velocity({ opacity: "0", top: "0px" }, { duration: 300}, [.53,.49,.18,.97]);
        $('#menu-3').velocity({ opacity: "0", top: "0px" }, { duration: 350}, [.53,.49,.18,.97]);
        $('#menu-4').velocity({ opacity: "0", top: "0px" }, { duration: 400}, [.53,.49,.18,.97]);
        $('#menu-5').velocity({ opacity: "0", top: "0px" }, { duration: 400}, [.53,.49,.18,.97]);
        // $('#menu-6').velocity({ opacity: "0", top: "0px" }, { duration: 400}, [.53,.49,.18,.97]);

        // // enable scroll
        // $('html').removeClass('stop-scrolling');
        // $('html').unbind('touchmove');

        // disable button
        this.menu_state = true;
        setTimeout(function () {
          _this.menu_state = false;
        }, 450);
    }
  },
  computed: {
    ...mapGetters(['userData'])
  }
}
</script>

<style>
</style>
