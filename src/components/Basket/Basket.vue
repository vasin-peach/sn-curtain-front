<template>
  <div class="basket">
    <div class="container">
      <div class="basket-container row m-0">
        <div class="basket-list col-12 col-sm-6 col-md-8 col-lg-8 col-xl-8">
          <div class="row m-0 pt-4 head">
            <div class="col text-left p-0">ตะกร้าสินค้า</div>
            <div class="col text-right p-0">Print</div>
            <div class="col-12 hr"></div>
          </div>
          <div class="content">
            <transition name="fade" mode="out-in">
              <div v-if="basketData == [] || basketData == ''">
                <div class="warpper">
                  <div>ตระกร้าสินค้าว่างปล่าว</div>
                  <div>
                    <router-link :to="{ name: 'Store' }">เลือกสินค้า</router-link>
                  </div>
                </div>
              </div>
              <transition-group name="list" tag="p" v-else>
                <div v-for="(item) in basketData" :key="item.id" class="basket-item">

                  <div class="remove" @click="basketDelete(item.id)">
                    <font-awesome-icon icon="times" aria-hidden="true" />
                  </div>
                  <div class="row">
                    <div class="col-5 col-sm-5 col-md-5 image">
                      <router-link :to="{ name: 'Product', params: { id: item.id } }">
                        <img v-lazy="item.data.brand.src" :alt="item.name || 'ชื่อสินค้า'">
                      </router-link>
                    </div>
                    <div class="col col-sm col-md detail">
                      <div class="title">
                        <router-link :to="{ name: 'Product', params: { id: item.id } }">
                          {{item.data.name}}
                        </router-link>
                      </div>
                      <div class="desc">
                        {{item.data.desc[0].val}}
                      </div>
                      <div class="amount">
                        <div class="amount-wrapper">
                          <div class="">
                            <div class="minus" @click="amountMinus(item.id)">
                              -
                            </div>
                            <div class="num">
                              {{ numberWithCommas(item.amount) }}
                            </div>
                            <div class="plus" @click="amountPlus(item.id)">
                              +
                            </div>
                          </div>
                          <div class="">
                            จำนวน
                          </div>
                        </div>
                      </div>
                      <div class="price-sm">
                        ฿{{numberWithCommas(item.buyOption * item.amount)}}
                      </div>
                    </div>
                    <div class="price-lg col col-sm-3 col-md-2">
                      ฿{{numberWithCommas(item.buyOption * item.amount)}}
                    </div>
                  </div>
                  <hr>
                </div>
              </transition-group>
            </transition>
          </div>
        </div>
        <div class="basket-summary col pt-4 pr-0">
          <div class="summary-block">
            <div class="title">
              ORDER SUMMARY
              <hr>
            </div>
              <div class="price">
                <div>สินค้ารวม</div>
                <div>฿{{numberWithCommas(sumPrice)}}</div>
              </div>
              <div class="transport">
                <div>ค่าขนส่ง</div>
                <div>
                  <b-form-select v-model="delivery" :options="deliveryData ? deliveryData : {text: 'LOADING...'}"></b-form-select>
                </div>
              </div>
              <div class="code">
                <div>ส่วนลด</div>
                <div class="color-green1">฿{{numberWithCommas(Math.round(sumDiscount))}}</div>
              </div>
              <div class="summary">
                <div>รวมทั้งหมด</div>
                <div>฿{{numberWithCommas(Math.round(sumAll))}}</div>
              </div>
              <hr>
              <div class="code-input">
                <input type="text" id="codeNumber" v-model="codeNumber">
            </div>
                <div class="transport-input p-0">

                </div>
                <hr>
                <div class="detail">
                  Our Phoenix Collection of Contemporary Door Styles now includes Strata, a very durable textured surface that provides a look and feel that is unmatched.
                  <hr>
            </div>
                  <router-link :to="{ name: 'Payment' }">
                    <div class="button">
                      ชำระเงิน
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import $ from "jquery";
import _ from "lodash";
export default {
  name: "Basket",
  ///
  // Data
  ///
  data() {
    return {
      timeout: null,
      oldItems: JSON.parse(localStorage.getItem("basket") || []),
      sumPrice: 0,
      sumTran: 0,
      sumAll: 0,
      sumDiscount: 0,
      codeNumber: null,
      delivery: 0
    };
  },

  ///
  // Mounted
  ///
  mounted() {
    this.updateSumPrice();
    this.deliveryGet();
  },

  ///
  // Watch
  ///
  watch: {
    basketData: function() {
      this.oldItems = JSON.parse(localStorage.getItem("basket") || []);
      this.updateSumPrice();
      this.updateSumAll();
    },
    codeNumber: function(code) {
      $("#codeNumber").removeClass(
        "color-red3 color-green1 border-red3 border-green1"
      );
      this.sumDiscount = 0;
      var _this = this;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function() {
        _this.codeNumberSearch(code);
      }, 500);
    },
    delivery: function(data) {
      this.sumTran = data;
      this.updateSumAll();
    }
  },

  ///
  // Methods
  ///
  methods: {
    ...mapMutations(["basketUpdate", "basketDelete"]),
    ...mapActions(["discountGet", "deliveryGet"]),
    updateSumPrice() {
      this.sumPrice = this.basketData.reduce((sum, item) => {
        return sum + item.buyOption * item.amount;
      }, 0);
      this.updateSumAll();
    },
    updateSumAll() {
      var sumAll = this.sumPrice + this.sumTran - this.sumDiscount;
      sumAll = this.sumPrice + this.sumTran - this.sumDiscount;
      this.sumAll = sumAll > 0 ? sumAll : 0;
    },
    amountMinus(id) {
      // get index by id
      var getIndex = this.basketData.findIndex(item => item.id == id);
      if (getIndex >= 0) {
        // check amount
        if (this.basketData[getIndex].amount <= 1) return false;
        // minus amount -1
        this.basketData[getIndex].amount -= 1;
        // remove array by index
        this.oldItems.splice(getIndex, 1);
        this.updateBasket(this.oldItems, this.basketData[getIndex], getIndex);
      }
    },
    amountPlus(id) {
      // get index by id
      var getIndex = this.basketData.findIndex(item => item.id == id);
      if (getIndex >= 0) {
        // check amount
        if (
          this.basketData[getIndex].amount >=
          this.basketData[getIndex].data.quantity
        )
          return false;
        // minus amount -1
        this.basketData[getIndex].amount += 1;
        // remove array by index
        this.oldItems.splice(getIndex, 1);
        this.updateBasket(this.oldItems, this.basketData[getIndex], getIndex);
      }
    },
    updateBasket(oldItems, payload, getIndex) {
      oldItems.splice(getIndex, 0, payload);
      localStorage.setItem("basket", JSON.stringify(oldItems));
      this.basketUpdate(JSON.parse(localStorage.getItem("basket")));
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    codeNumberSearch(code) {
      this.discountGet(code)
        .then(response => {
          $("#codeNumber").removeClass("color-red3 border-red3");
          $("#codeNumber").addClass("color-green1 border-green1");

          // discount sumPrice
          var discount = response.data.discount;
          if (discount.percent) {
            this.sumDiscount = (this.sumPrice * discount.percent) / 100;
          } else if (discount.amount) {
            this.sumDiscount = discount.amount;
          }

          // sum all
          this.updateSumAll();
        })
        .catch(err => {
          $("#codeNumber").removeClass("color-green1 border-green1");
          $("#codeNumber").addClass("color-red3 border-red3");
          this.updateSumAll();
        });
    }
  },

  ///
  // Computed
  ///
  computed: {
    ...mapGetters(["basketData", "deliveryData"])
  }
};
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in-out;
}
.list-enter /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease-in;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
