<template>
  <div :class="[$style.pagination]">
    <button
      v-for="pageNbr in pageCnt"
      :key="pageNbr"
      :class="
        pageNbr === curPage + 1
          ? [$style.pageBtnCur, $style.pageBtn]
          : [$style.pageBtn]
      "
      @click="setPage(pageNbr - 1)"
    >
      {{ pageNbr }}
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { CNT_PER_PAGE } from "@/const";
export default {
  methods: {
    ...mapMutations(["setPage"])
  },
  computed: {
    ...mapGetters({ itemCnt: "getItemCnt", curPage: "getPage" }),
    pageCnt() {
      return Math.ceil(this.itemCnt / CNT_PER_PAGE);
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
  .pageBtnCur {
    text-decoration: underline;
  }
}
</style>
