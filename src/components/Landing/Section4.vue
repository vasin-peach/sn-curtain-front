<template>
  <div class="section4">
    <div class="container">
      <div class="product-header">
        <span>สินค้าแนะนำ -
          <b>
            <router-link
              :to="{ name: 'Store' }"
              class="color-dark2 font-weight-bold"
            >ดูสินค้าทั้งหมด</router-link>
          </b>
        </span>
        <hr class="mt-1">
      </div>
      <div class="product-container">

        <transition
          name="fade"
          mode="out-in"
        >
          <div v-if="!storePopularData() || loadingData().storePopular">
            <loading></loading>
          </div>
          <div
            class="row"
            v-else
            key="content"
          >
            <div
              class="col-sm-6 product-item"
              v-for="(item, index) in storePopularData()"
              :key="index"
            >
              <router-link :to="{ name: 'Product', params: { id: item._id } }">
                <div class="row m-0">
                  <div class="col-6 col-sm-12 col-md-4 product-content">
                    <p class="text">{{item.name}}</p>
                    <p>฿{{item.price[0].value}}</p>
                    <div class="button">ดูสินค้า</div>
                  </div>
                  <div class="col order-first product-img">
                    <img
                      v-lazy="item.brand.src"
                      :alt="item.name"
                    >
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </transition>
      </div>
      <div class="product-footer">
        <hr class="bg-dark1">
        <router-link :to="{ name: 'Store' }">
          <div class="dot"></div>
          <p>MORE</p>
          <span>สินค้าเพิ่มเติม</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../Loading";
import { mapGetters, mapActions } from "vuex";
import ScrollMagic from "scrollmagic";
import keys from "../../../config/dev.env.js";
export default {
  name: "Section4",
  data() {
    return {
      config: null
    };
  },
  mounted() {
    // Init Popular product
    if (!this.storePopularData()) {
      this.storePopularGet();
    }

    // Init scrollmagic
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
  },
  methods: {
    ...mapActions(["storePopularGet"]),
    ...mapGetters(["storePopularData", "loadingData"])
  },
  components: {
    Loading
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease-in;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
