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
                        ฿{{numberWithCommas(item.data.price * item.amount)}}
                      </div>
                    </div>
                    <div class="price-lg col col-sm-3 col-md-2">
                      ฿{{numberWithCommas(item.data.price * item.amount)}}
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
              <div>รวมราคาส่ง</div>
              <div>฿{{numberWithCommas(sumPrice)}}</div>
            </div>
            <div class="transport">
              <div>ราคาขนส่ง</div>
              <div>ฟรี</div>
            </div>
            <div class="tax">
              <div>ภาษี</div>
              <div>ฟรี</div>
            </div>
            <div class="summary">
              <div>รวมทั้งหมด</div>
              <div>฿{{numberWithCommas(sumAll)}}</div>
            </div>
            <hr>
            <div class="detail">
              Our Phoenix Collection of Contemporary Door Styles now includes Strata, a very durable textured surface that provides a look and feel that is unmatched.
              <hr>
            </div>
            <div class="button">
              ชำระเงิน
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Basket",
  ///
  // Data
  ///
  data() {
    return {
      oldItems: JSON.parse(localStorage.getItem("basket") || []),
      sumPrice: 0,
      sumTran: 0,
      sumTax: 0,
      sumAll: 0,
    };
  },

  ///
  // Mounted
  ///
  mounted() {
    this.updateSumPrice();
  },

  ///
  // Watch
  ///
  watch: {
    basketData: function() {
      this.oldItems = JSON.parse(localStorage.getItem("basket") || [])
      this.updateSumPrice();
    }
  },

  ///
  // Methods
  ///
  methods: {
    ...mapMutations(['basketUpdate', 'basketDelete']),
    updateSumPrice() {
      this.sumPrice  = this.basketData.reduce((sum, item) => {
        return sum + (item.data.price * item.amount)
      }, 0)
      this.updateSumAll();
    },
    updateSumAll() {
      this.sumAll = this.sumPrice + this.sumTran + this.sumTax;
    },
    amountMinus(id) {
      // get index by id
      var getIndex = this.basketData.findIndex((item) => item.id == id)
      if (getIndex >= 0) {

        // check amount
        if (this.basketData[getIndex].amount <= 1) return false
        // minus amount -1
        this.basketData[getIndex].amount -= 1;
        // remove array by index
        this.oldItems.splice(getIndex, 1);
        this.updateBasket(this.oldItems, this.basketData[getIndex], getIndex)
      }
    },
    amountPlus(id) {
      // get index by id
      var getIndex = this.basketData.findIndex((item) => item.id == id)
      if (getIndex >= 0) {
        
        // check amount
        if (this.basketData[getIndex].amount >= this.basketData[getIndex].data.quantity) return false
        // minus amount -1
        this.basketData[getIndex].amount += 1;
        // remove array by index
        this.oldItems.splice(getIndex, 1);
        this.updateBasket(this.oldItems, this.basketData[getIndex], getIndex)
      }

    },
    updateBasket(oldItems, payload, getIndex) {
      oldItems.splice(getIndex, 0, payload);
      localStorage.setItem("basket", JSON.stringify(oldItems))
      this.basketUpdate(JSON.parse(localStorage.getItem('basket')))
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },

  ///
  // Computed
  ///
  computed: {
    ...mapGetters(["basketData"])
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
