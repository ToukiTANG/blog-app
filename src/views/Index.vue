<template>
  <div class="site">
    <!-- 顶部导航 -->
    <Navigation :categoryList="categoryList"></Navigation>

    <!-- 首页大图 只在首页且pc段显示 -->
    <div class="m-mobile-hide">
      <BlogHeader v-show="$route.name === 'home'"></BlogHeader>
    </div>

    <div class="main">
      <el-container>
        <div class="side">
          <el-aside width="200px">Aside</el-aside>
        </div>
        <div class="main">
          <el-main
          >Main区域
            <keep-alive include="Home">
              <router-view></router-view>
            </keep-alive>
          </el-main>
        </div>
        <div class="side">
          <el-aside width="200px">Aside</el-aside>
        </div>
      </el-container>
    </div>
    <transition>
      <el-backtop :visibility-height="1">
        <i class="el-icon-arrow-up"/>
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
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Index",
  // eslint-disable-next-line vue/no-unused-components
  components: {Navigation, BlogHeader, BlogFooter, ArticleCard},
  data() {
    return {
      categoryList: [{id: "001", name: "随笔"}, {id: "002", name: "test02"}]
    };
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
  width: 100%;
  height: 100%;
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