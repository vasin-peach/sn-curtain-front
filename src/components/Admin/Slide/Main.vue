<template>
  <div
    class="admin-slide"
    ref="admin_container"
  >

    <transition
      name="fade"
      mode="out-in"
    >

      <div
        v-if="loading.state"
        :style="{height: loading.height + 'px'}"
      >
        <loading class="card-loading"></loading>
      </div>

      <div
        class="admin-slide-container row m-0"
        key="admin-slide"
        v-else
      >

        <SlideMain :data="{slideAllData, slideMainData, slideSubData}"></SlideMain>
        <SlideSup :data="{slideAllData, slideMainData, slideSubData}"></SlideSup>

      </div>

    </transition>

  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import Loading from "../../Loading";
import SlideMain from "./SlideMain";
import SlideSup from "./SlideSup";
export default {
  name: "admin_product",

  // ! DATA
  data() {
    return {
      loading: {
        height: 0,
        state: true
      }
    };
  },

  // ! METHODS
  methods: {
    ...mapActions(["slideAllGet"]),
    ...mapMutations([]),

    // * [TRIGGER] get slide
    triggerSlideAllGet() {
      this.slideAllGet();
      this.loading.state = false;
    }
  },

  // ! WATCH
  watch: {},

  // ! COMPUTED
  computed: {
    ...mapGetters(["slideAllData", "slideMainData", "slideSubData"])
  },

  // ! MOUNTED
  mounted() {
    this.triggerSlideAllGet();
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.$refs.admin_container) {
          this.loading.height = this.$refs.admin_container.clientHeight;
        }
      }, 2000);
    });
  },

  // ! COMPONENTS
  components: { Loading, SlideMain, SlideSup }
};
</script>

<style>
.admin-slide .container {
  width: 100%;
}

.admin-slide .container .row {
  padding-bottom: 0px !important;
}
</style>
