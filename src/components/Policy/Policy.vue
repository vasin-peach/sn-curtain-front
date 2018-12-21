<template>
  <div class="policy">
    <div class="container">
      <div class="title">
        นโยบายของ S&N CURTAIN
      </div>
      <div class="content">
        <ul>
          <li>
            <router-link :to="{ name: 'PolicyService'}">เงื่อนไขการให้บริการ</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'PolicyPrivacy'}">นโยบายความเป็นส่วนตัว</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'PolicyRefunds'}">นโยบายการคืนสินค้าและคืนเงิน</router-link>
          </li>
        </ul>
        <router-link
          :to="{ name: 'Landing'}"
          class="color-orange1 ml-3"
        >ย้อนกลับ</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
