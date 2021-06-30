<template>
  <div :class="[$style.diagram]">
    <div :class="[$style.diagramCircle]"></div>
    <div>
      Total: <span>{{ totalCost }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({ totalCost: "getTotalCost" })
  }
};
</script>

<style lang='scss' module>
.diagram {
  margin-left: 100px;
  .diagramCircle {
    width: 200px;
    height: 200px;
    background: lightseagreen;
    -moz-border-radius: 100px;
    -webkit-border-radius: 100px;
    border-radius: 100px;
    margin-bottom: 30px;
  }
  span {
    color: lightseagreen;
    font-weight: 700;
    font-size: 20px;
  }
}
</style>
