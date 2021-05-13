<template>
  <main class="calc_wrap">
    <div class="calc" @click="addExpr($event)">
      <textarea readonly class="display" v-model="expr"></textarea>
      <div class="btn_op2"><span class="calc_el">^</span></div>
      <div class="btn_op2"><span class="calc_el">pi</span></div>
      <div class="btn_op2">
        <span @click="clearAll" class="calc_el">AC</span>
      </div>
      <div class="btn_op2">
        <span @click="clear" class="calc_el">C</span>
      </div>
      <div class="btn_op1"><span class="calc_el">/</span></div>
      <div class="btn_op2"><span class="calc_el">sqrt</span></div>
      <div class="btn_dig"><span class="calc_el">7</span></div>
      <div class="btn_dig"><span class="calc_el">8</span></div>
      <div class="btn_dig"><span class="calc_el">9</span></div>
      <div class="btn_op1"><span class="calc_el">*</span></div>
      <div class="btn_op2"><span class="calc_el">%</span></div>
      <div class="btn_dig"><span class="calc_el">4</span></div>
      <div class="btn_dig"><span class="calc_el">5</span></div>
      <div class="btn_dig"><span class="calc_el">6</span></div>
      <div class="btn_op1"><span class="calc_el">-</span></div>
      <div class="btn_op2"><span class="calc_el">(</span></div>
      <div class="btn_dig"><span class="calc_el">1</span></div>
      <div class="btn_dig"><span class="calc_el">2</span></div>
      <div class="btn_dig"><span class="calc_el">3</span></div>
      <div class="btn_op1"><span class="calc_el">+</span></div>
      <div class="btn_op2"><span class="calc_el">)</span></div>
      <div class="btn_zero"><span class="calc_el">0</span></div>
      <div class="btn_dig"><span class="calc_el">.</span></div>
      <div class="btn_op1">
        <span @click="calculate" class="calc_el">=</span>
      </div>
    </div>
  </main>
</template>

<script>
import { evaluate } from "mathjs";
export default {
  name: "Calculator",
  data() {
    return {
      expr: 0
    };
  },
  methods: {
    calculate(event) {
      event.stopPropagation();
      try {
        this.expr = evaluate(this.expr);
      } catch (err) {
        console.warn(err);
        this.expr = "ERROR";
      }
    },
    addExpr(event) {
      const newExpr = event.target.innerHTML;
      if (
        (typeof this.expr === "number" && !newExpr.match(/[\^*/+-]/)) ||
        this.expr === "ERROR"
      ) {
        this.expr = "";
      }
      this.expr += newExpr;
    },
    clear(event) {
      event.stopPropagation();
      this.expr = typeof this.expr === "number"
        ? 0
        : this.expr.slice(0, -1);
    },
    clearAll(event) {
      event.stopPropagation();
      this.expr = 0;
    }
  }
};
</script>
<style scoped lang="scss">
$darkColor: rgb(30, 43, 51);
$mediumColor: rgb(57, 81, 97);
$lightColor: rgb(79, 112, 134);
$brightColor: rgb(189, 95, 41);

.calc_wrap {
  width: 352px;
  margin: 30px auto;
}
.calc {
  border: 1px solid $darkColor;
  border-radius: 10px;
  box-shadow: -2px 8px 20px 10px rgba($darkColor, 0.4);
  overflow: hidden;
  color: white;
  font-weight: 700;
  font-size: 20px;
  display: grid;
  grid-template: minmax(50px, 2fr) repeat(5, 1fr) / repeat(5, 1fr);
  gap: 1px;
  .display {
    grid-column: 1/6;
    grid-row: 1;
    resize: none;
    outline: none;
    color: white;
    border: none;
    font-weight: 700;
    font-size: 24px;
    text-align: right;
    padding: 7px;
    background-color: $darkColor;
  }
  .btn_dig {
    background-color: $lightColor;
  }
  .btn_op1 {
    background-color: $brightColor;
  }
  .btn_op2 {
    background-color: $mediumColor;
  }
  .btn_zero {
    grid-column: 2/4;
    grid-row: 6;
    background-color: $lightColor;
  }
}
.calc_el {
  display: block;
  padding: 20px;
  cursor: pointer;
  &:hover {
    transform: scale(1.5);
  }
}
</style>
