<template>
  <div class="about" v-viewer>
    <el-card shadow="always" :body-style="{ padding: '0 16px 16px'}">
      <h2 style="text-align: center">{{ about.title }}</h2>
      <el-divider></el-divider>
      <div class="blog-content">
        <div class="typo" v-html="about.content"></div>
      </div>
    </el-card>
    <div class="about-comment">
      <h3>评论已关闭</h3>
    </div>
  </div>
</template>

<script>
import {getAboutInfo} from "@/api/about";
import {Message} from "element-ui";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "About",
  components: {},
  data() {
    return {
      about: {}
    }
  },
  created() {
    this.getAbout()
  },
  methods: {
    getAbout() {
      getAboutInfo().then(res => {
        this.about = res.data
      }).catch(() => {
        Message({type: "error", message: "文章加载失败，请重试！", showClose: true})
      })
    }
  },
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

.markdown-body >>> hr {
  height: 1px;
}

.about-comment {
  margin-bottom: 20px;
  background-color: white;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border: 1px solid var(--color-border);
  border-top: 2px solid #00b5ad;
  border-radius: 0 0 4px 4px;
}

</style>