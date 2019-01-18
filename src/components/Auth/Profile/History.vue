<template>
  <div class="profile-order">
    <div class="profile-order-container">
      <div
        class="profile-order-list"
        v-for="(items, id) in order_data"
        :key="items._id"
        v-b-toggle="'order-list-collapse-' + id"
      >
        <div class="row m-0">
          <div class="col-md-3">
            <b>รายการ:</b> {{ makePad(items._id, 7) }}
          </div>
          <div class="col">
            <b>สถาณะ:</b> <span>{{ getMessage(items.order_status) }}</span>
          </div>
          <div class="col-md-3">
            {{ makeDate(items.created_at) }}
          </div>
        </div>

        <b-collapse
          class="row m-0 profile-order-collapse"
          :id="'order-list-collapse-' + id"
        >
          <div class="col-12">
            <hr>
          </div>
          <div
            class="col"
            v-if="items.order_status == 'success'"
          >
            <router-link :to="{ name: 'Bill_View', params: { id: items._id } }">
              <button
                type="button"
                class="button"
              >
                ดูบิลด์
              </button>
            </router-link>
          </div>
          <div
            class="col wait_confirm"
            v-if="items.order_status == 'confirm'"
          >
            <div class="row m-0">
              <div class="col">
                ค่าขนส่ง: {{ numberWithCommas(items.pricing.delivery_price) }} <br>
                ราคารวม: {{ numberWithCommas(String(items.pricing.summary_price).slice(0, -2)) }} <br>
                สถานที่ส่ง: {{ numberWithCommas(items.delivery.delivery_description) }} <br>
              </div>
              <div class="col">
                <img :src="items.order_image">
              </div>
            </div>
          </div>
          <div class="col-12">
            <hr>
            <button
              type="button"
              class="button"
              @click="deleteTrigger(items._id)"
            >ลบรายการนี้</button>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getMessage } from "./orderMessageFunc";
import moment from "moment";
export default {
  name: "ProfileHistory",
  mounted() {
    // change moment to th
    moment.locale("th");

    this.getOrder().then(
      response => {
        this.order_data = response.data.data;
      },
      error => {
        this.order_data = null;
      }
    );
  },
  data() {
    return {
      order_data: null
    };
  },
  watch: {},
  methods: {
    ...mapActions(["getOrder", "deleteOrder"]),
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
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
      return moment(data).format("ll", "th");
    },
    getMessage(status) {
      return getMessage(status);
    },
    deleteTrigger(id) {
      this.$swal({
        type: "warning",
        title: "ลบรายการ",
        text: "คุณต้องลบรายการนี้หรือไม่?",
        showCancelButton: true,
        confirmButtonText: "ใช่, ลบรายการนี้",
        confirmButtonColor: "#ee9b5c",
        cancelButtonText: "ไม่, ย้อนกลับ"
      }).then(async result => {
        if (result.value) {
          this.deleteOrder(id).then(resp => {
            const orderValue = resp.data.data._id;
            this.order_data = this.order_data.filter(e => e._id != orderValue);
            location.reload();
          });
        }
      });
    }
  }
};
</script>

<style>
</style>
