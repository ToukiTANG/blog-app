<template>
  <div class="about">
    <el-card shadow="always" :body-style="{ padding: '0 16px 16px'}">
      <h2 style="text-align: center">{{ about.title }}</h2>
      <el-divider></el-divider>
      <mavon-editor :value="about.content" :subfield="false" defaultOpen="preview" :toolbarsFlag="false"
                    :boxShadow="false" previewBackground="#ffffff"></mavon-editor>
    </el-card>
  </div>
</template>

<script>
import {mavonEditor} from "mavon-editor";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "About",
  components: {
    "mavon-editor": mavonEditor
  },
  data() {
    return {
      about: {title: "关于Touki", content: "### 关于网站\n" +
            "\n" +
            "---\n" +
            "\n" +
            "+ 首先感谢[Naccl](https://github.com/Naccl)的NBlog项目，本网站主要布局基本“借鉴”该项目，项目主页[NBlog](https://naccl.top/)，从该项目我受益良多，非常感谢！\n" +
            "+ 其次是[Void新神殿下](https://space.bilibili.com/5849993/?spm_id_from=333.999.0.0)的首页大图授权，这位大神也是我一直很喜欢的画师，在此安利一波！\n" +
            "+ 目前网站仅作为我个人的项目历练和笔记储存地，因此暂未开放用户使用。项目托管于腾讯云学生机，Github地址[Touki’s blog](https://github.com/ToukiTANG/blog-app)\n" +
            "\n" +
            "### 关于我\n" +
            "\n" +
            "---\n" +
            "\n" +
            "+ 身份：目前还是一名计算机在读研究生\n" +
            "+ 爱好：闲时是个二次元，玩玩游戏，不太喜欢运动\n" +
            "+ 目标or未来幻想：能够一个人养活自己，攒点钱再去做自己想要做的事\n" +
            "\n" +
            "总体而言，我是个很普通的人，没有值得谦虚的地方，也没有活到实事求人的地步。我自认为我过得很好，既不充实，也不无趣。"}
    }
  },
}
</script>

<style scoped>

.el-card {
  padding: 25px 20px 0;
  margin-bottom: 30px;
  border: 1px solid var(--color-border);
  overflow: visible;
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

</style>