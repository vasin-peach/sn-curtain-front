<template>
  <div class="admin-product">
    <transition
      name="fade"
      mode="out-in"
    >
      <div v-if="loadingState">
        <loading class="card-loading"></loading>
      </div>
      <div
        class="admin-product-container row m-0"
        key="admin-product"
        v-else
      >
        <div class="admin-product-left card-container col-12 col-md">
          <div class="card-box">
            <div class="product-search bar-search">
              <div class="input-group">
                <span class="input-group-append">
                  <div class="input-group-text border-right-0 border">
                    <font-awesome-icon
                      icon="search"
                      aria-hidden="true"
                    />
                  </div>
                </span>
                <input
                  class="form-control py-2 border-left-0 border"
                  type="search"
                  placeholder="ค้นหา"
                  id="search"
                  v-model="search"
                >
              </div>
            </div>
            <div class="product-list">
              โชว์สินค้า
              {{ productAllData }}
            </div>
          </div>
        </div>
        <div class="admin-product-right card-container col-12 col-md">
          <div class="card-box">
            <div class="product-detail">
              รายละเอียดสินค้าที่คลิ๊ก
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Loading from "../Loading";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "admin_product",
  data() {
    return {
      search: "",
      loadingState: true
    };
  },
  methods: {
    ...mapActions(["productAll"]),

    // * Get all product
    async callProductAll() {
      // get product
      const callResult = await this.productAll().then(
        result => result,
        error => errro
      );

      // disable loading
      this.loadingState = false;
    }
  },
  computed: {
    ...mapGetters(["productAllData"])
  },
  mounted() {
    this.callProductAll();
  },
  components: { Loading }
};
</script>

<style>
</style>
