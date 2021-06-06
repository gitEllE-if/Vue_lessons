<template>
  <div :class="[$style.diagram]"></div>
</template>

<script>
export default {
  props: {},
  methods: {}
};
</script>

<style lang='scss' module>
.diagram {
  width: 200px;
  height: 200px;
  background: lightseagreen;
  -moz-border-radius: 100px;
  -webkit-border-radius: 100px;
  border-radius: 100px;
  margin-left: 100px;
}
</style>
