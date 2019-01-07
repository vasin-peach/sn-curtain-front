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
                      <div>จำนวน: {{ items.infinity ? 'ไม่จำกัด' : items.quantity }}</div>
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
              @submit.prevent="triggerUpdateDiscount(discountCheckedData)"
            >
              <div class="discount-detail">
                <div class="row m-0">
                  {{discountCheckedData}}
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
  // ! DATA
  data() {
    return {
      loadingState: true,
      loadingHeight: 0,
      search: "",
      discountCheckedData: null,
      discountAllShowData: null,
      discountPrevId: null
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
      this.discountCheckedData = data;
      this.checkAnimate(this.discountPrevId, data._id);
    },

    // * [TRIGGER] Get Discount data
    async triggerDiscountAllGet() {
      // call get discount and disable loading animation
      const discountData = await this.discountAllGet();
      !isEmpty(discountData) ? (this.loadingState = false) : false;

      // init show discount
      this.discountAllShowData = this.discountAllData || [];
      // init discountCheckedData by data index 0
      this.discountCheckedData = this.discountAllData[0] || null;
      // init discountPrevId by data index 0
      this.discountPrevId = this.discountAllData[0]._id || null;
    },

    // * [TRIGGER] Update Discount
    async triggerDiscountUpdate() {},

    // * [TRIGGER] Delete Discount
    async triggerDiscountDelete() {},

    // * [TRIGGER] Create Discount
    async triggerDiscountCreate() {},

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
      this.discountCheckedData = searchResult[0];

      // re check animate
      this.checkAnimate(this.discountPrevId, searchResult[0]._id);

      // display discount data
      return (this.discountAllShowData = searchResult);
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
