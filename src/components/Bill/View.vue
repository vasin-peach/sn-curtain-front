<template>
  <div class="bill-view">
    <div class="container bill-container" v-if="order_data">
      <div class="bill-head">

        <div class="row m-0">
          <!-- empty  -->
          <div class="col"></div>
          <!-- logo & detail -->
          <div class="col company">
            <div class="mb-2">
              <img src="@image/brand.svg">
            </div>
            <span class="detail">
              สำนักงานใหญ่ 18 ถนน หทัยมิตร แขวง ทรายกองดิน เขต คลองสามวา กรุงเทพมหานคร 10510
            </span>
          </div>
        </div>

        <!-- invoice -->
        <div class="row invoice">
          <div class="col">
            <span class="title">ใบเสร็จ</span>
          </div>
          <div class="col">
            <div>{{ order_id_mask }}</div>
            <div class="detail">{{ order_date_mask }}</div>
          </div>
        </div>

        <!-- client -->
        <div class="row client">
          <div class="col">
            <span class="title">ผู้ซื้อ</span>
          </div>
          <div class="col">
            <div>{{ order_data.payment.customer_name }}</div>
            <div class="detail">{{ order_data.delivery.delivery_description }}</div>
            <div class="detail">{{ order_data.tel }}</div>
          </div>
        </div>

      </div>
      <div class="bill-detail">

      </div>
      <div class="bill-footer">

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';
export default {
  name: 'Bill_View',
  mounted() {

    // change moment to th
    moment.locale('th'); 
    
    // check params is exist
    if (this.$route.params.id) {

      // init order id
      this.order_id = this.$route.params.id;
      this.orderGetById(this.order_id).then((resp) => { // get order detail from backend

        // set order_data
        this.order_data = resp.data.data;

        // make pad
        this.order_id_mask = this.makePad(this.order_id, 7) || null;

        // make date
        this.order_date_mask = this.makeDate(resp.data.data.created_at) || null;

      }, (err) => {

        // clear order_data
        this.order_data = null;
      });

    }
  },
  data() {
    return {
      order_id: null,
      order_data: null,
      order_id_mask: null,
      order_date_mask: null
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    ...mapActions(['orderGetById']),

    // format id
    makePad(str, size) {
      if (!str || !size) return false;
      var s = String(str);
      while (s.length < (size || 2)) { s = "0" + s;}
      return s;
    },
    makeDate(date) {
      if (!date) return false;
      return moment(date).format('LLL', 'th');
    }
  }
}
</script>

<style>
</style>
