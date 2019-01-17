<template>
  <div
    class="admin-dashboard"
    ref="admin_container"
  >

    <transition
      name="fade"
      mode="out-in"
    >

      <div
        v-if="loadingState"
        :style="{height: loadingHeight + 'px'}"
      >
        <loading class="card-login"></loading>
      </div>

      <div
        class="admin-dashboard-container row m-0"
        key="admin-dashboard"
        v-else
      >
        <div class="admin-dashboard-left card-container col">
        </div>

      </div>

    </transition>

  </div>
</template>

<script>
import Loading from "../Loading";
import Chart from 'chart.js';
import { mapActions, mapGetters } from "vuex";
export default {
  name: "dashboard",
  data() {
    return {
      loadingState: true,
      loadingHeight: 0
    };
  },

  // !METHODS
  methods: {
    ...mapActions(["productAll"]),

    // * [TRIGGER] get product
    async triggerProductGet() {
      await this.productAll();
      this.loadingState = false;
    }
  },

  // ! COMPUTED
  computed: {
    ...mapGetters(["productAllData"])
  },

  // ! MOUNTED
  mounted() {
    // * Trigger get product
    this.triggerProductGet();

    // * init loading height
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.$refs.admin_container) {
          this.loadingHeight = this.$refs.admin_container.clientHeight;
        }
      }, 2000);
    });
  },

  // ! COMPONENTS
  components: { Loading }
};
</script>

<style>
</style>
