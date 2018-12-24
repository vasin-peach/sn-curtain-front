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
        <div class="admin-product-left card-container col-12 col-md col-xl-4">
          <div class="card-box">
            <div class="product-search bar-search row m-0">
              <div class="input-group col pl-0">
                <span class="input-group-append">
                  <div class="input-group-text border-right-0 border pl-2 pr-2">
                    <font-awesome-icon
                      icon="search"
                      aria-hidden="true"
                    />
                  </div>
                </span>
                <input
                  class="form-control pl-1 border-left-0 border"
                  type="search"
                  placeholder="ค้นหา"
                  id="search"
                  v-model="search"
                >
              </div>
              <div
                class="add col-2 pr-0"
                @click="triggerAddProduct()"
              >
                <font-awesome-icon
                  icon="plus"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div class="product-list-container">
              <div
                class="product-list row m-0 "
                v-for="items in productShow"
                :key="items._id"
                @click="triggerChecked(items._id)"
              >
                <div
                  class="product-list-delete"
                  @click="triggerDeleteProduct(items._id)"
                >
                  <font-awesome-icon
                    icon="times"
                    aria-hidden="true"
                  />
                </div>
                <div class="col-6 col-sm-4 col-md-4 pl-0">
                  <img
                    v-lazy="items.brand"
                    class="border-2"
                    :alt="'promotion2'"
                  >
                </div>
                <div class="content col col-md">
                  <div>
                    <div>{{ items.name}}</div>
                    <div><span>จำนวน: </span><span>{{ items.quantity }}</span></div>
                    <div>฿{{ items.price[0].value}}</div>
                  </div>
                </div>
              </div>
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
      loadingState: true,
      productShow: null
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
    },

    // * Trigger Add Product
    triggerAddProduct() {
      console.log("add product call");
    },

    // * Trigger Delete Product
    triggerDeleteProduct(id) {
      console.log("delete product " + id);
    },

    // * Trigger Checked Product
    triggerChecked(id) {
      console.log("checked product " + id);
    }
  },
  watch: {
    productAllData: function(data) {
      this.productShow = data;
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
