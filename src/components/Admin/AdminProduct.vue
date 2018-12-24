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
                class="product-list row m-0"
                v-for="(items, count) in productShow"
                :key="items._id"
                :class="[items._id, {'checked' : count == 0}]"
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
                    :alt="items.name"
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
              <div class="row m-0">
                <div class="col-12 col-md">
                  <img
                    v-lazy="productDetail.brand"
                    :alt="productDetail.name"
                  >
                </div>
                <div class="col col-md">
                  {{ productDetail.name }}
                </div>
                <div class="col-12">
                  {{ productDetail.desc[0].val }}
                </div>
                <div class="col-12">
                  {{ productDetail.price[0].value }}
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
import { mapActions, mapGetters } from "vuex";
import isEmpty from "lodash.isempty";
import $ from "jquery";
export default {
  name: "admin_product",
  data() {
    return {
      search: "",
      loadingState: true,
      productShow: null,
      productDetail: null,
      prevCheckedDiv: null,
      timeout: null
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
    async triggerChecked(id) {
      this.productDetail = await this.productAllData.filter(
        item => item._id == id
      );
      $(`.${this.prevCheckedDiv}`).removeClass("checked");
      $(`.${id}`).addClass("checked");
      this.prevCheckedDiv = id;
    },

    // * Trigger Search
    async triggerSearch(word) {
      // filter `productAllData` to `productShow` by `search`
      const filterResult = await this.productAllData.filter(items => {
        return (
          items.name.includes(word) ||
          items.category.val.includes(word) ||
          items.category.quantity == word ||
          items.category.type.val.includes(word) ||
          !isEmpty(items.price.filter(item => item.value == word)) ||
          !isEmpty(items.price.filter(item => item.weight == word)) ||
          !isEmpty(
            items.category.type.nature.filter(item => item.val.includes(word))
          )
        );
      });

      // return false if empty
      if (isEmpty(filterResult)) this.productShow = false;
      // set filter to `productShow`
      else this.productShow = filterResult;
    }
  },
  watch: {
    // update `productShow` when get data from `productAllData`
    productAllData: function(data) {
      this.productShow = data;
      this.productDetail = data[0] || false;
      this.prevCheckedDiv = data[0]._id;
    },

    // set delay 500ms and call `triggerSearch`
    search: function(word) {
      var _this = this;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function() {
        _this.triggerSearch(word);
      }, 500);
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
