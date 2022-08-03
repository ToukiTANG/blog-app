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
        <introduction :introduction="introduction"></introduction>
      </div>
      <div class="main-content">
        <keep-alive include="Home,Archives">
          <router-view/>
        </keep-alive>
      </div>
      <div class="side">
        <div class="side-right">
          <random-blog :randomBlogList="randomBlogList"></random-blog>
          <tags :tagList="tagList"></tags>
        </div>
      </div>
    </div>
    <!--回到顶部图标-->
    <transition>
      <el-backtop :visibility-height="1">
        <i class="el-icon-arrow-up"/>
      </el-backtop>
    </transition>

    <BlogFooter :hitokoto="hitokoto" :newBlogList="newBlogList"></BlogFooter>
  </div>
</template>

<script>
import Navigation from "@/components/index/Navigation.vue";
import BlogHeader from "@/components/index/BlogHeader.vue";
import BlogFooter from "@/components/index/BlogFooter.vue";
import ArticleCard from "@/components/blog/BlogCard.vue";
import {SAVE_CLIENT_SIZE, SAVE_INTRODUCTION, SAVE_SITE_INFO} from "@/store/mutation-types";
import Introduction from "@/components/side/Introduction";
import RandomBlog from "@/components/side/RandomBlog";
import {getHitokoto, getSite} from "@/api";
import Tags from "@/components/side/Tags";
import {Message} from "element-ui";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Index",
  // eslint-disable-next-line vue/no-unused-components
  components: {Tags, RandomBlog, Introduction, Navigation, BlogHeader, BlogFooter, ArticleCard},
  data() {
    return {
      categoryList: [],
      tagList: [],
      randomBlogList: [],
      newBlogList: [],
      hitokoto: {},
      siteInfo: {
        webTitleSuffix: " - Touki's blog"
      },
      introduction: {},
    };
  },
  watch: {
    '$route.path'() {
      this.scroll2Top()
    }
  },
  created() {
    //获取footer上的台词
    this.getHitokoto()
    this.getSite()
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
  },
  methods: {
    getHitokoto() {
      getHitokoto().then(res => {
        this.hitokoto = res
      })
    },
    getSite() {
      getSite().then((res) => {
        this.siteInfo = res.data.siteInfo
        this.introduction = res.data.introduction
        this.categoryList = res.data.categoryList
        this.randomBlogList = res.data.randomBlogList
        this.tagList = res.data.tagList
        this.newBlogList = res.data.newBlogList

        this.$store.commit(SAVE_SITE_INFO, this.siteInfo)
        this.$store.commit(SAVE_INTRODUCTION, this.introduction)
        //标签title
        document.title = this.$route.meta.title + this.siteInfo.webTitleSuffix
      }).catch(() => {
        Message({type: "error", message: "首页信息加载失败，请重试！", showClose: true})
      })
    }
  },
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
  width: 1600px;
  margin: 80px auto 0;
  /*减去与header的80和footer的260*/
  min-height: calc(100vh - 260px - 80px);
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

.side-right {
  position: sticky;
  top: 60px;
}

/*.tags {*/
/*  margin-top: 20px;*/
/*}*/

</style>