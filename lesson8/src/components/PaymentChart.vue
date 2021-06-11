<template>
  <div>
    <Chart :chartdata="chartData" :options="chartOptions" />
    <div class="mt-8 text-center">
      Total:
      <span class="teal--text"
        ><strong>{{ totalCost }}</strong></span
      >
    </div>
  </div>
</template>

<script>
import Chart from "@components/Chart";
import { mapGetters } from "vuex";
export default {
  components: {
    Chart
  },
  data() {
    return {
      chartOptions: { responsive: true, maintainAspectRatio: false }
    };
  },
  computed: {
    ...mapGetters({ totalCost: "getTotalCost", items: "getPaymentList" }),
    chartData() {
      const itemsData = {};
      this.items.forEach(item => {
        if (!itemsData[item.category]) {
          itemsData[item.category] = Number(item.price);
        }
        itemsData[item.category] += Number(item.price);
      });
      return {
        labels: Array.from(Object.keys(itemsData)),
        datasets: [
          {
            data: Array.from(Object.values(itemsData)),
            backgroundColor: [
              "#4db6ac",
              "#ff80ab",
              "#039be5",
              "#ffd600",
              "#e040fb",
              "#b388ff",
              "#00e676"
            ]
          }
        ]
      };
    }
  }
};
</script>
