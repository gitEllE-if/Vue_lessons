<template>
  <div :class="[$style.paymentList]">
    <div :class="[$style.pItemHeader, $style.pItem]">
      <div :class="[$style.pItemIdx]">#</div>
      <div :class="[$style.pItemParam]">Date</div>
      <div :class="[$style.pItemParam]">Category</div>
      <div :class="[$style.pItemValue]">Value</div>
    </div>
    <div v-for="item in items" :key="item.id" :class="[$style.pItem]">
      <div :class="[$style.pItemIdx]">{{ item.id }}</div>
      <div :class="[$style.pItemParam]">{{ item.date }}</div>
      <div :class="[$style.pItemParam]">{{ item.category }}</div>
      <div :class="[$style.pItemValue]">{{ item.price }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array
  },
  methods: {}
};
</script>

<style lang='scss' module>
.paymentList {
  min-width: 400px;
  .pItemHeader {
    font-weight: 700;
  }
  .pItem {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
    .pItemParam {
      min-width: 100px;
      text-align: left;
    }
    .pItemValue {
      min-width: 60px;
      text-align: left;
    }
    .pItemIdx {
      min-width: 30px;
      text-align: left;
    }
  }
}
</style>
