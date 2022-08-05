<template>
  <div class="about">
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
      about: {
        // title: "关于Touki",
        // content: "<h3 id=\"关于网站\">关于网站</h3>\n<ul>\n<li>首先感谢<a href=\"https://github.com/Naccl\" target=\"_blank\" rel=\"external nofollow noopener\">Naccl</a>的NBlog项目，本网站主要布局基本“借鉴”该项目，项目主页<a href=\"https://naccl.top/\" target=\"_blank\" rel=\"external nofollow noopener\">NBlog</a>，从该项目我受益良多，非常感谢！</li>\n<li>其次是<a href=\"https://space.bilibili.com/5849993/?spm_id_from=333.999.0.0\" target=\"_blank\" rel=\"external nofollow noopener\">Void新神殿下</a>的首页大图授权，这位大神也是我一直很喜欢的画师，在此安利一波！</li>\n<li>目前网站仅作为我个人的项目历练和笔记储存地，因此暂未开放用户使用。目前项目托管于腾讯云学生机，Github地址<a href=\"https://github.com/ToukiTANG/blog-app\" target=\"_blank\" rel=\"external nofollow noopener\">Touki’s blog</a></li>\n</ul>\n<h3 id=\"关于我\">关于我</h3>\n<ul>\n<li>身份：目前还是一名计算机在读研究生</li>\n<li>爱好：闲时是个二次元，玩玩游戏，不太喜欢运动</li>\n<li>目标or未来幻想：能够一个人养活自己，攒点钱再去做自己想要做的事</li>\n</ul>\n<p>总体而言，我是个很普通的人，没有值得谦虚的地方，也没有活到实事求人的地步。我自认为我过得很好，既不充实，也不无趣。</p>\n"
      }
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