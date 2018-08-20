<template>
  <div class="floatbar">
    <div class="floatbar-wrapper">
      <transition name="basket">
        <div class="floatbar-basket animate" v-show="basketData.length">

          <div class="floatbar-basket-wrapper">
            <router-link :to="{ name: 'Basket' }">
              <div class="floatbar-basket-icon">
                <font-awesome-icon icon="shopping-bag" aria-hidden="true" />
                <span class="amount">
                  <div>{{basketData.length}}</div>
                </span>
              </div>
            </router-link>
          </div>

        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "FloatBar",

  ///
  // Data
  ///
  data() {
    return {};
  },

  ///
  // Watch
  ///
  watch: {
    basketData: function(data) {
      this.basketAnimate();
    }
  },
  ///
  // Mounted
  ///
  mounted() {
    if (localStorage.basket)
      this.basketUpdate(JSON.parse(localStorage.getItem("basket")));
  },

  ///
  // Methods
  ///
  methods: {
    ...mapMutations(["basketUpdate"]),
    basketAnimate() {
      var basket = $(".floatbar-basket");
      $(".floatbar-basket").removeClass("animate");
      setTimeout(function() {
        $(".floatbar-basket").addClass("animate");
      }, 100);
    }
  },

  ///
  // Computed
  ///
  computed: {
    ...mapGetters(["basketData"])
  }
};
</script>

<style>
.basket-enter-active,
.basket-leave-active {
  transition: 0.3s ease;
}
.basket-enter,
.basket-leave-to {
  opacity: 0;
}
</style>
