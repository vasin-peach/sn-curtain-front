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
        <div class="admin-order-left card-contianer col-12 col-md-6 col-xl">
          <div class="card-box">
            <div class="card-title">
              รอการยืนยันหลักฐาน
            </div>
            <div class="order-list-container">
              <div
                v-if="!orderEvidenceData[0]"
                class="data-empty"
              >
                ไม่มีรายการ
              </div>
              <div
                v-else
                class="order-list row m-0"
                v-for="(items) in orderEvidenceData"
                :key="items._id"
              >
                <div
                  class="order-list-delete"
                  @click="triggerDeleteEvidence(items._id)"
                >
                  <font-awesome-icon
                    icon="times"
                    aria-hidden="true"
                  />
                </div>
                <div
                  class="order-list-cancel"
                  @click="triggerCancelEvidance(items._id)"
                >
                  <font-awesome-icon
                    icon="ban"
                    aria-hidden="true"
                  />
                </div>

                <div
                  class="col-6 col-sm-4 col-md-4 pl-0"
                  @click="triggerCheckedEvidence(items)"
                >
                  <img
                    v-lazy="items.order_image"
                    class="border-2"
                    :alt="items.order_desccription"
                  >
                </div>
                <div
                  class="content col col-md"
                  @click="triggerCheckedEvidence(items)"
                >
                  <div>
                    <div>รายการที่: {{ items._id }}</div>
                    <div>฿{{ String(items.pricing.summary_price).slice(0, -2) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="admin-order-left card-contianer col-12 col-md-6 col-xl">
          <div class="card-box">
            <div class="card-title">
              คอนเฟิร์มการทำรายการ
            </div>
            <div class="order-list-container">
              <div
                v-if="!orderConfirmData[0]"
                class="data-empty"
              >
                ไม่มีรายการ
              </div>
              <div
                v-else
                class="order-list row m-0"
                v-for="(items) in orderConfirmData"
                :key="items._id"
              >
                <div
                  class="order-list-delete"
                  @click="triggerDeleteConfirm(items._id)"
                >
                  <font-awesome-icon
                    icon="times"
                    aria-hidden="true"
                  />
                </div>
                <div
                  class="order-list-cancel"
                  @click="triggerCancelConfirm(items._id)"
                >
                  <font-awesome-icon
                    icon="ban"
                    aria-hidden="true"
                  />
                </div>
                <div
                  class="col-6 col-sm-4 col-md-4 pl-0"
                  @click="triggerCheckedConfirm(items)"
                >
                  <img
                    v-if="items.order_image"
                    v-lazy="items.order_image"
                    class="border-2"
                    :alt="items.order_desccription"
                  >
                  <img
                    v-else
                    src="../../assets/images/credit/visa.png"
                    class="border-2"
                    :alt="items.order_description"
                  >
                </div>
                <div
                  class="content col col-md"
                  @click="triggerCheckedConfirm(items)"
                >
                  <div>
                    <div>รายการที่: {{ items._id }}</div>
                    <div>฿{{ String(items.pricing.summary_price).slice(0, -2) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="admin-order-left card-contianer col-12 col-md-6 col-xl">
          <div class="card-box">
            <div class="card-title">
              เริ่มการผลิตและดำเนินการเสร็จสิ้น
            </div>
            <div class="order-list-container">
              <div
                v-if="!orderSuccessData[0]"
                class="data-empty"
              >
                ไม่มีรายการ
              </div>
              <div
                v-else
                class="order-list row m-0"
                v-for="(items) in orderSuccessData"
                :key="items._id"
              >
                <div
                  class="order-list-delete"
                  @click="triggerDeleteSuccess(items._id)"
                >
                  <font-awesome-icon
                    icon="times"
                    aria-hidden="true"
                  />
                </div>
                <div
                  class="col-6 col-sm-4 col-md-4 pl-0"
                  @click="triggerCheckedSuccess(items)"
                >
                  <img
                    v-if="items.order_image"
                    v-lazy="items.order_image"
                    class="border-2"
                    :alt="items.order_desccription"
                  >
                  <img
                    v-else
                    src="../../assets/images/credit/visa.png"
                    class="border-2"
                    :alt="items.order_description"
                  >
                </div>
                <div
                  class="content col col-md"
                  @click="triggerCheckedSuccess(items)"
                >
                  <div>
                    <div>รายการที่: {{ items._id }}</div>
                    <div>฿{{ String(items.pricing.summary_price).slice(0, -2) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="admin-order-left card-contianer col-12 col-md-6 col-xl">
          <div class="card-box">
            <div class="card-title">
              รายการที่ถูกยกเลิก
            </div>
            <div class="order-list-container">
              <div
                v-if="!orderCancelData || !orderCancelData[0]"
                class="data-empty"
              >
                ไม่มีรายการ
              </div>
              <div
                v-else
                class="order-list row m-0"
                v-for="(items) in orderCancelData"
                :key="items._id"
              >

                <div
                  class="col-6 col-sm-4 col-md-4 pl-0"
                  @click="triggerCheckedSuccess(items)"
                >
                  <img
                    v-if="items.order_image"
                    v-lazy="items.order_image"
                    class="border-2"
                    :alt="items.order_desccription"
                  >
                  <img
                    v-else
                    src="../../assets/images/credit/visa.png"
                    class="border-2"
                    :alt="items.order_description"
                  >
                </div>
                <div
                  class="content col col-md"
                  @click="triggerCheckedSuccess(items)"
                >
                  <div>
                    <div>รายการที่: {{ items._id }}</div>
                    <div>฿{{ String(items.pricing.summary_price).slice(0, -2) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Loading from "../Loading";
import { mapActions, mapGetters, mapMutations } from "vuex";
import moment from "moment";
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
    ...mapActions(["orderAllGet", "updateOrder", "deleteOrder", "cancelOrder"]),

    // * [Actions] trigger call `orderAllGet`
    async triggerOrderAllGet() {
      // get order
      await this.orderAllGet();

      // disable loading
      this.loadingState = false;
    },

    // * [Popup] trigger checked evidence
    async triggerCheckedEvidence(data) {
      // get user confirm
      const confirm = await this.$swal({
        imageUrl: data.order_image,
        imageAlt: data.description,
        title: "ยืนยันรายการ",
        text: "คุณต้องการยืนยัน 'หลักฐานการโอน' นี้หรือไม่?",
        showCancelButton: true,
        confirmButtonColor: "#ee9b5c",
        cancelButtonText: "ไม่, ย้อนกลับ",
        confirmButtonText: "ใช่, ยืนยัน",
        html:
          `<div class="row m-0 text-left">` +
          `<div class="col-12">รหัส: <b>${data._id}</b></div>` +
          `<div class="col-12">รายการโดย: <b>${data.order_name}</b></div>` +
          `<div class="col-12">ราคาสินค้า: <b>${
            data.pricing.product_price
          } บาท</b></div>` +
          `<div class="col-12">ราคาค่าจัดส่ง: <b>${
            data.pricing.delivery_price
          } บาท</b></div>` +
          `<div class="col-12">ส่วนลด: <b>${
            data.pricing.discount_price
          } บาท</b></div>` +
          // `<div class="col-12">ภาษี: <b>${Math.round(
          //   ((data.pricing.product_price +
          //     data.pricing.delivery_price -
          //     data.pricing.discount_price) *
          //     3.65) /
          //     100 +
          //     ((((data.pricing.product_price +
          //       data.pricing.delivery_price -
          //       data.pricing.discount_price) *
          //       3.65) /
          //       100) *
          //       7) /
          //       100
          // )} บาท</b></div>` +
          `<div class="col-12">ราคารวม: <b>${String(
            data.pricing.summary_price
          ).slice(0, -2)} บาท</b></div>` +
          `<div class="col-12">สั่งเมื่อ: <b>${moment(data.created_at)
            .locale("th")
            .format("MMMM Do YYYY, h:mm:ss a")}</b></div>` +
          `<div class="col-12"><hr></div>` +
          `<div class="col-12">สถานที่ส่ง: <b>${
            data.delivery.delivery_description
          }</b></div>` +
          `<div class="col-12">เบอร์โทร: <b>${data.tel}</b></div>` +
          `<div class="col-12">สินค้า: <br>
          ${data.product
            .map(
              product =>
                `- <b>${product.data.name}</b> จำนวน: <b>${
                  product.amount
                }</b> ตัวเลือก: <b>${
                  product.data.price.filter(
                    price => price.value == product.option
                  )[0].text
                }</b>`
            )
            .join("<br>")}</div>` +
          `</div>`
      }).then(result => result.value);

      // user cancel, do nothing
      if (!confirm) return;

      // update order
      const callResult = await this.updateOrder({
        query: { _id: data._id },
        data: { order_status: "confirm" }
      }).then(resp => resp, err => err);

      if (callResult.status != 200) {
        return this.$swal({
          type: "error",
          title: "เกิดข้อผิดพลาดในการยืนยันรายการ",
          text: callResult.err
        });
      }

      // remove old order in evidence
      const index = await this.orderEvidenceData.findIndex(
        x => x._id == data._id
      );
      this.orderEvidenceData.splice(index, 1);
      this.orderConfirmData.unshift(data);
    },

    // * [Popup] trigger checked confirm
    async triggerCheckedConfirm(data) {
      // get user confirm
      const confirm = await this.$swal({
        imageUrl: data.order_image,
        imageAlt: data.description,
        title: "ยืนยันรายการ",
        text: "คุณต้องการยืนยันการทำรายการ นี้หรือไม่?",
        showCancelButton: true,
        confirmButtonColor: "#ee9b5c",
        cancelButtonText: "ไม่, ย้อนกลับ",
        confirmButtonText: "ใช่, ยืนยัน",
        html:
          `<b class="row m-0 text-left">` +
          `<div class="col-12">รหัส: <b>${data._id}</b></div>` +
          `<div class="col-12">รายการโดย: <b>${data.order_name}</b></div>` +
          `<div class="col-12">ราคาสินค้า: <b>${
            data.pricing.product_price
          } บาท</b></div>` +
          `<div class="col-12">ราคาค่าจัดส่ง: <b>${
            data.pricing.delivery_price
          } บาท</b></div>` +
          `<div class="col-12">ส่วนลด: <b>${
            data.pricing.discount_price
          } บาท</b></div>` +
          // `<b class="col-12">ภาษี: <b>${Math.round(
          //   ((data.pricing.product_price +
          //     data.pricing.delivery_price -
          //     data.pricing.discount_price) *
          //     3.65) /
          //     100 +
          //     ((((data.pricing.product_price +
          //       data.pricing.delivery_price -
          //       data.pricing.discount_price) *
          //       3.65) /
          //       100) *
          //       7) /
          //       100
          // )} บาท</b></b>` +
          `<div class="col-12">ราคารวม: <b>${String(
            data.pricing.summary_price
          ).slice(0, -2)} บาท</b></div>` +
          `<div class="col-12">สั่งเมื่อ: <b>${moment(data.created_at)
            .locale("th")
            .format("MMMM Do YYYY, h:mm:ss a")}</b></div>` +
          `<div class="col-12"><hr></div>` +
          `<div class="col-12">สถานที่ส่ง: <b>${
            data.delivery.delivery_description
          }</b></div>` +
          `<div class="col-12">เบอร์โทร: <b>${data.tel}</b></div>` +
          `<div class="col-12">สินค้า: <br>
          ${data.product
            .map(
              product =>
                `- <b>${product.data.name}</b> จำนวน: <b>${
                  product.amount
                }</b> ตัวเลือก: <b>${
                  product.data.price.filter(
                    price => price.value == product.option
                  )[0].text
                }</b>`
            )
            .join("<br>")}</div>` +
          `</b>`
      }).then(result => result.value);

      // user cancel, do nothing
      if (!confirm) return;

      // update order
      const callResult = await this.updateOrder({
        query: { _id: data._id },
        data: { order_status: "success" }
      }).then(resp => resp, err => err);

      if (callResult.status != 200) {
        return this.$swal({
          type: "error",
          title: "เกิดข้อผิดพลาดในการยืนยันรายการ",
          text: callResult.err
        });
      }

      // remove old order in evidence
      const index = await this.orderConfirmData.findIndex(
        x => x._id == data._id
      );
      this.orderConfirmData.splice(index, 1);
      this.orderSuccessData.unshift(data);
    },

    // * [Popup] trigger checked success
    async triggerCheckedSuccess(data) {
      // get user confirm
      const confirm = await this.$swal({
        imageUrl: data.order_image,
        imageAlt: data.description,
        showCancelButton: true,
        confirmButtonText: "ปริ้น",
        cancelButtonText: "ปิด",
        html:
          `<div class="row m-0 text-left">` +
          `<div class="col-12">รหัส: <b>${data._id}</b></div>` +
          `<div class="col-12">รายการโดย: <b>${data.order_name}</b></div>` +
          `<div class="col-12">ราคาสินค้า: <b>${
            data.pricing.product_price
          } บาท</b></div>` +
          `<div class="col-12">ราคาค่าจัดส่ง: <b>${
            data.pricing.delivery_price
          } บาท</b></div>` +
          `<div class="col-12">ส่วนลด: <b>${
            data.pricing.discount_price
          } บาท</b></div>` +
          // `<div class="col-12">ภาษี: <b>${Math.round(
          //   ((data.pricing.product_price +
          //     data.pricing.delivery_price -
          //     data.pricing.discount_price) *
          //     3.65) /
          //     100 +
          //     ((((data.pricing.product_price +
          //       data.pricing.delivery_price -
          //       data.pricing.discount_price) *
          //       3.65) /
          //       100) *
          //       7) /
          //       100
          // )} บาท</b></div>` +
          `<div class="col-12">ราคารวม: <b>${String(
            data.pricing.summary_price
          ).slice(0, -2)} บาท</b></div>` +
          `<div class="col-12">สั่งเมื่อ: <b>${moment(data.created_at)
            .locale("th")
            .format("MMMM Do YYYY, h:mm:ss a")}</b></div>` +
          `<div class="col-12"><hr></div>` +
          `<div class="col-12">สถานที่ส่ง: <b>${
            data.delivery.delivery_description
          }</b></div>` +
          `<div class="col-12">เบอร์โทร: <b>${data.tel}</b></div>` +
          `<div class="col-12">สินค้า: <br>
          ${data.product
            .map(
              product =>
                `- <b>${product.data.name}</b> จำนวน: <b>${
                  product.amount
                }</b> ตัวเลือก: <b>${
                  product.data.price.filter(
                    price => price.value == product.option
                  )[0].text
                }</b>`
            )
            .join("<br>")}</div>` +
          `</div>`
      }).then(x => x.value);
      if (!confirm) return;

      const href = this.$router.resolve({
        name: "PrintOrder",
        params: { id: data._id }
      });
      window.open(href.href, "_blank");
    },

    // * [Popup] trigger delete evidence
    async triggerDeleteEvidence(id) {
      // get user confirm
      const confirm = await this.$swal({
        title: "ลบรายการ",
        text: "คุณต้องการลบรายการ ที่ยังไม่ยืนยันหลักฐาน หรือไม่?",
        showCancelButton: true,
        confirmButtonColor: "#ee9b5c",
        cancelButtonText: "ไม่, ย้อนกลับ",
        confirmButtonText: "ใช่, ยืนยัน"
      }).then(result => result.value);

      // user cancel, do nothing
      if (!confirm) return;

      // update order
      const callResult = await this.deleteOrder(id).then(
        resp => resp,
        err => err
      );

      if (callResult.status != 200) {
        return this.$swal({
          type: "error",
          title: "เกิดข้อผิดพลาดในการลบรายการ",
          text: callResult.err
        });
      }

      // remove old order in evidence
      const index = await this.orderEvidanceData.findIndex(x => x._id == id);
      this.orderEvidanceData.splice(index, 1);
    },

    async triggerCancelEvidance(id) {
      // get user confirm
      const confirm = await this.$swal({
        title: "ยกเลิกรายการ",
        text: "คุณต้องการยกเลิกรายการนี้หรือไม่?",
        showCancelButton: true,
        confirmButtonColor: "#ee9b5c",
        cancelButtonText: "ไม่, ย้อนกลับ",
        confirmButtonText: "ใช่, ยืนยัน"
      }).then(result => result.value);

      // user cancel, do nothing
      if (!confirm) return;

      // update order
      const callResult = await this.cancelOrder(id).then(
        resp => resp,
        err => err
      );

      if (callResult.status != 200) {
        return this.$swal({
          type: "error",
          title: "เกิดข้อผิดพลาดในการยกเลิกรายการ",
          text: callResult.err
        });
      }
      // remove old order in evidence
      const index = await this.orderEvidenceData.findIndex(x => x._id == id);
      this.orderEvidenceData.splice(index, 1);

      // unshift to cancel order
      this.orderCancelData.unshift(callResult.data.data);
    },

    // * [Popup] trigger delete confirm
    async triggerDeleteConfirm(id) {
      // get user confirm
      const confirm = await this.$swal({
        title: "ลบรายการ",
        text: "คุณต้องการลบรายการกำลังดำเนินการ หรือไม่?",
        showCancelButton: true,
        confirmButtonColor: "#ee9b5c",
        cancelButtonText: "ไม่, ย้อนกลับ",
        confirmButtonText: "ใช่, ยืนยัน"
      }).then(result => result.value);

      // user cancel, do nothing
      if (!confirm) return;

      // update order
      const callResult = await this.deleteOrder(id).then(
        resp => resp,
        err => err
      );

      if (callResult.status != 200) {
        return this.$swal({
          type: "error",
          title: "เกิดข้อผิดพลาดในการลบรายการ",
          text: callResult.err
        });
      }

      // remove old order in confirm
      const index = await this.orderConfirmData.findIndex(x => x._id == id);
      this.orderConfirmData.splice(index, 1);
    },

    // * [Popup] trigger cancel confirm
    async triggerCancelConfirm(id) {
      // get user confirm
      const confirm = await this.$swal({
        title: "ยกเลิกรายการ",
        text: "คุณต้องการยกเลิกรายการนี้หรือไม่?",
        showCancelButton: true,
        confirmButtonColor: "#ee9b5c",
        cancelButtonText: "ไม่, ย้อนกลับ",
        confirmButtonText: "ใช่, ยืนยัน"
      }).then(result => result.value);

      // user cancel, do nothing
      if (!confirm) return;

      // update order
      const callResult = await this.cancelOrder(id).then(
        resp => resp,
        err => err
      );

      if (callResult.status != 200) {
        return this.$swal({
          type: "error",
          title: "เกิดข้อผิดพลาดในการยกเลิกรายการ",
          text: callResult.err
        });
      }
      // remove old order in ฉ
      const index = await this.orderฉData.findIndex(x => x._id == id);
      this.orderฉData.splice(index, 1);

      // unshift to cancel order
      this.orderCancelData.unshift(callResult.data.data);
    },

    // * [Popup] trigger delete Success
    async triggerDeleteSuccess(id) {
      // get user confirm
      const confirm = await this.$swal({
        title: "ลบรายการ",
        text: "คุณต้องการลบรายการดำเนินการเสร็จสิ้นแล้ว หรือไม่?",
        showCancelButton: true,
        confirmButtonColor: "#ee9b5c",
        cancelButtonText: "ไม่, ย้อนกลับ",
        confirmButtonText: "ใช่, ยืนยัน"
      }).then(result => result.value);

      // user cancel, do nothing
      if (!confirm) return;

      // update order
      const callResult = await this.deleteOrder(id).then(
        resp => resp,
        err => err
      );

      if (callResult.status != 200) {
        return this.$swal({
          type: "error",
          title: "เกิดข้อผิดพลาดในการลบรายการ",
          text: callResult.err
        });
      }

      // remove old order in success
      const index = await this.orderSuccessData.findIndex(x => x._id == id);
      this.orderSuccessData.splice(index, 1);
    },

    // * [Popup] trigger delete Cancel
    async triggerDeleteCancel(id) {
      // get user confirm
      const confirm = await this.$swal({
        title: "ลบรายการ",
        text: "คุณต้องการลบรายการนี้ หรือไม่?",
        showCancelButton: true,
        confirmButtonColor: "#ee9b5c",
        cancelButtonText: "ไม่, ย้อนกลับ",
        confirmButtonText: "ใช่, ยืนยัน"
      }).then(result => result.value);

      // user cancel, do nothing
      if (!confirm) return;

      // update order
      const callResult = await this.deleteOrder(id).then(
        resp => resp,
        err => err
      );

      if (callResult.status != 200) {
        return this.$swal({
          type: "error",
          title: "เกิดข้อผิดพลาดในการลบรายการ",
          text: callResult.err
        });
      }

      // // remove old order in Cancel
      // const index = await this.orderCancelData.findIndex(x => x._id == id);
      // this.orderCancelData.splice(index, 1);
    }
  },

  // ! WATCH
  watch: {
    orderAllGet: {
      handler: function(data) {}
    }
  },

  // ! COMPUTED
  computed: {
    ...mapGetters([
      "orderAllData",
      "orderEvidenceData",
      "orderConfirmData",
      "orderSuccessData",
      "orderCancelData"
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
