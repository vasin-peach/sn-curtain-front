<template>
  <div class="printOrder">
    <div
      class="print-wrapper"
      @click="print()"
    >
      <div
        class="row m-0"
        v-if="data"
      >
        <div class="col print-box">
          <div class="title text-center">ใบเสร็จ</div>
          <div class="title-id">{{id}}</div>
          <hr>

          <div class="bill-view">
            <div class="container bill-container">
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
                    <div>{{ data.payment.first_name + " " + data.payment.last_name }}</div>
                    <div class="detail">{{ data.delivery.delivery_description }}</div>
                    <div class="detail">{{ data.tel }}</div>
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
                <div
                  class="row m-0 order-list"
                  v-for="items in data.product"
                  :key="items.data._id"
                >
                  <div class="col-5 detail">
                    {{
                    `${items.data.name} (${
                    data.product.map(product => product.data.price.filter(price =>
                    price.value == product.option
                    )[0].text)[0]
                    })`
                    }}
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
                <div
                  class="row m-0 order-list"
                  v-if="data.discount.discount_code"
                >
                  <div class="col-5 detail">
                    ส่วนลดโค้ด ({{ data.discount.discount_code }}) บาท
                  </div>
                  <div class="col detail">
                    -
                  </div>
                  <div class="col detail">
                    {{ numberWithCommas(data.discount.discount_amount || 0) }} บาท
                  </div>
                  <div class="col detail">
                    {{ numberWithCommas(data.discount.discount_amount || 0) }} บาท
                  </div>
                </div>
              </div>
              <div class="bill-footer">
                <div class="row m-0">
                  <div class="col">
                    <div class="detail">ราคาสินค้ารวม</div>
                    <div>{{ numberWithCommas(data.pricing.product_price) }} <span v-if="data.discount.discount_code"> - {{ numberWithCommas(data.discount.discount_amount )}}</span> บาท</div>
                  </div>
                  <div class="col">
                    <div class="detail">ค่าขนส่ง</div>
                    <div>{{ numberWithCommas(data.pricing.delivery_price) }} บาท</div>
                  </div>
                  <div class="col">
                    <div class="detail">รวมทั้งหมด</div>
                    <div>{{ numberWithCommas(data.pricing.product_price + data.pricing.delivery_price - data.discount.discount_amount) }} บาท</div>
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

        </div>
        <div class="col p-0">
          <div class="row m-0">
            <div class="col-12 print-box">
              <div class="title text-center">ที่อยู่จัดส่ง</div>
              <div class="title-id">{{id}}</div>
              <hr>
              <div class="box-detail">
                ชื่อ: <span>{{ data.payment.first_name + " " + data.payment.last_name }}</span> <br>
                <div class="d-block">ที่อยู่ <span>{{ data.delivery.delivery_description}}</span></div> <br>
                เบอร์โทร: <span>{{ data.tel }}</span>
              </div>
            </div>
            <div class="col-12 print-box">
              <div class="text-center">ใบผลิต</div>
              <div class="title-id">{{id}}</div>
              <hr>
              <div class="box-detail">
                <div class="bill-detail">
                  <div class="row m-0">
                    <div class="col title">
                      รายการ
                    </div>
                    <div class="col-3 title">
                      จำนวน
                    </div>
                    <div class="col-12 title">
                      <hr class="mt-1 mb-1">
                    </div>
                  </div>
                  <div
                    class="row m-0 order-list"
                    v-for="items in data.product"
                    :key="items.data._id"
                  >
                    <div class="col detail">
                      {{
                      `${items.data.name} (${
                      data.product.map(product => product.data.price.filter(price =>
                      price.value == product.option
                      )[0].text)[0]
                      })`
                      }}
                    </div>
                    <div class="col-3 detail">
                      {{ items.amount }}
                    </div>
                    <div class="col-12">
                      <hr class="mt-1 mb-1">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PrintOrder",

  // ! DATA
  data() {
    return {
      id: null,
      data: null,
      order_id_mask: null,
      order_date_mask: null
    };
  },

  // ! METHODS
  methods: {
    ...mapActions(["orderAllGet"]),

    print() {
      const _this = this;
      $(function() {
        const filename = _this.data.order_name + ".pdf";

        html2canvas($(".print-wrapper")[0]).then(canvas => {
          let pdf = new jsPDF("l", "mm", "a4");
          pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 298, 211);
          pdf.save(filename);
        });
      });
    },

    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async triggerOrderAllGet() {
      // * Init get all order
      await this.orderAllGet();

      this.id = this.$route.params.id;
      this.data =
        (await this.orderAllData.filter(x => x._id == this.id)[0]) || null;

      // make pad
      this.order_id_mask = this.makePad(this.id, 7) || null;

      // make date
      this.order_date_mask = this.makeDate(this.data.created_at) || null;

      if (!this.data)
        return this.$swal({
          type: "error",
          title: "ไม่พบใบเสร็จนี้ท่านร้องขอ"
        });
    },

    // format id
    makePad(str, size) {
      if (!str || !size) return false;
      var s = String(str);
      while (s.length < (size || 2)) {
        s = "0" + s;
      }
      return s;
    },
    makeDate(data) {
      if (!data) return false;
      return moment(data).format("LLL", "th");
    }
  },

  // ! COMPUTED
  computed: {
    ...mapGetters(["orderAllData"])
  },

  // ! MOUNTED
  mounted() {
    this.triggerOrderAllGet();
  }
};
</script>

<style>
</style>
