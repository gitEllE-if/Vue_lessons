<template>
  <div :class="[$style.calc_wrap]">
    <div :class="[$style.calc]">
      <div :class="[$style.display]">
        <label>
          operand1
          <input v-model="operands.operand1" ref="operand1" />
        </label>
        <label>
          operand2
          <input v-model="operands.operand2" ref="operand2" />
        </label>
        <div>
          result: <span>{{ result }}</span>
        </div>
      </div>
      <div :class="[$style.operations]">
        <button
          v-for="op in operations"
          :key="op"
          @click.capture="calculate(op)"
          :class="[$style.btn_op1]"
        >
          <span>
            {{ op }}
          </span>
        </button>
      </div>
      <div :class="[$style.keyboard]" v-if="showKeyboard">
        <div :class="[$style.keyboardBtn]">
          <button
            v-for="dig in 10"
            :key="dig - 1"
            :class="[$style.btn_dig]"
            @click.prevent="addDig(operand, dig - 1)"
          >
            <span>
              {{ dig - 1 }}
            </span>
          </button>
          <button
            :class="[$style.btn_del, $style.btn_dig]"
            @click.prevent="delDig(operand)"
          >
            <span>←</span>
          </button>
        </div>
        <div :class="[$style.keyboardRadio]">
          <label>
            operand1
            <input type="radio" id="op1" value="operand1" v-model="operand" />
          </label>
          <label>
            operand2
            <input type="radio" id="op2" value="operand2" v-model="operand" />
          </label>
        </div>
      </div>
      <label :class="[$style.display]"
        >show keyboard
        <input type="checkbox" id="checkbox" v-model="showKeyboard" />
      </label>
      <div :class="[$style.error]" v-if="error">
        {{ error }}
      </div>
      <div :class="[$style.logs]" ref="logs">
        <div v-for="(log, id, index) in logs" :key="id">
          {{ `${index + 1})  ${log}` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data: () => ({
    operands: {
      operand1: "",
      operand2: ""
    },
    result: 0,
    error: "",
    operations: ["+", "-", "/", "x", "mod", "div", "pow"],
    logs: {},
    showKeyboard: false,
    operand: "operand1"
  }),
  methods: {
    addDig(operand, digit) {
      this.operands[operand] += digit;
    },
    delDig(operand) {
      this.operands[operand] = this.operands[operand]?.slice(0, -1);
    },
    check(op) {
      const { operand1, operand2 } = this.operands;
      this.error = "";
      if (!operand1 || !operand2) {
        this.error = "Enter the numbers!";
      } else if (isNaN(Number(operand1)) || isNaN(Number(operand2))) {
        this.error = "The operands must be a number!";
      } else if (
        (op === "/" || op === "div" || op === "mod") &&
        Number(operand2) === 0
      ) {
        this.error = "Division by zero!";
      }
      return this.error ? false : true;
    },
    calculate(op) {
      if (!this.check(op)) {
        this.result = "ERROR";
        this.addLog("invalid data input");
        return;
      }
      const operand1 = Number(this.operands.operand1);
      const operand2 = Number(this.operands.operand2);
      const calcOperations = {
        "+": () => operand1 + operand2,
        "-": () => operand1 - operand2,
        "/": () => operand1 / operand2,
        x: () => operand1 * operand2,
        pow: () => Math.pow(operand1, operand2),
        mod: () => operand1 % operand2,
        div: () => (operand1 - (operand1 % operand2)) / operand2
      };
      try {
        this.result = calcOperations[op]();
        this.addLog(`${operand1} ${op} ${operand2} = ${this.result}`);
      } catch (err) {
        console.warn(err);
        this.addLog("an error occurred while calculation");
      }
    },
    addLog(str) {
      this.$set(this.logs, Date.now(), str);
    }
  },
  watch: {
    logs: function() {
      const logEl = this.$refs.logs;
      if (logEl) {
        logEl.scrollTop = logEl.scrollHeight;
      }
    },
    operand: function() {
      const opEl = this.$refs[this.operand];
      opEl?.focus();
    }
  }
};
</script>
<style lang="scss" module>
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
  box-shadow: -2px 8px 20px 10px rgba($darkColor, 0.4);
  overflow: hidden;
  color: white;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  text-align: left;
  .display {
    outline: none;
    border: none;
    padding: 7px;
    background-color: $darkColor;
    label {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      input {
        margin-left: 20px;
        width: 100%;
      }
    }
    span {
      margin-left: 50px;
      font-weight: 700;
      font-size: 20px;
    }
  }
  .operations {
    display: grid;
    grid-template: repeat(2, 1fr) / repeat(4, 1fr);
    .btn_op1 {
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      border: 1px solid $darkColor;
      color: white;
      font-weight: 700;
      font-size: 18px;
      background-color: $brightColor;
      &:hover {
        span {
          transform: scale(1.3);
        }
        background-color: $darkColor;
        color: $brightColor;
      }
    }
    :last-child {
      grid-column: 3/5;
      grid-row: 2;
    }
  }
  .keyboard {
    background-color: $lightColor;
    .keyboardBtn {
      display: grid;
      grid-template: repeat(3, 1fr) / repeat(4, 1fr);
      .btn_dig {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        border: 1px solid $darkColor;
        color: white;
        font-weight: 600;
        font-size: 20px;
        background-color: $lightColor;
        &:not(:last-child) {
          height: 40px;
        }
        &:hover {
          span {
            transform: scale(1.3);
          }
          background-color: $darkColor;
        }
      }
      .btn_del {
        grid-column: 1;
        grid-row: 2/4;
      }
    }
    .keyboardRadio {
      border: 1px solid $darkColor;
      display: flex;
      justify-content: space-evenly;
    }
  }
  .logs {
    padding-left: 7px;
    overflow-y: auto;
    max-height: 200px;
    background-color: rgba($lightColor, 0.6);
  }
  .error {
    padding: 7px;
    background-color: $brightColor;
  }
}
</style>
