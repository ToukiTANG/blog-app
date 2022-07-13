<template>
  <div class="Home">
    <Articles :blogList="blogList" :getBlogList="getBlogList" :totalPage="totalPage"></Articles>
  </div>
</template>

<script>
import Articles from "@/components/blog/Articles"
import {getBlogList} from "@/api/home"
import {SET_IS_BLOG_TO_HOME} from "@/store/mutation-types";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    Articles,
  },
  data() {
    return {
      blogList: [],
      totalPage: 0,
      getBlogListFinish: false
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //如果不是从文章页面跳过来，需要重新请求数据
      if (from.name !== "blog") {
        vm.$store.commit(SET_IS_BLOG_TO_HOME, false)
        vm.getBlogList()
      }else {
        //如果首页就是起始页，则没有缓存，重新请求数据
        if (!vm.getBlogListFinish){
          vm.getBlogList()
        }
        //如果从文章页面跳过来，可以使用缓存
        vm.$store.commit(SET_IS_BLOG_TO_HOME,true)
      }
    })
  },
  methods: {
    getBlogList(pageNum) {
      getBlogList(pageNum).then(res => {
        console.log(res)
        this.blogList = res.data.list
        this.totalPage = res.data.totalPage
      }).catch(() => {
        this.$message({type: "error", message: "文章加载失败，请重试！", showClose: true})
      })
    }
  },
};
</script>

<style>
</style>