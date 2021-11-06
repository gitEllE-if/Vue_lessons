<script>
import { Doughnut } from "vue-chartjs";
import ChartPluginLabels from "chartjs-plugin-labels";
export default {
  extends: Doughnut,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.addPlugin(ChartPluginLabels);
    this.renderChart(this.chartdata, this.options);
  },
  watch: {
    chartdata() {
      this.renderChart(this.chartdata, this.options);
    }
  }
};
</script>
