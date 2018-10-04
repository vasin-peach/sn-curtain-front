<template>
  <div id="productview">
    <!-- Popup -->
    <div class="popup-container" v-show="popupAuthData">
      <login class="float"></login>
    </div>
    <div class="container">
      <div class="row product-container" v-if="productData">
        <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 product-show">
          <div style="height: 70vh">
            <!-- swiper1 -->
            <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
              <swiper-slide v-if="item.src" v-for="(item, index) in productData[0].assets" :key="index" :style="{'background-image' : 'url('+ item.src +')'}" style="display: block"></swiper-slide>
              <swiper-slide v-else v-for="(item) in [1,2,3,4,5]" :key="item" style="background-image: url('/static/images/lazy/lazyload.svg')"></swiper-slide>
              <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
              <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            </swiper>
            <!-- swiper2 Thumbs -->
            <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
              <swiper-slide v-if="item.src" v-for="(item, index) in productData[0].assets" :key="index" :style="{'background-image' : 'url('+ item.src +')'}" style="display: block"></swiper-slide>
              <swiper-slide v-else v-for="(item) in [1,2,3,4,5]" :key="item" style="background-image: url('/static/images/lazy/lazyload.svg')"></swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="col-12 col-sm-12 col-md col-lg col-xl product-detail right">
          <div style="min-height: 60vh">
            <div class="title">
              {{ productData[0].name }}
            </div>
            <hr>
            <div class="price">
              ฿{{ buyOption }}
            </div>
            <div class="detail">
              {{ productData[0].desc[0].val }}
            </div>
            <div class="amount">
              <div class="amount-wrapper">
                <div class="">
                  <div class="minus" @click="amount > 1 ? amount -= 1 : amount">
                    -
                  </div>
                  <div class="num">
                    {{ amount }}
                  </div>
                  <div class="plus" @click="amount < productData[0].quantity ? amount += 1 : amount">
                    +
                  </div>
                </div>
                <div class="">
                  จำนวน
                </div>
              </div>
            </div>
            <div class="option-container">
              <div class="option-block">
                <div>ตัวเลือก</div>
                <b-form-select v-model="buyOption" :options="productData ? productData[0].price : {text: 'LOADING...'}"></b-form-select>
              </div>
            </div>
            <div class="button buy font-bourbon" @click="productToBasket()">หยิบลงตะกร้า</div>
            <div class="other">
              <div class="other-container">
                <div class="other-box">
                  <div>
                    ลักษณะ:
                  </div>
                  <div class="color">
                    <div v-for="item in productData[0].category.type.nature" :key="item.val">
                      <div class="color-box tooltip-container" :style="{background: /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(item.option) ? item.option : '#ccc'}">
                        <span class="tooltip-text">{{item.text}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="other-box">
                  <div>
                    ประเภท:
                  </div>
                  <div>
                    {{productData[0].category.val}}
                  </div>
                </div>
                <div class="other-box">
                  <div>
                    ชนิด:
                  </div>
                  <div>
                    {{productData[0].category.type.val}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "../Auth/LoginForm";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "ProductView",
  ///
  // Data
  ///
  data() {
    return {
      id: null,
      amount: 1,
      buyOption: 0,
      swiperOptionTop: {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        slidesPerView: 4,
        touchRatio: 0.2,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        slideToClickedSlide: true
      },
      swiperSlides: [1, 2, 3, 4, 5]
    };
  },

  ///
  // Mounted
  ///
  mounted() {
    // init product id
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      this.productGet(this.id).then(() => {
        this.initSwiper();
      });
    }
  },

  ///
  // Watch
  ///
  watch: {
    "$route.params.id": function(id) {
      this.id = this.$route.params.id;
      this.productGet(this.id).then(() => {
        this.initSwiper();
      });
    },
    productData: function(data) {
      this.buyOption = data[0].price[0].value;
    }
  },

  ///
  // Computed
  ///
  computed: {
    ...mapGetters(["productData", "userData", "popupAuthData"])
  },

  ///
  // Methods
  ///
  methods: {
    ...mapActions(["productGet"]),
    ...mapMutations(["basketUpdate", "popupAuthUpdate"]),
    initSwiper() {
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.swiper;
        const swiperThumbs = this.$refs.swiperThumbs.swiper;
        swiperTop.controller.control = swiperThumbs;
        swiperThumbs.controller.control = swiperTop;
      });
    },
    productToBasket() {
      var user = this.userData;
      // if user is empty
      if (_.isEmpty(user)) {
        this.popupAuthUpdate(true);
        return;
      }

      if (localStorage.basket === "undefined" || !localStorage.basket) {
        localStorage.setItem("basket", JSON.stringify([]));
      }

      // set basket to array if basket is empty.
      var oldItems = JSON.parse(localStorage.getItem("basket"));

      // init data in payload
      var payload = {
        id: this.productData[0]._id,
        amount: this.amount,
        buyOption: this.buyOption,
        data: this.productData[0]
      };

      // payload into localStorage.basket
      if (_.isEmpty(localStorage.basket)) {
        this.updateBasket(oldItems, payload);
      } else {
        // same item but diffirent amount
        var getIndex = oldItems.findIndex(
          item => item.id == payload.id && item.amount != payload.amount
        );
        if (getIndex >= 0) {
          // remove array by index
          oldItems.splice(getIndex, 1);
          this.updateBasket(oldItems, payload);
        }

        // check item was exist then push
        var temp = oldItems.find((item, index) => {
          return item.id === payload.id;
        });

        if (!temp) {
          this.updateBasket(oldItems, payload);
        }
      }
    },
    updateBasket(oldItems, payload) {
      oldItems.push(payload);
      localStorage.setItem("basket", JSON.stringify(oldItems));
      this.basketUpdate(JSON.parse(localStorage.getItem("basket")));
    }
  },

  ///
  // Components
  ///
  components: {
    swiper,
    swiperSlide,
    Login
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  background-color: transparent;
}
.gallery-thumbs .swiper-slide {
  cursor: pointer !important;
}
.swiper-slide {
  background-size: cover;
  background-position: center;
}
.gallery-top {
  height: 80% !important;
  width: 100%;
}
.gallery-thumbs {
  height: 20% !important;
  box-sizing: border-box;
  padding: 10px 0;
}
.gallery-thumbs .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}
.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
</style>
