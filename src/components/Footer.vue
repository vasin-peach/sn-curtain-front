<template>
  <div class="footer">
    <div class="scrolltop-container">
      <div
        class="scrolltop"
        @click="scrollTop()"
      >
        <img
          v-lazy="'/static/images/icon/arrow-up.svg'"
          alt="arrow-up"
        >
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div
          class="col-12 col-sm-8"
          id="webcredit"
        >
          <span class="font-bourbon">Copyright &copy; 2018 S&N Curtain.</span>
        </div>
        <div
          class="col-12 col-sm"
          id="otherweb"
        >
          <div>
            <!-- <router-link
              :to="{ name: 'Policy'}"
              class="color-white1"
            >
              นโยบาย
            </router-link> -->
            <router-link
              :to="{ name: 'Rules'}"
              class="color-white1"
            >
              กฎระเบียบ
            </router-link>
          </div>
          <div>
            <a
              href="https://www.facebook.com/sekandnat/"
              target="_blank"
              rel="noopener"
            >
              <img
                v-lazy="'/static/images/icon/facebook.svg'"
                alt="facebook"
              >
            </a>
          </div>
          <div>
            <a
              href="http://line.me/ti/p/%40shinasaki"
              target="_blank"
              rel="noopener"
            >
              <img
                v-lazy="'/static/images/icon/line.svg'"
                alt="line"
              >
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TweenMax, ScrollToPlugin } from "gsap/all";
export default {
  name: "Footer",
  methods: {
    scrollTop() {
      TweenMax.to($(window), 1, {
        scrollTo: { y: 0, autoKill: true },
        ease: Power3.easeInOut,
        autoKill: true,
        overwrite: 5
      });
    }
  }
};
</script>

<style>
</style>
