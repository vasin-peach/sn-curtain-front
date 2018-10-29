<template>
  <div class="profile-order">
    <div class="profile-order-container">
      <div class="profile-order-list" v-for="(items, id) in order_data" :key="items._id" v-b-toggle="'order-list-collapse-' + id">
        <div class="row m-0">
          <div class="col-5">
            รายการ: {{ makePad(items._id, 7) }}
          </div>
          <div class="col">
            สถาณะ: {{ items.order_status }}
          </div>
          <div class="col">
            {{ makeDate(items.created_at) }}
          </div>
        </div>

        <b-collapse class="row m-0 profile-order-collapse" :id="'order-list-collapse-' + id">
          <div class="col-12">
            <hr>
          </div>
          <div class="col">
            <router-link :to="{ name: 'Bill_View', params: { id: items._id } }">
              <button type="button" class="button">
                ดูบิลด์
              </button>
            </router-link>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';
export default {
  name: 'ProfileHistory',
  mounted() {

    // change moment to th
    moment.locale('th'); 

    this.getOrder().then(response => {
      this.order_data = response.data.data;
    }, error => {
      this.order_data = null;
    })
  },
  data() {
    return {
      order_data: null
    }
  },
  watch: {

  },
  methods: {
    ...mapActions(['getOrder']),
    makePad(str, size) {
      if (!str || !size) return false;
      var s = String(str);
      while (s.length < (size || 2)) { s = "0" + s;}
      return s;
    },
    makeDate(data) {
      if (!data) return false;
      return moment(data).format('ll', 'th');
    },
  }
}
</script>

<style>
</style>
