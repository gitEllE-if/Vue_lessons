<template>
  <div>
    <Chart :chartdata="chartData" :options="chartOptions" :height="380" />
    <div class="mr-7 text-right">
      total:
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
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: "right"
        }
      }
    };
  },
  computed: {
    ...mapGetters({ totalCost: "getTotalCost", items: "getPaymentList" }),
    chartData() {
      const itemsData = {};
      this.items.forEach(item => {
        if (!itemsData[item.category]) {
          itemsData[item.category] = Number(item.price);
        } else {
          itemsData[item.category] += Number(item.price);
        }
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
