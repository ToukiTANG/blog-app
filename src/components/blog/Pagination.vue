<template>
  <div class="pagination">
    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :total="total"
                   :page-size="pageSize" layout="prev, pager, next, jumper" background>
    </el-pagination>
  </div>
</template>

<script>
import {mapState} from "vuex"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Pagination",
  props: {
    total: {
      type: Number,
      require: true,
      default: 0
    },
    pageSize: {
      type: Number,
      require: true
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
      //如果是首页，则滚动至Header下方
      if (this.$route.name === 'home') {
        window.scrollTo({top: this.clientSize.clientHeight, behavior: 'smooth'})
      } else {
        //其它页面（分类和标签页）滚动至顶部
        this.scrollToTop()
      }
      this.currentPage = newPage
      this.getBlogList(newPage)
    }
  },
  //目前只有首页被缓存，所以这个钩子只会被首页调用
  activated() {
    this.$nextTick(() => {
      if (!this.isOtherToHome) {
        //从其它页面路由到首页时，让首页的分页组件页码重置到第一页
        this.currentPage = 1
      }
    })
  }
}
</script>

<style scoped>

.pagination {
  text-align: center;
  margin-bottom: 30px;
}

>>> .el-pagination.is-background .btn-next, >>> .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
  background-color: #ffffff !important;
}

</style>