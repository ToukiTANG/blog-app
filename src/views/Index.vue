<template>
  <div class="site">
    <!-- 顶部导航 -->
    <Navigation class="nav-menu" :categoryList="categoryList"></Navigation>

    <!-- 首页大图 只在首页且显示 -->
    <div class="header-image">
      <BlogHeader v-show="$route.name === 'home'"></BlogHeader>
    </div>

    <div class="main">
      <div class="side">
        <introduction></introduction>
      </div>
      <div class="main-content">
        <keep-alive include="Home">
          <router-view/>
        </keep-alive>
      </div>
      <div class="side">
        <random-article></random-article>
      </div>
    </div>
    <!--回到顶部图标-->
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
import {SAVE_CLIENT_SIZE} from "@/store/mutation-types";
import Introduction from "@/components/side/Introduction";
import RandomArticle from "@/components/side/RandomArticle";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Index",
  // eslint-disable-next-line vue/no-unused-components
  components: {RandomArticle, Introduction, Navigation, BlogHeader, BlogFooter, ArticleCard},
  data() {
    return {
      categoryList: [{id: "001", name: "随笔"}, {id: "002", name: "test02"}]
    };
  },
  mounted() {
    //进入首页过后即计算窗口大小
    this.$store.commit(SAVE_CLIENT_SIZE, {
      clientHeight: window.innerHeight,
      clientWidth: window.innerWidth
    })
    //当浏览器尺寸被调整，重设窗口大小
    window.onresize = () => {
      this.$store.commit(SAVE_CLIENT_SIZE, {
        clientHeight: window.innerHeight,
        clientWidth: window.innerWidth
      })
    }
  }
};
</script>

<style scoped>
.site {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/*固定在头部*/
.nav-menu {
  position: fixed;
}

.main {
  display: flex;
  justify-content: center;
  position: relative;
  width: 1400px;
  margin: 80px auto 0;
  min-height: 100vh;
}

.side {
  display: block;
  flex: 1;
}

.main-content {
  padding: 0 20px;
  display: block;
  flex: 3;
  margin: 0 14px;
}

</style>