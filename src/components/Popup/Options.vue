<template>
  <div class="payment-options-form">
    <div
      class="bg-fade"
      @click="popupPaymentOptionsUpdate(false)"
    ></div>
    <div class="payment-options-wrapper">
      <div
        class="close"
        @click="popupPaymentOptionsUpdate(false)"
      >
        <font-awesome-icon
          icon="times"
          aria-hidden="true"
        />
      </div>
      <div class="login-head">
      </div>
      <div class="payment-options-container">
        <div class="title">
          ตัวเลือกการชำระเงิน
        </div>
        <!-- <router-link :to="{name: 'Payment_Credit'}">
          <button type="button" class="button">บัตรเครเดท/บัตรเดบิต</button>
        </router-link> -->
        <router-link :to="{name: 'Payment_Atm'}">
          <button
            type="button"
            class="button"
          >โอน/ชำระผ่านธนาคาร</button>
        </router-link>
        <div
          class="detail"
          @click="popupPaymentOptionsUpdate(false)"
        >
          ย้อนกลับ
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["popupPaymentOptionsUpdate"])
  }
};
</script>

<style>
</style>
