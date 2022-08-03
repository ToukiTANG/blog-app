<template>
  <div class="blogs">
    <blog-card class="blog-card-list" :blogList="blogList"></blog-card>
    <pagination class="blog-pagination" :getBlogList="getBlogList" :totalPage="total" :pageSize="pageSize"></pagination>
  </div>
</template>

<script>
import BlogCard from "@/components/blog/BlogCard";
import Pagination from "@/components/blog/Pagination";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Blogs",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BlogCard, Pagination
  },
  props: {
    blogList: {
      type: Array,
      require: true
    },
    total: {
      type: Number,
      require: true
    },
    pageSize: {
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