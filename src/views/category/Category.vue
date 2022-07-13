<template>
  <div class="Category">
    <h2 class="category-name">分类{{ categoryName }}下的文章</h2>
    <articles :getBlogList="getBlogList" :blogList="blogList" :totalPage="totalPage"></articles>
  </div>

</template>

<script>
import Articles from "@/components/blog/Articles";
import {getBlogListByCategoryName} from "@/api/category";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Category",
  components: {Articles},
  data() {
    return {
      blogList: [],
      totalPage: 0,
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
    categoryName() {
      return this.$route.params.name
    }
  },
  methods: {
    getBlogList(pageNum) {
      getBlogListByCategoryName(this.categoryName, pageNum).then(res => {
        console.log(res)
        this.blogList = res.data.list
        this.totalPage = res.data.totalPage
      }).catch(() => {
        this.$message({type: "error", message: "文章加载失败，请重试！", showClose: true})
      })
    }
  },
  created() {
    this.getBlogList()
  }
}
</script>

<style scoped>

</style>