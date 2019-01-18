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
        v-else
      >
        <div class="admin-dashboard-left card-container col">
          <div class="card-box">
            <canvas
              id="myChart"
              width="auto"
              height="100"
            ></canvas>
          </div>
        </div>

      </div>

    </transition>

  </div>
</template>

<script>
import Chart1 from "./Charts/Chart1";
import Loading from "../Loading";
import moment from "moment";
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
      timeList: []
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
            ).format("hh:mm")
          );
        }
      }
    },

    // * [FORMAT] change VIEW time format to HH:MM
    async viewTimeFormat() {
      this.productViewNew = this.productView.map(items => {
        let start = moment(items.created_at);
        let remaider = 30 - (start.minute() % 30);
        return {
          t: moment(start)
            .add(remaider, "minute")
            .format("hh:mm"),
          y: 30
        };
      });
    },

    // * [INIT] init chart
    initChart() {
      $(function() {
        console.log(document.getElementById("myChart"));
        var ctx = document.getElementById("myChart").getContext("2d");

        var myLineChart = new Chart(ctx, {
          type: "line",
          data: {
            xLabels: this.timeList,
            // yLabels: [0, 100],
            datasets: [
              {
                label: "time",
                backgroundColor: "#0088d4",
                borderColor: "#0088d4",
                data: this.productViewNew,
                fill: false
              }
              // {
              //   label: "time",
              //   backgroundColor: "rgba(0, 136, 212, .4)",
              //   borderColor: "rgba(0, 136, 212, .4)",
              //   borderDash: [8, 8],
              //   data: [
              //     "55.88",
              //     "56.69",
              //     "56.31",
              //     "55.85",
              //     "56.47",
              //     "55.53",
              //     "56.58",
              //     "55.14",
              //     "55.39"
              //   ],
              //   fill: false
              // }
            ]
          },
          options: {
            animation: false,
            responsive: true,
            elements: {
              line: {
                tension: 0
              }
            },
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  display: true
                }
              ],
              yAxes: [
                {
                  display: true,
                  type: "category",
                  position: "left",
                  ticks: {
                    stepSize: 1,
                    callback: function(tickValue, index, ticks) {
                      if (!(index % parseInt(ticks.length / 5))) {
                        return tickValue;
                      }
                    }
                  }
                }
              ]
            }
          }
        });
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
  components: { Loading, Chart1 }
};
</script>

<style>
</style>
