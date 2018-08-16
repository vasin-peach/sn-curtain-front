<template>
  <div class="basket">
    Basket Naja
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Basket",
  ///
  // Data
  ///
  data() {
    return {};
  },

  ///
  // Mounted
  ///
  mounted() {
    this.basketGet("basket");
  },
  ///
  // Methods
  ///
  methods: {
    ...mapActions(["basketGet"])
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
</style>
