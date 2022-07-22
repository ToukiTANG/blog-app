<template>
  <div class="blog">
    <div class="article-top" v-if="blog.weight===1">
      <font-awesome-icon icon="fa-solid fa-circle-up" size="lg"></font-awesome-icon>
    </div>
    <el-card shadow="always" :body-style="{ padding: '0 16px 16px' }">
      <div class="blog-header">
        <!--标题-->
        <div class="article-title">
          <h2>
            <a href="#">{{ blog.title }}</a>
          </h2>
        </div>
        <!--简略信息图标-->
        <div class="article-info">
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
            <div class="info-font-size">
              <el-tooltip content="点击切换字体大小" placement="top">
                <font-awesome-icon icon="fa-solid fa-a" size="xs"></font-awesome-icon>
              </el-tooltip>
            </div>
          </div>
          <div class="info-item">
            <div class="info-focus">
              <el-tooltip content="点击切换专注模式" placement="top">
                <font-awesome-icon icon="fa-solid fa-book" size="xs"></font-awesome-icon>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <div class="category-tag">
        <router-link :to="`/category/${blog.category.categoryName}`">
          <font-awesome-icon icon="fa-solid fa-folder-open" size="sm"></font-awesome-icon>
          {{ blog.category.categoryName }}
        </router-link>
      </div>
      <div class="article-content">
        <mavon-editor :value="blog.content" :subfield="false" defaultOpen="preview" :toolbarsFlag="false"
                      :boxShadow="false" previewBackground="#ffffff" codeStyle="atom-one-dark"></mavon-editor>
      </div>
      <el-divider></el-divider>
      <!--标签-->
      <div class="article-footer">
        <el-tag v-for="t in blog.tags" :key="t.id" :class="colorObj[Math.round(Math.random()*4)]">
          <router-link :to="`/tag/${t.tagName}`">{{ t.tagName }}</router-link>
        </el-tag>
      </div>
    </el-card>
  </div>
</template>

<script>
import {mavonEditor} from "mavon-editor"
import "mavon-editor/dist/css/index.css"
import {mapState} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Blog",
  components: {
    "mavon-editor": mavonEditor,
  },
  data() {
    return {
      blog:
          {
            id: 1,
            title: "测试标题",
            updateTime: "2022-07-14T07:15:45.000+00:00",
            weight: 1,
            views: 10,
            content: "### 布局\n" +
                "\n" +
                "---\n" +
                "\n" +
                "+ 浏览器默认样式：`body`的外边框\n" +
                "\n" +
                "#### 正常布局\n" +
                "\n" +
                "---\n" +
                "\n" +
                "##### 宽度\n" +
                "\n" +
                "+ 对于父子元素的宽度\n" +
                "\n" +
                "  + 子元素的`margin-left`+`border-left`+`padding-left`+`width`+`padding-right`+`border-right`+`margin-right`=父元素的`width`（正常布局情况下强制满足）\n" +
                "\n" +
                "  + 当以上某一值设置为`auto`后，会调整该值以满足等式\n" +
                "\n" +
                "  + **常用的**，会设置`margin: 0 auto;`来使子元素在父元素的水平方向上居中\n" +
                "\n" +
                "##### 高度\n" +
                "\n" +
                "+ 对于父子元素的高度\n" +
                "  + 如果不指定父元素的高度，**父元素的高度默认被子元素撑开**\n" +
                "  + 如果子元素的高度超过了父元素，使用`overflow`设置父元素如何处理子元素的溢出（**设置在父元素上**）\n" +
                "    + `overflow: visible;`默认值，会使子元素在父元素外部显示\n" +
                "    + `overflow: hidden;`会使子元素溢出部分被裁剪\n" +
                "    + `overflow: scorll;`生成垂直水平两个滚动条\n" +
                "    + `overflow: auto;`按需生成滚动条\n" +
                "      + 此外`overflow-x`与`overflow-y`可以单独处理水平和垂直方向的溢出\n" +
                "\n" +
                "##### 相邻边距\n" +
                "\n" +
                "+ 对于兄弟元素的相邻边距（不需要处理）\n" +
                "\n" +
                "  + <u>兄弟元素间的边距会发生折叠现象</u>\n" +
                "  + 如果都是正数，以最大的为准\n" +
                "  + 如果一正一负（很少用），取相加值\n" +
                "  + 如果都是负数，以绝对值较大的为准\n" +
                "\n" +
                "+ 对于父子元素的相邻边距（**需要处理**）\n" +
                "\n" +
                "  + <u>子元素的边距会传递给父元素</u>\n" +
                "\n" +
                "  + 可以做如下处理（还可以同时解决高度塌陷问题）\n" +
                "\n" +
                "    + ```css\n" +
                "      <style>\n" +
                "      .child::fefore{\n" +
                "          content: '';\n" +
                "          display: table;\n" +
                "      }\n" +
                "      \n" +
                "      .clearfix::before, .clearfix::after{\n" +
                "          content:'',\n" +
                "              display: table;\n" +
                "              clear: both;\n" +
                "      }\n" +
                "      </style>\n" +
                "      ```",
            category: {
              id: 1,
              categoryName: "随笔"
            },
            tags: [
              {
                id: 1,
                tagName: "SpringBoot"
              },
              {
                id: 2,
                tagName: "Java"
              },
              {
                id: 3,
                tagName: "Python"
              }]

          }
    }
  },
  computed: {
    ...mapState(["colorObj"])
  },
  mounted() {
  }
}
</script>

<style scoped>
.el-card {
  padding: 25px 20px 0;
  margin-bottom: 30px;
  border: 1px solid var(--color-border);
  overflow: visible;
}

.article-title {
  margin-bottom: 20px;
}

.article-title h2 {
  text-align: center;
}

.article-title h2 a {
  color: #333333;
}

.article-top {
  width: 0;
  height: 0;
  float: right;
  position: relative;
}

.article-top:after {
  content: "";
  float: right;
  position: relative;
  border-right: solid 30px #db2828;
  border-top: solid 30px #db2828;
  border-left: solid 30px transparent;
  border-bottom: solid 30px transparent;
}

.article-top svg {
  color: white;
  float: right;
  position: relative;
  top: 10px;
  right: 7px;
  z-index: 1;
}

.article-info {
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

.blog-content {
  height: 300px;
  border: solid 1px black;
}

.article-footer {
  margin: 0 0 8px;
}

.article-footer .el-tag {
  margin-left: 6px;
  color: #206864;
  border-color: #206864d4;
  background-color: #2068641f;
}

.article-footer .el-tag:hover {
  transition: .2s;
  background-color: #2068644C;
}

.article-footer .el-tag:hover {
  transition: .2s;
  /*background-color: #2068644C;*/
}

.article-footer .el-tag.blue {
  color: #4994c4;
  border-color: #4994c4;
  background-color: #4994c41f;
}

.article-footer .el-tag.blue:hover {
  background-color: #4994c44c;
}

.article-footer .el-tag.dark {
  color: #31322c;
  border-color: #31322c;
  background-color: #31322c1f;
}

.article-footer .el-tag.dark:hover {
  background-color: #31322c4c;
}

.article-footer .el-tag.green {
  color: #5d7259;
  border-color: #5d7259;
  background-color: #5d72591f;
}

.article-footer .el-tag.green:hover {
  background-color: #5d72594c;
}

.article-footer .el-tag.red {
  color: #b13b2e;
  border-color: #b13b2e;
  background-color: #b13b2e1f;
}

.article-footer .el-tag.red:hover {
  background-color: #b13b2e4c;
}

.article-footer .el-tag.orange {
  color: #d9883d;
  border-color: #d9883d;
  background-color: #d9883d1f;
}

.article-footer .el-tag.orange:hover {
  background-color: #d9883d4c;
}

.article-footer span .el-tag .el-tag-light {
  padding: 0 10px;
}

.article-footer .el-tag a {
  color: inherit;
  display: inline-block;
  height: 100%;
  width: 100%;
}

/*使mavonEditor容器不会浮在表面*/
.v-note-wrapper {
  z-index: 0;
}

/*去掉mavonEditor的边框*/
.v-note-wrapper.markdown-body {
  border: none;
}

.markdown-body {
  line-height: 1.8;
}

.markdown-body >>> .hljs {
  padding: 16px;
}

.markdown-body >>> code {
  font-size: 100%;
}

.markdown-body >>> .highlight pre, .markdown-body >>> pre {
  padding: 0;
}
</style>