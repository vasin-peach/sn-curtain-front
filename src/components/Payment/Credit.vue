<template>
  <div class="payment_credit">
    <div class="wrapper-header">
      <div class="back">
        <router-link :to="{ name: 'Payment'}">
          <font-awesome-icon icon="chevron-left" aria-hidden="true" /> <span>ย้อนกลับ</span>
        </router-link>
      </div>
      <div class="title">
        <font-awesome-icon icon="credit-card" aria-hidden="true" /> ชำระด้วย เครดิต/เดบิต</div>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: "payment_credit"
};
</script>

<style>
</style>
f