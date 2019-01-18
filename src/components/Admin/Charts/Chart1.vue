<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["chartData", "option"],
  mounted() {
    this.renderChart(this.chartData, this.option);
  }
};
</script>

<style>
</style>
