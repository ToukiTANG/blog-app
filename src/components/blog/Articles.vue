<template>
  <div>
    <article-card class="article-card-list" :blogList="blogList"></article-card>
    <pagination class="article-pagination" :getBlogList="getBlogList" :totalPage="totalPage"></pagination>
  </div>
</template>

<script>
import ArticleCard from "@/components/blog/ArticleCard";
import Pagination from "@/components/blog/Pagination";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Articles",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ArticleCard, Pagination
  },
  props: {
    blogList: {
      type: Array,
      require: true
    },
    totalPage: {
      type: Number,
      require: true
    },
    getBlogList: {
      type: Function,
      require: true
    }
  }

}
</script>

<style scoped>

</style>