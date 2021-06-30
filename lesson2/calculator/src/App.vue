<template>
  <div id="app">
    <Calculator />
  </div>
</template>

<script>
import Calculator from '@components/Calculator.vue'

export default {
  name: 'App',
  components: {
    Calculator
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background: radial-gradient(
      circle,
      rgba(rgb(187, 239, 252), 0.6) 0%,
      rgba(rgb(12, 30, 54), 0.8) 100%
    ),
    url("./assets/bg1.jpeg") center center / 30% repeat;
}
</style>
