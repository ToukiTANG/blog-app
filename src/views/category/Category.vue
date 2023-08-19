<template>
  <div class="category">
    <el-card shadow="always">
      <h2 class="category-name">分类{{ category.categoryName }}下的文章</h2>
    </el-card>
    <articles :getBlogList="getBlogList" :blogList="blogList" :total="total" :pageSize="pageSize"></articles>
  </div>

</template>

<script>
import Articles from "@/components/blog/Blogs";
import {getBlogListByCategoryId, getBlogListByCategoryName} from "@/api/category";
import {Message} from "element-ui";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Category",
  components: {Articles},
  data() {
    return {
      blogList: [],
      total: 0,
      pageSize: 0,
      category: null
    }
  },
  watch: {
    '$route.fullPath'() {
      //检测全局的路由变化，如果是通向本组件的，应该重新进行加载
      //在这里create函数是不能有这个效果的，因为重用是指跳转到另外的category页面，相当于create了另一个页面
      if (this.$route.name === "category") {
        this.getBlogList()
      }
    }
  },
  computed: {
    categoryId() {
      return this.$route.params.categoryId
    }
  },
  methods: {
    getBlogList(pageNum) {
      getBlogListByCategoryId(this.categoryId, pageNum).then(res => {
        this.blogList = res.data.blogInfoPage.dataList
        this.category=res.data.category
        this.total = res.data.blogInfoPage.total
        this.pageSize = res.data.pageSize
      }).catch(() => {
        Message({type: "error", message: "分类文章加载失败，请重试！", showClose: true})
      })
    }
  },
  created() {
    this.getBlogList()
  },
  mounted() {
  }
}
</script>

<style scoped>

.category .el-card {
  padding: 0;
  margin-bottom: 10px;
  border: 1px solid var(--color-border);
  text-align: center;
  /*box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, .3)*/

}
</style>
