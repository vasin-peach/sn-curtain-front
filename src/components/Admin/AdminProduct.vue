<template>
  <div
    class="admin-product"
    ref="admin_container"
  >
    <transition
      name="fade"
      id=""
      mode="out-in"
    >
      {{ loadingHeight }}
      <div
        v-if="loadingState"
        :style="{height: loadingHeight + 'px'}"
      >
        <loading class="card-loading"></loading>
      </div>
      <div
        class="admin-product-container row m-0"
        ref="admin_container"
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
              @submit.prevent="triggerUpdateProduct(productEdit._id)"
            >
              <div class="product-detail">
                <div class="row m-0">
                  <div class="col-12 col-sm col-md-12 col-xl-4 pmb-0">
                    <img
                      :src="
                  productEdit.brand.src"
                      :alt="productEdit.name"
                      class="image"
                      @click="triggerUpdateBrand()"
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
                                v-model="items.text"
                                :name="`price_name_${count}`"
                                id="price_name"
                                required
                              >
                              <div
                                class="remove"
                                @click="triggerDeletePrice(items._id)"
                              >
                                <font-awesome-icon
                                  icon="times"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                            <div class="value">
                              ฿<input
                                type="text"
                                v-model="items.value"
                                :name="`price_value_${count}`"
                                id="price_value"
                                required
                              > (<input
                                type="text"
                                v-model="items.weight"
                                :name="`price_weight_${count}`"
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
                    <hr class="mt-4 mb-4">
                  </div>
                  <div class="col-12 pmb-0">
                    <div class="row m-0 category">
                      <div class="col">
                        ประเภท
                      </div>
                      <div class="col text-right">
                        <input
                          type="text"
                          v-model="productEdit.category.val"
                          class="p-0 text-right"
                        />
                      </div>
                    </div>
                    <div class="row m-0 type ">
                      <div class="col">
                        ชนิด
                      </div>
                      <div class="col text-right">
                        <input
                          type="text"
                          v-model="productEdit.category.type.val"
                          class="p-0 text-right"
                        />
                      </div>
                    </div>
                    <div class="row m-0 nature">
                      <div class="col">
                        ลักษณะ
                      </div>
                      <div class="col row m-0">
                        <div
                          v-for="nature in productEdit.category.type.nature"
                          :key="nature.val"
                          :style="`background-image: url(${nature.option}); background: ${nature.option}`"
                          class="col"
                        >
                          {{ nature.text }}
                          <div
                            class="remove"
                            @click="triggerDeleteNature(nature.val)"
                          >
                            <font-awesome-icon
                              icon="times"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                        <div
                          class="col"
                          @click="triggerAddNature()"
                        >
                          <font-awesome-icon
                            icon="plus"
                            aria-hidden="true"
                          />
                        </div>

                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <hr class="mt-3 mb-2">
                  </div>
                  <div class="slideshow col-12">
                    <div class="title">
                      <div>รูปภาพ</div>
                      <div
                        class="add col-2"
                        @click="triggerAddSlide()"
                      >
                        <font-awesome-icon
                          icon="plus"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <div class="slidebox row m-0">
                      <div
                        v-for="slide in productEdit.assets"
                        :key="slide._id"
                        class="slide col-4"
                      >
                        <img v-lazy="slide.src">
                        <div
                          class="remove"
                          @click="triggerDeleteSlide(slide._id)"
                        >
                          <font-awesome-icon
                            icon="times"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <hr class="mt-3 mb-2">
                  </div>
                  <div class="col-12">
                    <div
                      class="button2"
                      @click="triggerUpdateProduct(productEdit._id)"
                    >อัพเดท</div>
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
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import isEmpty from "lodash.isempty";
import _ from "lodash";
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
      productEditUpdate: {},
      loadingHeight: 0
    };
  },
  methods: {
    ...mapActions(["productAll", "productDelete", "productUpdate"]),
    ...mapMutations([
      "filterCategoryOption",
      "filterTypeOption",
      "filterNatureOption",
      "updateStateProductAll"
    ]),

    // * Get all product
    async callProductAll() {
      // get product
      await this.productAll();

      // disable loading
      this.loadingState = false;
    },

    // * Trigger Add Product
    triggerAddProduct() {
      console.log("add product call");
    },

    // * Trigger Delete Product
    async triggerDeleteProduct(id) {
      // confirm by user
      const confirm = await this.$swal({
        title: "คุณต้องการลบสินค้านี้หรือไม่?",
        text: "เมื่อลบสินค้านี้ไปแล้ว คุณจะไม่สามารถนำกลับมาได้อีก",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#D44638",
        confirmButtonText: "ใช่, ลบ ",
        cancelButtonText: "ไม่, ย้อนกลับ"
      }).then(result => result.value);
      if (!confirm) return;

      // call
      const result = await this.productDelete(id).then(
        resp => resp,
        err => err
      );

      // check delete is success
      if (result.status != 200) return false;

      // update display
      const index = this.productAllData.findIndex(item => item._id == id);
      this.productAllData.splice(index, 1);
    },

    triggerUpdateBrand() {
      this.$swal({
        title: "เลือกภาพที่ต้องการเพิ่ม",
        input: "file",
        inputAttributes: {
          accept: "image/*",
          "aria-label": "อัพโหลดสไลด์ภาพสินค้า"
        }
      }).then(result => {
        if (!result.value) return;
        const reader = new FileReader();
        reader.onload = e => {
          this.productEdit.brand.src = e.target.result;
          this.productEdit.brand.status = "temp";
        };
        reader.readAsDataURL(result.value);
      });
    },

    triggerDeleteNature(id) {
      const index = this.productEdit.category.type.nature.findIndex(
        x => x.val == id
      );
      this.productEdit.category.type.nature.splice(index, 1);
    },

    triggerDeletePrice(id) {
      const index = this.productEdit.price.findIndex(x => x._id == id);
      this.productEdit.price.splice(index, 1);
    },

    triggerDeleteSlide(id) {
      const index = this.productEdit.assets.findIndex(x => x._id == id);
      this.productEdit.assets.splice(index, 1);
    },

    // * Trigger Add Option
    triggerAddOption(id) {
      this.$swal
        .mixin({
          input: "text",
          showCancelButton: true,
          confirmButtonText: "ต่อไป &rarr;",
          progressSteps: ["1", "2", "3"]
        })
        .queue([
          {
            title: "ชื่อของตัวเลือก",
            text: "เช่น ขนาด `150x250`"
          },
          {
            title: "ราคาของตัวเลือก",
            text: "ราคาของสินค้าในตัวเลือกนี้ เช่น `799`"
          },
          {
            title: "น้ำหนักสินค้า",
            text: "นำไปคิดราคาค่าส่งสินค้า หน่วยเป็นกรัม"
          }
        ])
        .then(result => {
          let val = result.value;
          if (!val[0] || !val[1] || !val)
            return this.$swal({
              type: "error",
              title: "ค่าต้องไม่ว่างปล่าว"
            });

          const data = {
            text: result.value[0],
            value: result.value[1],
            weight: result.value[2]
          };

          this.productEdit.price.push(data);
        });
    },

    // * Trigger Add Nature
    triggerAddNature() {
      this.$swal
        .mixin({
          input: "text",
          showCancelButton: true,
          confirmButtonText: "ต่อไป &rarr;",
          progressSteps: ["1", "2", "3"]
        })
        .queue([
          {
            title: "ชื่อชนิด",
            text: "ชื่อชนิดที่ต้องการเช่น 'สีฟ้า'"
          },
          {
            title: "ค่าของชนิด",
            text: "'ค่าของชนิดที่ต้องการเช่น 'blue'"
          },
          {
            title: "ตัวเลือกเพิ่มเติม",
            text:
              "hex สีหรือ url ภาพที่ต้องการโชว์ เช่น สี orange หรือ #444444 หรือ url"
          }
        ])
        .then(result => {
          let val = result.value;
          if (!val[0] || !val[1] || !val)
            return this.$swal({
              type: "error",
              title: "ค่าต้องไม่ว่างปล่าว"
            });

          const data = {
            text: result.value[0],
            val: result.value[1],
            option: result.value[2]
          };

          this.productEdit.category.type.nature.push(data);
        });
    },

    triggerAddSlide() {
      this.$swal({
        title: "เลือกภาพที่ต้องการเพิ่ม",
        input: "file",
        inputAttributes: {
          accept: "image/*",
          "aria-label": "อัพโหลดสไลด์ภาพสินค้า"
        }
      }).then(result => {
        if (!result.value) return;
        const reader = new FileReader();
        const id = Date.now();
        reader.onload = e => {
          this.productEdit.assets.push({
            _id: id,
            src: e.target.result,
            status: "temp"
          });
        };
        reader.readAsDataURL(result.value);
      });
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

    triggerUpdateProduct(id) {
      const original = this.productAllData.filter(x => x._id == id)[0];
      const update = this.productEdit;

      this.loadingState = true;
      this.productUpdate(this.productEdit).then(resp => {
        this.loadingState = false;

        // update `productAllData`
        let index = this.productAllData.findIndex(x => x._id == id);
        this.productAllData[index] = resp;
        this.productShow[index] = resp;
        this.updateStateProductAll({ data: resp, index: index });
      });
    }
  },
  watch: {
    // update `productShow` when get data from `productAllData`
    productAllData: {
      handler: function(data) {
        this.productShow = _.cloneDeep(data, true);
        this.productDetail = _.cloneDeep(data[0], true);
        this.prevCheckedDiv = _.cloneDeep(data[0]._id, true);

        // init options
        this.filterCategoryOption(data);
        this.filterTypeOption(data);
        this.filterNatureOption(data);

        return;
      },
      deep: true
    },

    // update `productEdit`
    productDetail: {
      handler: function(data) {
        if (!data) return false;
        this.productEdit = _.cloneDeep(this.productDetail, true);
      },
      deep: true
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
    this.$nextTick(() => {
      setTimeout(
        () => (this.loadingHeight = this.$refs.admin_container.clientHeight),
        2000
      );
    });
  },
  components: { Loading, VueBootstrapTypeahead }
};
</script>

<style>
</style>
