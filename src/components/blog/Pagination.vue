<template>
  <div class="pagination">
    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-count="totalPage"
                   :page-size="5" layout="prev, pager, next, jumper" background>
    </el-pagination>
  </div>
</template>

<script>
import {mapState} from "vuex"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Pagination",
  props: {
    totalPage: {
      type: Number,
      require: true,
      default: 0
    },
    getBlogList: {
      type: Function,
      require: true
    }
  },
  computed: {
    ...mapState(["isOtherToHome"])
  },
  data() {
    return {
      currentPage: 1
    }
  },
  methods: {
    handleCurrentChange(newPage) {
      //对路由做一个判断，如果是首页，应该滚动到Header下方
      this.currentPage = newPage
      this.getBlogList(newPage)
    }
  },
  activated() {
    this.$nextTick(() => {
      if (!this.isOtherToHome) {
        this.currentPage = 1
      }
    })
  }
}
</script>

<style scoped>

.pagination{
  text-align: center;
}

>>>.el-pagination.is-background .btn-next, >>>.el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
  background-color: #ffffff !important;
}

</style>