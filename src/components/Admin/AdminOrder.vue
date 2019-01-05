<template>
  <div
    class="admin-order"
    ref="admin_order_container"
  >
    <transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="loadingState"
        :style="{height: loadingHeight + 'px'}"
      >
        <loading class="card-loading"></loading>
      </div>
      <div
        class="admin-order-container row m-0"
        key="admin-order"
        v-else
      >
        Hi
        {{ orderEvidenceData }}
        <hr>
        {{ orderConfirmData }}
        <hr>
        {{ orderSuccessData }}
      </div>
    </transition>
  </div>
</template>

<script>
import Loading from "../Loading";
import { mapActions, mapGetters, mapMutations } from "vuex";
import isEmpty from "lodash.isempty";
import $ from "jquery";
export default {
  // ! DATA
  data() {
    return {
      loadingHeight: 0,
      loadingState: true
    };
  },

  // ! METHODS
  methods: {
    ...mapActions(["orderAllGet"]),

    // * [Actions] trigger call `orderAllGet`
    async triggerOrderAllGet() {
      // get order
      await this.orderAllGet();

      // disable loading
      this.loadingState = false;
    }
  },

  // ! WATCH
  watch: {},

  // ! COMPUTED
  computed: {
    ...mapGetters([
      "orderAllData",
      "orderEvidenceData",
      "orderConfirmData",
      "orderSuccessData"
    ])
  },

  // ! MOUNTED
  mounted() {
    // * Init get all order
    this.triggerOrderAllGet();

    // * Init container height1
    this.$nextTick(
      () =>
        setTimeout(() => {
          if (this.$refs.admin_container) {
            this.loadingHeight = this.$refs.admin_container.clientHeight;
          }
        }),
      2000
    );
  },

  // ! COMPONENTS
  components: { Loading }
};
</script>

<style>
</style>
