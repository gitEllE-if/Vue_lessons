<template>
  <div>
    <h2><span>X</span> Page not found</h2>
    <router-link to="/">Go to HOME</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>
<style lang="scss" module>
h2 {
  span {
    display: inline-block;
    width: 32px;
    height: 32px;
    background: lightseagreen;
    color: white;
    text-align: center;
    -moz-border-radius: 16px;
    -webkit-border-radius: 16px;
    border-radius: 16px;
  }
}
</style>
