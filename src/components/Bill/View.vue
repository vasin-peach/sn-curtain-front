<template>
  <div class="Bill_View">
    Bill View
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Bill_View',
  mounted() {
    
    // check params is exist
    if (this.$route.params.id) {

      // init order id
      this.order_id = this.$route.params.id;
      this.orderGetById(this.order_id).then((resp) => { // get order detail from backend
        console.log(resp);
      }, (err) => {
        console.log(err);
      });

    }
  },
  data() {
    return {
      order_id: null
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    ...mapActions(['orderGetById'])
  }
}
</script>

<style>
</style>
