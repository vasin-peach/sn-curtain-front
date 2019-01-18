<template>
  <div
    class="admin-dashboard"
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
        <loading class="card-login"></loading>
      </div>

      <div
        class="admin-dashboard-container row m-0"
        key="admin-dashboard"
        x
        v-else
      >
        <div class="admin-dashboard-left col-12">
          <div class="card-box">
            <div class="card-title">
              (Time Series) การดูสินค้า
            </div>
            <canvas id="graph"></canvas>
          </div>
        </div>

        <div class="admin-dashboard-left card-container col-12">
          <div class="card-box">
            <div class="card-title">
              สินค้ายอดนิยม
            </div>
            <Section4></Section4>
          </div>
        </div>

      </div>

    </transition>

  </div>
</template>

<script>
import Chart1 from "./Charts/Chart1";
import Loading from "../Loading";
import Section4 from "../Landing/Section4";
import moment from "moment-timezone";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "dashboard",
  data() {
    return {
      loadingState: true,
      loadingHeight: 0,
      productData: null,
      productView: null,
      productViewNew: null,
      timeList: [],
      timeSeries: []
    };
  },

  watch: {
    timeList: function() {
      setTimeout(() => {
        this.initChart();
      }, 1000);
    }
  },

  // !METHODS
  methods: {
    ...mapActions(["productAll", "viewGet"]),

    // * [TRIGGER] get product
    async triggerProductGet() {
      this.productData = await this.productAll();
      this.productView = await this.viewGet();

      // * View time change format
      await this.viewTimeFormat();

      // * Genarate Time
      await this.genTime();

      this.loadingState = false;
    },

    // * [GENERATE] create array of time
    async genTime() {
      this.timeList = [];
      for (let hour = 0; hour < 24; hour++) {
        for (let min = 0; min <= 30; min += 30) {
          this.timeList.push(
            moment(
              `${("0" + hour).slice(-2)}:${("0" + min).slice(-2)}`,
              "hh:mm"
            ).format("HH:mm")
          );
        }
      }
    },

    // * [FORMAT] change VIEW time format to HH:MM
    async viewTimeFormat() {
      for (let hour = 0; hour < 24; hour++) {
        for (let min = 0; min <= 30; min += 30) {
          var before = moment(
            `${("0" + hour).slice(-2)}:${("0" + min).slice(-2)}`,
            "HH:mm"
          ).subtract(30, "minute");
          var after = moment(
            `${("0" + hour).slice(-2)}:${("0" + min).slice(-2)}`,
            "HH:mm"
          );

          var f = 0;
          this.productView.map(items => {
            let isBW = moment(items.created_at)
              .tz("Asia/Bangkok")
              .isBetween(before, after);
            if (isBW) f += 1;
          });

          this.timeSeries.push({ x: after.format("HH:mm"), y: f });
        }
      }
    },

    // * [INIT] init chart
    initChart() {
      var ctx = document.getElementById("graph").getContext("2d");
      var bar = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: "รับชม",
              data: this.timeSeries,
              fill: false,
              borderColor: "#ee9b5c",
              pointRadius: 5,
              pointHoverRadius: 10
            }
          ]
        },
        options: {
          responsive: true,
          title: {
            display: false
          },
          tooltips: {
            mode: "index",
            intersect: false
          },
          hover: {
            mode: "nearest",
            intersect: true
          },
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  parser: "HH:mm"
                },
                scaleLabel: {
                  display: true,
                  labelString: "เวลา"
                }
              }
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "จำนวน"
                }
              }
            ]
          }
        }
      });
    }
  },

  // ! COMPUTED
  computed: {
    ...mapGetters(["productAllData"])
  },

  // ! MOUNTED
  async mounted() {
    // * Trigger get product
    await this.triggerProductGet();

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
  components: { Loading, Chart1, Section4 }
};
</script>

<style>
</style>