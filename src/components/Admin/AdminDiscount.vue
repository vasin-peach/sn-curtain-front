<template>
  <div
    class="admin-discount"
    ref="admin_container"
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
        class="admin-discount-container row m-0"
        key="admin-discount"
        v-else
      >
        <div class="admin-discount-left card-container col-6 col-md col-xl-4">
          <div class="card-box">
            <div class="discount-search bar-search row m-0">
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
                @click="triggerDiscountCreate()"
              >
                <font-awesome-icon
                  icon="plus"
                  aria-hidden="true"
                />
              </div>
              <div class="discount-list-container">
                <div
                  v-if="!discountAllShowData"
                  class="data-empty"
                >
                  ไม่มีรายการ
                </div>
                <div
                  v-else
                  class="discount-list row m-0"
                  v-for="(items, count) in discountAllShowData"
                  :key="items._id"
                  :class="[items._id, {'checked': count == 0}]"
                  @click="triggerChecked(items)"
                >
                  <div
                    class="discount-list-delete"
                    @click="triggerDiscountDelete(items._id)"
                  >
                    <font-awesome-icon
                      icon="times"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="content col">
                    <div>
                      <div>{{items.name}}</div>
                      <div>ประเภท: {{items.discount.delivery ? 'ฟรีค่าส่ง' : items.discount.percent ? 'ลดเป็นเปอร์เซ็น' : items.discount.amount ? 'ลดเป็นจำนวนเงิน' : ''}}</div>
                      <!-- <div>จำนวน: {{ items.infinity ? 'ไม่จำกัด' : items.quantity }}</div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="admin-discount-right card-container col-6 col-md-8">
          <div class="card-box">
            <form
              class="discount-detail-form"
              @submit.prevent="triggerDiscountUpdate(discountCheckedData)"
            >
              <div class="discount-detail">
                <div class="row m-0">
                  <div class="col-12">
                    <div>
                      <div class="name row m-0 d-flex justify-content-center align-items-center">
                        <div class="col-3">
                          ชื่อส่วนลด:
                        </div>
                        <div class="col">
                          <input
                            type="text"
                            v-model="discountCheckedData.name"
                            name="name"
                            id="name"
                            placeholder="ชื่อส่วนลด"
                            required
                          >
                        </div>
                      </div>
                      <div class="mb-3 name row m-0 d-flex justify-content-center align-items-center">
                        <div class="col-3">
                          โค้ดส่วนลด
                        </div>
                        <div class="col">
                          <input
                            class="mt-0"
                            type="text"
                            v-model="discountCheckedData.code"
                            placeholder="โค้ดส่วนลด"
                            required
                          />
                        </div>
                      </div>
                      <div class="desc row m-0 d-flex">
                        <div class="col-3">
                          คำอธิบาย:
                        </div>
                        <div class="col">
                          <textarea
                            type="text"
                            v-model="discountCheckedData.desc"
                            name="desc"
                            id="desc"
                            placeholder="คำอธิบายส่วนลด"
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div class="row m-0 d-flex justify-content-center align-items-center">
                        <div class='col-3'>
                          ประเภท:
                        </div>
                        <div class="col">
                          <b-form-select
                            v-model="select.selected"
                            :options="select.options"
                          ></b-form-select>
                          <b-form-input
                            type="number"
                            v-if="select.selected == 'percent'"
                            v-model="discountCheckedData.discount.percent"
                            placeholder="จำนวนเปอร์เซ็นที่ลด เช่น 20 (คือลด 20%)"
                            min="1"
                            max="100"
                            required
                          />
                          <b-form-input
                            type="number"
                            v-if="select.selected == 'amount'"
                            v-model="discountCheckedData.discount.amount"
                            placeholder="จำนวนราคาที่ลด เช่น 200 (คือลด 200 บาท)"
                            min="1"
                            required
                          />
                        </div>
                      </div>
                      <div class="row m-0 mt-2">
                        <div class="col">
                          <hr>
                        </div>
                      </div>
                      <div class="row m-0 d-flex justify-content-center align-items-center">
                        <div class='col-3'>
                          เจ้าของโค้ด:
                        </div>
                        <div class="col">
                          <input
                            type="text"
                            v-model="discountCheckedData.owner"
                            placeholder="ไม่มีเจ้าของ"
                          >
                        </div>
                      </div>
                      <div class="row m-0">
                        <div class="col">
                          <hr class="mt-3 mb-4">
                        </div>
                      </div>
                      <div class="row m-0">
                        <div class="col">
                          <button
                            type="submit"
                            class="button2 w-100"
                          >อัพเดท</button>
                        </div>
                      </div>
                    </div>
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
import _ from "lodash";
export default {
  // ! DATA
  data() {
    return {
      loadingState: true,
      loadingHeight: 0,
      search: "",
      discountCheckedData: null,
      discountAllShowData: null,
      discountPrevId: null,
      select: {
        selected: null,
        options: [
          { value: "percent", text: "เปอร์เซ็น" },
          { value: "amount", text: "จำนวนบาท" },
          { value: "delivery", text: "ส่งฟรี" }
        ]
      }
    };
  },

  // ! METHODS
  methods: {
    // * [MAP ACTIONS]
    ...mapActions([
      "discountAllGet",
      "discountUpdate",
      "discountDelete",
      "discountCreate"
    ]),

    // * [TRIGGER] User Checked
    async triggerChecked(data) {
      this.discountCheckedData = _.cloneDeep(data, true);
      this.checkAnimate(this.discountPrevId, data._id);

      // init discount type selected
      if (data.discount.percent) this.select.selected = "percent";
      else if (data.discount.amount) this.select.selected = "amount";
      else this.select.selected = "delivery";
    },

    // * [TRIGGER] Get Discount data
    async triggerDiscountAllGet() {
      // call get discount and disable loading animation
      const discountData = await this.discountAllGet();
      !isEmpty(discountData) ? (this.loadingState = false) : false;

      // init show discount
      this.discountAllShowData = _.cloneDeep(this.discountAllData || [], true);

      // init discountCheckedData by data index 0
      this.discountCheckedData = _.cloneDeep(
        this.discountAllData[0] || null,
        true
      );
      // init discountPrevId by data index 0
      this.discountPrevId = _.cloneDeep(
        this.discountAllData[0]._id || null,
        true
      );

      // init discount type selected
      if (this.discountAllData[0].discount.percent)
        this.select.selected = "percent";
      else if (this.discountAllData[0].discount.amount)
        this.select.selected = "amount";
      else this.select.selected = "delivery";
    },

    // * [TRIGGER] Update Discount
    async triggerDiscountUpdate(data) {
      // send data to backend
      if (!data || isEmpty(data)) return;
      let updateResult = await this.discountUpdate(data);
      updateResult = updateResult.data ? updateResult.data.data : false;

      // update discountShow
      let index = await this.discountAllShowData.findIndex(
        x => x._id == updateResult._id
      );

      if (index < 0) return this.discountAllShowData.unshift(updateResult);

      this.discountAllShowData[index] = updateResult;
    },

    // * [TRIGGER] Delete Discount
    async triggerDiscountDelete(id) {
      const confirm = await this.$swal({
        type: "warning",
        title: "ยืนยันการลบส่วนลด",
        text: "คุณต้องการลบส่วนลดนี้หรือไม่?",
        showCancelButton: true,
        confirmButtonColor: "#D44638",
        confirmButtonText: "ใช่, ลบ ",
        cancelButtonText: "ไม่, ย้อนกลับ"
      }).then(result => result.value);
      if (!confirm) return;

      let deleteResult = await this.discountDelete(id);
      deleteResult = deleteResult.data.data;

      let index = await this.discountAllShowData.findIndex(
        x => x._id == deleteResult._id
      );
      this.discountAllShowData.splice(index, 1);
    },

    // * [TRIGGER] Create Discount
    async triggerDiscountCreate() {
      // init discouintChecked to empty
      this.select.selected = "percent";
      this.discountCheckedData = {
        name: null,
        code: null,
        desc: null,
        discount: {
          percent: 0
        },
        owner: null
      };
    },

    // * [TRIGGER] Search
    async triggerSearch(word) {
      /**
       * @param {STRING} word - word to search
       */

      const searchResult = await this.discountAllData.filter(item => {
        return (
          item.name.includes(word) ||
          item.quantity == word ||
          item.owner == word
        );
      });

      if (isEmpty(searchResult)) return (this.discountAllShowData = null);

      // update checked data to index 0
      this.discountCheckedData = _.cloneDeep(searchResult[0], true);

      // re check animate
      this.checkAnimate(this.discountPrevId, searchResult[0]._id);

      // display discount data
      return (this.discountAllShowData = _.cloneDeep(searchResult, true));
    },

    // * [ANIMATE] checked
    async checkAnimate(current, next) {
      /**
       * @param {STRING} current - element class name (_id) before animate
       * @param {STRING} next - target element class name (_id) to animate
       */

      // uncheck and check new element
      $(`.${current}`).removeClass("checked");
      $(`.${next}`).addClass("checked");

      // update discountPrevId
      this.discountPrevId = next;
    }
  },

  // ! WATCH
  watch: {
    search: function(word) {
      var _this = this;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function() {
        _this.triggerSearch(word);
      }, 500);
    },
    "select.selected": function(type) {
      if (type == "delivery") {
        delete this.discountCheckedData.discount.percent;
        delete this.discountCheckedData.discount.amount;
        this.discountCheckedData.discount.delivery = true;
      } else if (type == "percent") {
        delete this.discountCheckedData.discount.delivery;
        delete this.discountCheckedData.discount.amount;
      } else {
        delete this.discountCheckedData.discount.percent;
        delete this.discountCheckedData.discount.delivery;
      }
    }
  },

  // ! COMPUTED
  computed: {
    ...mapGetters(["discountAllData"])
  },

  // ! MOUNTED
  mounted() {
    // * init get discount data
    this.triggerDiscountAllGet();
    // * init loading height
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.$refs.admin_container) {
          this.loadingHeight = this.$refs.admin_container.clientHeight;
        }
      }, 2000);
    });
  },

  // ! COMPONENTS
  components: { Loading }
};
</script>

<style>
</style>
