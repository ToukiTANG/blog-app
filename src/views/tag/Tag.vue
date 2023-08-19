<template>
  <div class="tag">
    <el-card shadow="always">
      <h2 class="tag-name">标签{{ tag.tagName }}下的文章</h2>
    </el-card>
    <articles :getBlogList="getBlogList" :blogList="blogList" :total="total" :pageSize="pageSize"></articles>
  </div>
</template>

<script>
import Articles from "@/components/blog/Blogs";
import {getBlogListByTagId, getBlogListByTagName} from "@/api/tag";
import {Message} from "element-ui";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tag",
  components: {Articles},
  data() {
    return {
      blogList: [],
      total: 0,
      pageSize: 0,
      tag: null
    }
  },
  computed: {
    tagId() {
      return this.$route.params.tagId
    }
  },
  watch: {
    '$route.fullPath'() {
      //检测全局的路由变化，如果是通向本组件的，应该重新进行加载
      //在这里create函数是不能有这个效果的，因为重用是指跳转到另外的category页面，相当于create了另一个页面
      if (this.$route.name === "tag") {
        this.getBlogList()
      }
    }
  },
  methods: {
    getBlogList(pageNum) {
      getBlogListByTagId(this.tagId, pageNum).then((res) => {
        this.blogList = res.data.blogInfoPage.dataList
        this.tag=res.data.tag
        this.total = res.data.blogInfoPage.total
        this.pageSize = res.data.pageSize
      }).catch(() => {
        Message({type: "error", message: "Tag标签加载失败，请重试！", showClose: true})
      })
    }
  },
  created() {
    this.getBlogList()
  }
}
</script>

<style scoped>
.tag .el-card {
  padding: 0;
  margin-bottom: 10px;
  border: 1px solid var(--color-border);
  text-align: center;
  /*box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, .3)*/

}

</style>
