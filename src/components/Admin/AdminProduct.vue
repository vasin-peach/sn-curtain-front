<template>
  <div class="admin-product">
    <transition
      name="fade"
      id=""
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
            <form
              class="product-detail-form"
              @submit.prevent="updateProduct(productDetail._id)"
            >
              <div class="product-detail">
                <div class="row m-0">
                  <div class="col-12 col-sm col-md-12 col-xl-4 pmb-0">
                    <img
                      :src="
                  productDetail.brand.src"
                      :alt="productDetail.name"
                      class="image"
                    >
                  </div>
                  <div class="col-12 col-sm col-md col-xl pmb-0">
                    <div>
                      <div class="name">
                        <input
                          type="text"
                          v-model="productEdit.name"
                          name="name"
                          id="name"
                        >
                      </div>
                      <div class="desc">
                        <textarea
                          type="text"
                          v-model="productEdit.desc[0].val"
                          name="desc"
                          id="desc"
                        >
                      </textarea>
                      </div>
                      <hr class="mt-1 mb-2">
                      <div class="price">
                        <div class="title">
                          <div>ตัวเลือกราคา</div>
                          <div
                            class="add col-2 pr-0"
                            @click="triggerAddOption(productEdit._id)"
                          >
                            <font-awesome-icon
                              icon="plus"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                        <div class="box">
                          <div
                            class="list"
                            v-for="(items, count) in productEdit.price"
                            :key="items._id"
                          >
                            <div class="name">
                              <input
                                type="text"
                                v-model="productEdit.price[count].text"
                                name="price_name"
                                id="price_name"
                                required
                              >
                            </div>
                            <div class="value">
                              ฿<input
                                type="text"
                                v-model="productEdit.price[count].value"
                                name="price_value"
                                id="price_value"
                                required
                              > (<input
                                type="text"
                                v-model="productEdit.price[count].weight"
                                name="price_weight"
                                id="price_weight"
                                required
                              >ก.)
                            </div>

                          </div>
                        </div>
                      </div>
                      <div class="quantity">
                        จำนวนที่เหลือ: <input
                          type="number"
                          v-model="productEdit.quantity"
                          name="quantity"
                          id="quantity"
                          required
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row m-0">
                  <div class="col-12">
                    <hr class="mt-1 mb-3">
                  </div>
                  <div class="col-12 pmb-0">
                    <div class="row m-0 category">
                      <div class="col">
                        ประเภท
                      </div>
                      <div class="col">
                        <b-form-select
                          v-model="productEdit.category.val"
                          :options="productCategoryOptionData"
                          name="category"
                          id="category"
                        />
                      </div>
                    </div>
                    <div class="row m-0 type ">
                      <div class="col">
                        ชนิด
                      </div>
                      <div class="col">
                        <b-form-select
                          v-model="productEdit.category.type.val"
                          :options="productTypeOptionData"
                          name="type"
                          id="type"
                        />
                      </div>
                    </div>
                    <div class="row m-0 nature">
                      <div class="col">
                        ลักษณะ
                      </div>
                      <div class="col">
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <input type="submit">
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Loading from "../Loading";
import { mapActions, mapGetters, mapMutations } from "vuex";
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
      timeout: null,
      productEdit: {},
      productEditUpdate: {}
    };
  },
  methods: {
    ...mapActions(["productAll"]),
    ...mapMutations([
      "filterCategoryOption",
      "filterTypeOption",
      "filterNatureOption"
    ]),

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

    // * Trigger Delete Product
    triggerAddOption(id) {
      console.log("add option " + id);
    },

    // * Trigger Checked Product
    async triggerChecked(id) {
      this.productDetail =
        (await this.productAllData.filter(item => item._id == id)[0]) || false;
      $(`.${this.prevCheckedDiv}`).removeClass("checked");
      $(`.${id}`).addClass("checked");
      this.prevCheckedDiv = id;
      1;
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
      if (isEmpty(filterResult)) return (this.productShow = false);
      // set filter to `productShow`
      this.productShow = filterResult;
      // reload product detail
      this.productDetail = this.productShow[0];
      // unchecked & checked dev
      $(`.${this.prevCheckedDiv}`).removeClass("checked");
      $(`.${this.productShow[0]._id}`).addClass("checked");
      this.prevCheckedDiv = this.productShow[0]._id;
    },

    // * Number with comma
    commas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    updateProduct(id) {
      const productNew = {
        _id: id,
        name: $("#name").val(),
        desc: $("#desc").val()
      };
    }
  },
  watch: {
    // update `productShow` when get data from `productAllData`
    productAllData: {
      handler: function(data) {
        this.productShow = data;
        this.productDetail = data[0] || false;
        this.prevCheckedDiv = data[0]._id;

        // init options
        this.filterCategoryOption(data);
        this.filterTypeOption(data);
        this.filterNatureOption(data);

        return;
      },
      deep: false
    },

    // update `productEdit`
    productDetail: function(data) {
      if (!data) return false;
      // return (this.productEdit = data);
      this.productEdit.name = data.name;
      this.productEdit.price = data.price;
      this.productEdit.quantity = data.quantity;
      this.productEdit.desc = data.desc;
      this.productEdit.category = data.category;
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
    ...mapGetters([
      "productAllData",
      "productCategoryOptionData",
      "productTypeOptionData",
      "productNatureOptionData"
    ])
  },
  mounted() {
    this.callProductAll();
  },
  components: { Loading }
};
</script>

<style>
</style>
