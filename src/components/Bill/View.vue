<template>
  <div class="bill-view">
    <div class="container bill-container" v-if="order_data">

      <span @click="print()"></span>
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
        <div class="row m-0">
          <div class="col-5 title">
            รายการ
          </div>
          <div class="col title">
            จำนวน
          </div>
          <div class="col title">
            ราคา
          </div>
          <div class="col title">
            รวม
          </div>
        </div>
        <div class="row m-0 order-list" v-for="items in order_data.product" :key="items.data._id">
          <div class="col-5 detail">
            {{ items.data.name }}
          </div>
          <div class="col detail">
            {{ items.amount }}
          </div>
          <div class="col detail">
            {{ numberWithCommas(items.option) }} บาท
          </div>
          <div class="col detail">
            {{ numberWithCommas(items.amount * items.option) }} บาท
          </div>
        </div>
        <div class="row m-0 order-list" v-if="order_data.discount.discount_code">
          <div class="col-5 detail">
            ส่วนลดโค้ด ({{ order_data.discount.discount_code }}) บาท
          </div>
          <div class="col detail">
            -
          </div>
          <div class="col detail">
            {{ numberWithCommas(order_data.discount.discount_amount || 0) }} บาท
          </div>
          <div class="col detail">
            {{ numberWithCommas(order_data.discount.discount_amount || 0) }} บาท
          </div>
        </div>
      </div>
      <div class="bill-footer">
        <div class="row m-0">
          <div class="col">
            <div class="detail">ราคาสินค้ารวม</div>
            <div>{{ numberWithCommas(order_data.pricing.product_price) }} <span v-if="order_data.discount.discount_code"> - {{ numberWithCommas(order_data.discount.discount_amount )}}</span> บาท</div>
          </div>
          <div class="col">
            <div class="detail">ค่าขนส่ง</div>
            <div>{{ numberWithCommas(order_data.pricing.delivery_price) }} บาท</div>
          </div>
          <div class="col">
            <div class="detail">รวมทั้งหมด</div>
            <div>{{ numberWithCommas(order_data.pricing.product_price + order_data.pricing.delivery_price - order_data.discount.discount_amount) }} บาท</div>
          </div>
        </div>
      </div>
      <div class="bill-end">
        <div class="row m-0">
          <div class="col col-4">
            <div class="title">
              เพิ่มเติม
            </div>
            <div class="detail">
              แอนด์วอล์กเช็งเม้งโบว์ โมจิฮาราคีรี คอนเซ็ปต์โปรโบ้ยเซ็กซ์เจ็ต แซนด์วิชคอนเซปต์ คอลเล็กชั่นแพ็คอะ เบนโตะกิมจิบ๊วยรวมมิตร ซิลเวอร์ยังไง
            </div>
          </div>
        </div>
        <div class="row m-0">
          <div class="col title">
            ขอบคุณสำหรับการสั่งซื้อ!
            <hr>
            <div class="text-right detail">
              {{ order_date_mask }}
            </div>
          </div>
        </div>
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

        // navigation to landing
        this.$router.push({ name: 'Landing' });

      });

    }
  },
  data() {
    return {
      order_id: null,
      order_data: null,
      order_id_mask: null,
      order_date_mask: null,
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
    makeDate(data) {
      if (!data) return false;
      return moment(data).format('LLL', 'th');
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  }
}
</script>

<style>
</style>
