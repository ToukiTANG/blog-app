<template>
  <footer>
    <div class="footer-container">
      <div class="content-top">
        <div class="content-top-item">
          <div class="new-blog-title" style="color: #d8d8d8">最新博客</div>
          <!--<div class="new-blog" v-for="blog in newBlogList" :key="blog.id" >{{ blog.title }}</div>-->
          <router-link :to="`/blog/${blog.id}`" class="new-blog" v-for="(blog,index) in newBlogList" :key="index">{{
              blog.title
            }}
          </router-link>
        </div>
        <div class="content-top-item divider-container">
          <el-divider direction="vertical"></el-divider>
        </div>
        <div class="content-top-item" style="line-height: 3.0; color: rgba(255, 255, 255, .5)">
          <p id="hitokoto-text">{{ hitokoto.hitokoto }}</p>
          <p id="hitokoto-from" style="float: right;"
             v-text="hitokoto.from?`——《${hitokoto.from}》`:''"></p>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="content-bottom" style="color: #d8d8d8">网站信息</div>
    </div>
  </footer>
</template>

<script>
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
    return {
      // newBlogList: [{id: 1, title: "测试标题01"}, {id: 2, title: "测试标题000002"}, {id: 3, title: "测试标题000000000003"}]
    }
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
</style>