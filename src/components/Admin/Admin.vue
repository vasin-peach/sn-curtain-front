<template>
  <div class="admin">
    <div class="container-header row m-0">
      <div
        class="col-2 col-sm-3 col-md-2 header-profile"
        v-if="userData"
      >
        <div class="row m-0">
          <div class="col-12 col-sm-5 profile-image">
            <div>
              <img v-lazy="userData.photo">
            </div>
          </div>
          <div class="col-12 col-sm-7 profile-desc d-sm-block d-none">
            <div>
              <span>ยินดีต้อนรับ,</span><br>
              <span>{{userData.name.first_name || userData.name.display_name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col stat">
        <div class="stat-title">
          จำนวนสมาชิก
        </div>
        <div class="stat-content">
          {{ commas(memberShipData) + ' คน' }}
        </div>
      </div>
      <div class="col d-sm-block d-none stat">
        <div class="stat-title">
          ยอดรายวัน
        </div>
        <div class="stat-content">
          {{ commas(saleDayData) }}
        </div>
      </div>
      <div class="col d-sm-block d-none stat">
        <div class="stat-title">
          ยอดรายสัปดา
        </div>
        <div class="stat-content">
          {{ commas(saleWeekData) }}
        </div>
      </div>
      <div class="col d-sm-block d-none stat">
        <div class="stat-title">
          ยอดรายเดือน
        </div>
        <div class="stat-content">
          {{ commas(saleMonthData) }}
        </div>
      </div>
      <div class="col stat">
        <div class="stat-title">
          ยอดทั้งหมด
        </div>
        <div class="stat-content">
          {{ commas(saleYearData) }}
        </div>
      </div>
    </div>
    <div class="container-content">
      <div class="row m-0">
        <div class="content-menu col-2 col-sm-3 col-md-2">
          <div class="menu-label col d-none d-sm-block">
            ทั่วไป
          </div>
          <hr class="d-sm-block d-none">
          <router-link
            :to="{name: 'AdminDashboard'}"
            class="menu-list row m-0"
            id="dashboard"
          >
            <div class="col-12 col-sm-3">
              <font-awesome-icon
                icon="tachometer-alt"
                aria-hidden="true"
              />
            </div>
            <div class="col-10 col-sm d-none d-sm-block">
              แดชบอร์ด
            </div>
          </router-link>
          <router-link
            :to="{name: 'AdminSlide'}"
            class="menu-list row m-0"
            id="slide"
          >
            <div class="col-12 col-sm-3">
              <font-awesome-icon
                icon="chalkboard"
                aria-hidden="true"
              />
            </div>
            <div class="col-10 col-sm d-none d-sm-block">
              ไสลด์โชว์
            </div>
          </router-link>
          <div class="menu-label col d-none d-sm-block">
            การขาย
          </div>
          <hr>
          <router-link
            :to="{name: 'AdminProduct'}"
            class="menu-list row m-0"
            id="product"
          >
            <div class="col-12 col-sm-3">
              <font-awesome-icon
                icon="shopping-cart"
                aria-hidden="true"
              />
            </div>
            <div class="col-10 col-sm d-none d-sm-block">
              สินค้า
            </div>
          </router-link>
          <router-link
            :to="{name: 'AdminOrder'}"
            class="menu-list row m-0"
            id="order"
          >
            <div class="col-12 col-sm-3">
              <font-awesome-icon
                icon="file-invoice"
                aria-hidden="true"
              />
            </div>
            <div class="col-10 col-sm d-none d-sm-block">
              ออเดอร์
            </div>
          </router-link>
          <router-link
            :to="{name: 'AdminDiscount'}"
            class="menu-list row m-0"
            id="discount"
          >
            <div class="col-12 col-sm-3">
              <font-awesome-icon
                icon="barcode"
                aria-hidden="true"
              />
            </div>
            <div class="col-10 col-sm d-none d-sm-block">
              รหัสส่วนลด
            </div>
          </router-link>
          <!-- <router-link
            :to="{name: 'AdminBank'}"
            class="menu-list row m-0"
            id="bank"
          >
            <div class="col-12 col-sm-3">
              <font-awesome-icon
                icon="university"
                aria-hidden="true"
              />
            </div>
            <div class="col-10 col-sm d-none d-sm-block">
              การโอน
            </div>
          </router-link> -->
        </div>
        <div class="content-content col">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import $ from "jquery";
export default {
  name: "admin",
  data() {
    return {
      currentPage: "dashboard"
    };
  },
  mounted() {
    this.getMemberShip();
    this.getSaleDay();
    this.getSaleWeek();
    this.getSaleMonth();
    this.getSaleYear();
  },
  watch: {
    // $route(to, from) {
    //   let next = to.path.split("/")[to.path.split("/").length - 1];
    //   let prev = from.path.split("/")[to.path.split("/").length - 1];
    //   $(`#${prev}`).removeClass("active");
    //   $(`#${next}`).addClass("active");
    // }
  },
  methods: {
    // * Actions
    ...mapActions([
      "getMemberShip",
      "getSaleDay",
      "getSaleWeek",
      "getSaleMonth",
      "getSaleYear"
    ]),
    // * Number with comma
    commas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  computed: {
    ...mapGetters([
      "memberShipData",
      "saleDayData",
      "saleWeekData",
      "saleMonthData",
      "saleYearData",
      "userData"
    ])
  }
};
</script>

<style>
</style>
