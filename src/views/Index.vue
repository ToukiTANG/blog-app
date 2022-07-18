<template>
  <div class="site">
    <!-- 顶部导航 -->
    <Navigation class="nav-menu" :categoryList="categoryList"></Navigation>

    <!-- 首页大图 只在首页且pc段显示 -->
    <div class="m-mobile-hide">
      <BlogHeader v-show="$route.name === 'home'"></BlogHeader>
    </div>

    <!--    <div class="main">-->
    <!--      <el-container>-->
    <!--        <div class="side">-->
    <!--          <el-aside width="200px">Aside</el-aside>-->
    <!--        </div>-->
    <!--        <div class="m-main">-->
    <!--          <el-main-->
    <!--          >Main区域-->
    <!--            <keep-alive include="Home">-->
    <!--              <router-view></router-view>-->
    <!--            </keep-alive>-->
    <!--          </el-main>-->
    <!--        </div>-->
    <!--        <div class="side">-->
    <!--          <el-aside width="200px">Aside</el-aside>-->
    <!--        </div>-->
    <!--      </el-container>-->
    <!--    </div>-->
    <div class="main">
      <div class="side">l-side</div>
      <div class="main-content">
        <keep-alive include="Home">
          <router-view/>
        </keep-alive>
      </div>
      <div class="side">r-side</div>
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
import {SAVE_CLIENT_SIZE} from "@/store/mutation-types";

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
  mounted() {
    //进入首页过后即计算窗口大小
    this.$store.commit(SAVE_CLIENT_SIZE, {
      clientHeight: document.body.clientHeight,
      clientWidth: document.body.clientWidth
    })
    //当浏览器尺寸被调整，重设窗口大小
    window.onresize = () => {
      this.$store.commit(SAVE_CLIENT_SIZE, {
        clientHeight: document.body.clientHeight,
        clientWidth: document.body.clientWidth
      })
    }
  }
};
</script>

<style scoped>
.site {
  display: flex;
  min-height: 100vh; /* 没有元素时，也把页面撑开至100% */
  flex-direction: column;
}

/*固定在头部*/
.nav-menu {
  position: fixed;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 1400px;
  margin: 60px auto 0;
}

.side {
  display: block;
  flex: 1;
  height: 500px;
  border: 1px solid black;
}

.main-content {
  padding: 30px 20px;
  display: block;
  flex: 3;
  height: 500px;
  margin: 0 14px;
  border: 1px solid black;
}

</style>