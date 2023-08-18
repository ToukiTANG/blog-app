<template>
  <footer>
    <div class="footer-container">
      <div class="content-top">
        <div class="content-top-item">
          <div class="new-blog-title" style="color: #d8d8d8">最新博客</div>
          <router-link :to="`/blog/${blog.blogId}`" class="new-blog" v-for="(blog,index) in newBlogList" :key="index">{{
              blog.title
            }}
          </router-link>
        </div>
        <div class="content-top-item divider-container">
          <el-divider direction="vertical"></el-divider>
        </div>
        <div class="content-top-item" style="color: rgba(255, 255, 255, .5)">
          <p id="hitokoto-text" style="text-align: left;padding-left: 20px">{{ hitokoto.hitokoto }}</p>
          <p id="hitokoto-from" style="float: right; line-height: 3"
             v-text="hitokoto.from?`——《${hitokoto.from}》`:''"></p>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="content-bottom" style="color: #d8d8d8">
        <p>
          <span v-if="siteInfo.copyright">
            {{ siteInfo.copyright.title }}<router-link to="/" style="margin-left: 10px">{{ siteInfo.copyright.siteName }}</router-link></span>
          <span>|</span>
          <span>本网站由<a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
                       target="_blank"><img src="https://cdn.touki.top/blog/upyun-logo.png" alt="upyun"></a>提供CDN
            /云储存服务</span>
          <span>|</span>
          <a v-if="siteInfo.filing" :href="siteInfo.filing.link" target="_blank">{{ siteInfo.filing.info }}</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "BlogFooter",
  props: {
    hitokoto: {
      type: Object,
      require: true
    },
    newBlogList: {
      type: Array,
      require: true
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(["siteInfo"])
  },
};
</script>

<style scoped>
footer {
  height: 260px;
  background-color: var(--color-black-1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-container {
  color: var(--color-white);
  width: 1000px;
}

.el-divider--horizontal {
  margin: 0 0 20px 0;
  opacity: .5;
}

.el-divider--vertical {
  height: 6em;
  margin: 0;
  opacity: .5;
}

.content-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-top .content-top-item:first-child {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.content-top-item {
  text-align: center;
  flex: 20;
  padding: 10px;
}

.content-top-item .new-blog {
  margin: 5px 0 5px;
  color: rgba(255, 255, 255, .5);
  cursor: pointer;
}

.content-top-item .new-blog:hover {
  color: #d8d8d8;
}

.divider-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-bottom {
  margin: 25px 0 25px;
  text-align: center;
}

.content-bottom p {
  display: flex;
  align-content: center;
  justify-content: center;
  letter-spacing: 1px;
}

.content-bottom span {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  padding: 0 5px;
}

.content-bottom a {
  display: flex;
  color: #f08d49;
  align-items: center;
  opacity: .7;
}

.content-bottom span img {
  height: 30px;
  margin-top: 3px;
}
</style>
