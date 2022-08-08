<template>
  <div class="blog">
    <div class="blog-top" v-if="blog.top">
      <font-awesome-icon icon="fa-solid fa-circle-up" size="lg"></font-awesome-icon>
    </div>
    <el-card shadow="always" :body-style="{ padding: '0 16px 16px' }">
      <div class="blog-header">
        <!--标题-->
        <div class="blog-title">
          <h2>
            <a href="#">{{ blog.title }}</a>
          </h2>
        </div>
        <!--简略信息图标-->
        <div class="blog-info">
          <div class="info-item">
            <div class="info-time">
              <font-awesome-icon icon="fa-solid fa-calendar-days" size="xs"></font-awesome-icon>
              <span>{{
                  blog.updateTime | timeToNow
                }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-views">
              <font-awesome-icon icon="fa-solid fa-eye" size="xs"></font-awesome-icon>
              <span>{{ blog.views }}</span></div>
          </div>
          <div class="info-item">
            <div class="info-focus">
              <el-tooltip content="点击切换专注模式以获得更好体验" placement="top">
                <font-awesome-icon icon="fa-solid fa-book" size="xs" @click.prevent="changeFocusMode"></font-awesome-icon>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <!--这里加一个判断，否则异步渲染会报警告-->
      <div class="category-tag" v-if="blog.category">
        <router-link :to="`/category/${blog.category.categoryName}`">
          <font-awesome-icon icon="fa-solid fa-folder-open" size="sm"></font-awesome-icon>
          {{ blog.category.categoryName }}
        </router-link>
      </div>
      <!--正文-->
      <div class="blog-content">
        <div class="typo js-toc-content match-braces rainbow-braces" v-html="blog.content"></div>
      </div>
      <el-divider></el-divider>
      <!--标签-->
      <div class="blog-footer">
        <el-tag v-for="t in blog.tags" :key="t.id" :class="colorObj[Math.round(Math.random()*4)]">
          <router-link :to="`/tag/${t.tagName}`">{{ t.tagName }}</router-link>
        </el-tag>
      </div>
    </el-card>
    <div class="blog-msg">
      <ul class="msg-list">
        <li>作者：Touki</li>
        <li>发表时间：{{ blog.createTime|timeFormat }}</li>
        <li>最后编辑：{{ blog.updateTime|timeFormat }}</li>
        <li>本作品采用<a href="http://creativecommons.org/licenses/by/4.0/" target="_blank">署名4.0国际(CC BY 4
          .0)</a>进行许可。可自由转载引用，并允许商业性使用，但需署名作者且注明出处。
        </li>
      </ul>
    </div>
    <div class="blog-comment">
      <h3>评论已关闭</h3>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {getBlog} from "@/api/blog";
import {Message} from "element-ui";
import {SET_FOCUS_MODE, SET_IS_BLOG_RENDER_COMPLETE} from "@/store/mutation-types";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Blog",
  components: {},
  data() {
    return {
      blog: {},
    }
  },
  computed: {
    ...mapState(["colorObj", "siteInfo", "focusMode"])
  },
  methods: {
    getBlog(id = this.$route.params.id) {
      getBlog(id).then((res) => {
        this.blog = res.data
        document.title = this.blog.title + this.siteInfo.webTitleSuffix
        //v-html渲染完成后再渲染代码块样式
        this.$nextTick(() => {
          Prism.highlightAll()
          //将文章渲染完成状态置为 true
          this.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, true)
        })
      }).catch(() => {
        Message({type: "error", message: "文章详情加载失败，请重试！", showClose: true})
      })
    },
    changeFocusMode() {
      this.$store.commit(SET_FOCUS_MODE, !this.focusMode)
    }
  },
  created() {
    this.getBlog()
  },
  beforeRouteEnter(to, from, next) {
    //路由到博客文章页面之前，应将文章的渲染完成状态置为 false
    next(vm => {
      // 当 beforeRouteEnter 钩子执行前，组件实例尚未创建
      // vm 就是当前组件的实例，可以在 next 方法中把 vm 当做 this用
      vm.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, false)
    })
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(SET_FOCUS_MODE, false)
    // 从文章页面路由到其它页面时，销毁当前组件的同时，要销毁tocbot实例
    // 否则tocbot一直在监听页面滚动事件，而文章页面的锚点已经不存在了，会报"Uncaught TypeError: Cannot read property 'className' of null"
    tocbot.destroy()
    next()
  },
  beforeRouteUpdate(to, from, next) {
    //当在文章页面跳转到其他文章页面时应该重新获取文章
    if (to.path !== from.path) {
      this.$store.commit(SET_FOCUS_MODE, false)
      this.getBlog(to.params.id)
      //只要路由路径有改变，且停留在当前Blog组件内，就把文章的渲染完成状态置为 false
      this.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, false)
      next()
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.el-card {
  padding: 25px 20px 0;
  /*margin-bottom: 30px;*/
  border: 1px solid var(--color-border);
  overflow: visible;
  border-radius: 4px 4px 0 0;
}

.blog-title {
  margin-bottom: 20px;
}

.blog-title h2 {
  text-align: center;
}

.blog-title h2 a {
  color: #333333;
}

.blog-top {
  width: 0;
  height: 0;
  float: right;
  position: relative;
}

.blog-top:after {
  content: "";
  float: right;
  position: relative;
  border-right: solid 30px #db2828;
  border-top: solid 30px #db2828;
  border-left: solid 30px transparent;
  border-bottom: solid 30px transparent;
}

.blog-top svg {
  color: white;
  float: right;
  position: relative;
  top: 10px;
  right: 7px;
  z-index: 1;
}

.blog-info {
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-item {
  margin: 0 10px;
  display: inline-block;
  line-height: 100%;
}

.info-item span {
  margin-left: 5px;
}

.info-time {
  color: #4182a4;
}

.info-views {
  color: #2a6e3f;
}

.info-font-size, .info-focus {
  cursor: pointer;
  color: #999999;
}

.info-font-size:hover, .info-focus:hover {
  color: #303133;
}

.category-tag {
  width: 100px;
  height: 35px;
  border-radius: 0 5px 5px 0;
  background-color: #db9b34;
  position: relative;
  left: -62px;
}

.category-tag:after {
  content: "";
  border-style: solid;
  border-width: 0 25px 25px 0;
  border-right-color: #c67915;
  border-top-color: #c67915;
  border-left-color: transparent;
  border-bottom-color: transparent;
  position: absolute;
  top: 100%;
  right: 75%;
}

.category-tag a {
  display: block;
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 6px 0 6px;
  color: var(--color-white);
}

.blog-footer {
  margin: 0 0 8px;
}

.blog-footer .el-tag {
  margin-left: 6px;
  color: #206864;
  border-color: #206864d4;
  background-color: #2068641f;
}

.blog-footer .el-tag:hover {
  transition: .2s;
  background-color: #2068644C;
}

.blog-footer .el-tag:hover {
  transition: .2s;
  /*background-color: #2068644C;*/
}

.blog-footer .el-tag.blue {
  color: #4994c4;
  border-color: #4994c4;
  background-color: #4994c41f;
}

.blog-footer .el-tag.blue:hover {
  background-color: #4994c44c;
}

.blog-footer .el-tag.dark {
  color: #31322c;
  border-color: #31322c;
  background-color: #31322c1f;
}

.blog-footer .el-tag.dark:hover {
  background-color: #31322c4c;
}

.blog-footer .el-tag.green {
  color: #5d7259;
  border-color: #5d7259;
  background-color: #5d72591f;
}

.blog-footer .el-tag.green:hover {
  background-color: #5d72594c;
}

.blog-footer .el-tag.red {
  color: #b13b2e;
  border-color: #b13b2e;
  background-color: #b13b2e1f;
}

.blog-footer .el-tag.red:hover {
  background-color: #b13b2e4c;
}

.blog-footer .el-tag.orange {
  color: #d9883d;
  border-color: #d9883d;
  background-color: #d9883d1f;
}

.blog-footer .el-tag.orange:hover {
  background-color: #d9883d4c;
}

.blog-footer span .el-tag .el-tag-light {
  padding: 0 10px;
}

.blog-footer .el-tag a {
  color: inherit;
  display: inline-block;
  height: 100%;
  width: 100%;
}

.blog-msg {
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border: 1px solid var(--color-border);
  border-top: none;
  border-bottom: none;
  /*border-radius: 0 0 4px 4px;*/
  /*margin-bottom: 30px;*/
  background-color: #fcfff5;
}

.blog-msg a {
  color: #0366d6;
}

ul.msg-list {
  margin-left: 20px;
  line-height: 1.5;
  color: #4c7d4b;
}

.blog-comment {
  margin-bottom: 20px;
  background-color: white;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border: 1px solid var(--color-border);
  border-top: 2px solid #00b5ad;
  border-radius: 0 0 4px 4px;
}
</style>