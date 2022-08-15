<template>
  <div class="blog-card">
    <div class="blog-list" v-for="blog in blogList" :key="blog.id">
      <!--置顶标志-->
      <div v-if="blog.top" class="blog-top">
        <font-awesome-icon icon="fa-solid fa-circle-up" size="lg"></font-awesome-icon>
      </div>
      <el-card shadow="hover" class="me-area" :body-style="{ padding: '0 16px 16px' }">
        <div class="blog-content">
          <!--标题-->
          <div class="blog-title">
            <h2>
              <router-link :to="`/blog/${blog.id}`">{{ blog.title }}</router-link>
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
          </div>
          <!--分类标签-->
          <div class="category-tag">
            <router-link :to="`/category/${blog.category.categoryName}`">
              <font-awesome-icon icon="fa-solid fa-folder-open" size="sm"></font-awesome-icon>
              {{ blog.category.categoryName }}
            </router-link>
          </div>
          <!--概述-->
          <div class="blog-description typo">
            {{ blog.description }}
          </div>
          <!--首图-->
          <div v-if="blog.firstPicture" style="{width: 100%}">
            <img class="first-img" :src="blog.firstPicture" alt="firstPicture"/>
          </div>
          <!--阅读全文按钮-->
          <div class="blog-reading">
            <el-button @click="view(blog.id)" type="primary" round size="small">阅读全文</el-button>
          </div>
          <el-divider></el-divider>
          <!--标签-->
          <div class="blog-footer">
            <el-tag v-for="t in blog.tags" :key="t.id" :class="colorObj[Math.round(Math.random()*4)]">
              <router-link :to="`/tag/${t.tagName}`">{{ t.tagName }}</router-link>
            </el-tag>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "BlogCard",
  props: {
    blogList: {
      type: Array,
      require: true
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["colorObj"])
  },
  methods: {
    view(id) {
      this.$router.push(`/blog/${id}`)
    },
  },
};
</script>

<style scoped>

.el-card.is-hover-shadow:hover {
  box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, .3)
}

.el-card {
  padding: 25px 20px 0;
  margin-bottom: 30px;
  border: 1px solid var(--color-border);
  overflow: visible;
}

.blog-title {
  margin-bottom: 20px;
}

.blog-title h2 {
  text-align: center;
}

.blog-title h2 a {
  display: inline-block;
  color: #333333;
}

.blog-title h2 a:hover {
  transition: .3s ease-in-out;
  /*设置x，y轴的放大倍数*/
  transform: scale(1.3, 1.3)
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

.first-img {
  object-fit: cover;
  width: 100%;
  text-align: center;
  border-radius: 5px;
}

.blog-description {
  margin: 20px 0;
  line-height: 1.8;
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

.blog-reading {
  margin: 15px 0 0;
  text-align: center;
}

.blog-reading .el-button {
  border-color: #6b798e;
}

.blog-reading .el-button--primary {
  background-color: #6b798e;
}

.blog-reading .el-button--primary:hover {
  background-color: #6b798ecf;
}

.blog-reading .el-button--primary:active {
  background-color: #505c6e;
}

.blog-footer {
  margin: 0 0 8px;
}

.blog-footer .el-tag {
  margin-left: 6px;
  /*color: #206864;*/
  /*border-color: #206864d4;*/
  /*background-color: #2068641f;*/
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
</style>