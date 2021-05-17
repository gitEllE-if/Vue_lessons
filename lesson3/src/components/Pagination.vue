<template>
  <div :class="[$style.pagination]">
    <button
      v-for="pageNbr in pageCnt"
      :key="pageNbr"
      :class="[$style.pageBtn]"
      @click="goToPage(pageNbr)"
    >
      {{ pageNbr }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    itemCnt: Number,
    cntPerPage: Number
  },
  methods: {
    goToPage(pageNbr) {
      this.$emit("page", pageNbr);
    }
  },
  computed: {
    pageCnt() {
      return Math.ceil(this.itemCnt / this.cntPerPage) || 5;
    }
  }
};
</script>

<style lang='scss' module>
.pagination {
  display: flex;
  .pageBtn {
    margin: 1px;
    color: white;
    font-weight: 700;
    background-color: lightseagreen;
    border: 1px solid lightseagreen;
    cursor: pointer;
    outline: none;
    &:hover {
      color: lightseagreen;
      background-color: white;
    }
  }
}
</style>
