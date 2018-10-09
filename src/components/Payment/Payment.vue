<template>
  <div class="payment">
    Payment
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "Payment",
  methods: {
    ...mapActions(['createToken']),
  },
  created() {
    this.createToken();
  }
}
</script>

<style>
</style>
