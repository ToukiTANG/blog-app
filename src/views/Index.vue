<template>
  <div class="site">
    <!-- 顶部导航 -->
    <Navigation></Navigation>

    <!-- 首页大图 只在首页且pc段显示 -->
    <div class="m-mobile-hide">
      <BlogHeader v-show="$route.name === 'home'"></BlogHeader>
    </div>

    <div class="main">
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main
          >Main区域
          <article-card></article-card>
        </el-main>
        <el-aside width="200px">Aside</el-aside>
      </el-container>
    </div>
    <transition>
      <el-backtop :visibility-height="1">
        <img src="" class="el-icon-arrow-up" />
      </el-backtop>
    </transition>
    <BlogFooter></BlogFooter>
  </div>
</template>

<script>
import Navigation from "@/components/index/Navigation.vue";
import BlogHeader from "@/components/index/BlogHeader.vue";
import BlogFooter from "@/components/index/BlogFooter.vue";
import ArticleCard from "@/components/blog/ArticleCard.vue";
export default {
  name: "Index",
  components: { Navigation, BlogHeader, BlogFooter, ArticleCard },
  data() {
    return {};
  },
};
</script>

<style scoped>
.site {
  display: flex;
  min-height: 100vh; /* 没有元素时，也把页面撑开至100% */
  flex-direction: column;
}
.main {
  width: auto;
}
.el-container {
  display: flex;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
  width: 960px;
  margin: 0 auto;
}
</style>