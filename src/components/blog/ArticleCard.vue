<template>
  <div class="article-card">
    <div class="article-list" v-for="blog in blogList" :key="blog.id">
      <!--置顶标志-->
      <div v-if="blog.weight===1" class="article-top">
        <!--<i class="fa-solid fa-circle-up fa-lg"></i>-->
        <font-awesome-icon icon="fa-solid fa-circle-up" size="lg"></font-awesome-icon>
      </div>
      <el-card shadow="hover" class="me-area" :body-style="{ padding: '0 16px 16px' }">
        <div class="article-content">
          <!--标题-->
          <div class="article-title">
            <h2>
              <a href="#" @click="view(blog.id)" class="me-article-title">{{ blog.title }}</a>
            </h2>
          </div>
          <!--简略信息图标-->
          <div class="article-info">
            <div class="info-item">
              <!--<i class="fa-solid fa-calendar-days fa-xs">-->
              <div class="info-time">
                <font-awesome-icon icon="fa-solid fa-calendar-days" size="xs"></font-awesome-icon>
                <span>{{
                    blog.updateTime | timeToNow
                  }}</span>
              </div>
            </div>
            <div class="info-item">
              <!--<i class="fa-solid fa-eye fa-xs"></i>-->
              <div class="info-views">
                <font-awesome-icon icon="fa-solid fa-eye" size="xs"></font-awesome-icon>
                <span>{{ blog.views }}</span></div>
            </div>
          </div>
          <!--分类标签-->
          <div class="category-tag">
            <router-link :to="`/category/${blog.category.categoryName}`">
              <!--<i class="fa-solid fa-folder-open fa-sm">-->
              <font-awesome-icon icon="fa-solid fa-folder-open" size="sm"></font-awesome-icon>
              {{ blog.category.categoryName }}
            </router-link>
          </div>
          <!--概述-->
          <div class="article-description">
            {{ blog.description }}
          </div>
          <!--首图-->
          <div v-if="blog.firstPicture" style="{width: 100%}">
            <img class="first-img" :src="blog.firstPicture" alt="firstPicture"/>
          </div>
          <!--阅读全文按钮-->
          <div class="article-reading">
            <el-button type="primary" round size="small">阅读全文</el-button>
          </div>
          <el-divider></el-divider>
          <!--标签-->
          <div class="article-footer">
            <el-tag v-for="t in blog.tags" :key="t.id" :class="colorObj[Math.round(Math.random()*4)]">
              <a href="#">{{ t.tagName }}</a>
            </el-tag>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  props: {
    // blogList: {
    //   type: Array,
    //   require: true
    // },
  },
  data() {
    return {
      blogList: [
        {
          "id": 1,
          "title": "测试标题",
          "firstPicture": "/img/firstPicture.c7dd3f07.jpg",
          "description": "第一条测试数据",
          "updateTime": "2022-07-14T07:15:45.000+00:00",
          "weight": 1,
          "views": 10,
          "commentEnabled": 1,
          "category": {
            "id": 1,
            "categoryName": "随笔"
          },
          "tags": [
            {
              "id": 1,
              "tagName": "SpringBoot"
            },
            {
              "id": 2,
              "tagName": "Java"
            },
            {
              "id": 3,
              "tagName": "Python"
            }]
        },
        {
          "id": 2,
          "title": "测试标题2",
          "firstPicture": "/img/firstPicture_1.bd9cb897.jpg",
          "description": "第二条测试数据",
          "updateTime": "2022-07-13T07:15:45.000+00:00",
          "weight": 1,
          "views": 5,
          "commentEnabled": 1,
          "category": {
            "id": 1,
            "categoryName": "随笔"
          },
          "tags": [
            {
              "id": 1,
              "tagName": "SpringBoot"
            },
            {
              "id": 2,
              "tagName": "Java"
            },
            {
              "id": 3,
              "tagName": "Python"
            }]
        },
        {
          "id": 3,
          "title": "测试标题3",
          "firstPicture": null,
          "description": "第三条测试数据",
          "updateTime": "2022-07-11T07:15:45.000+00:00",
          "weight": 0,
          "views": 10,
          "commentEnabled": 1,
          "category": {
            "id": 1,
            "categoryName": "随笔"
          },
          "tags": [
            {
              "id": 1,
              "tagName": "SpringBoot"
            },
            {
              "id": 2,
              "tagName": "Java"
            },
            {
              "id": 3,
              "tagName": "Python"
            }]
        }
      ],
      colorObj: {
        0: 'blue',
        1: 'dark',
        2: 'green',
        3: 'orange',
        4: 'red',
      }
    };
  },
  methods: {
    view(id) {
      console.log(id + "文章详情接口");
    },
  },
};
</script>

<style scoped>

.el-card.is-hover-shadow:hover {
  box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, .3)
}

.el-card {
  padding: 25px 20px 0;
  margin-bottom: 30px;
  border: 1px solid var(--color-border);
  overflow: visible;
}

.article-title {
  margin-bottom: 20px;
}

.article-title h2 {
  text-align: center;
}

.article-title h2 a {
  color: #333333;
}

.article-info {
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-item {
  margin: 0 10px;
  display: inline-block;
  line-height: 100%;
}

.info-item span {
  margin-left: 5px;
}

.info-time {
  color: #4182a4;
}

.info-views {
  color: #2a6e3f;
}

.article-top {
  width: 0;
  height: 0;
  float: right;
  position: relative;
}

.article-top:after {
  content: "";
  float: right;
  position: relative;
  border-right: solid 30px #db2828;
  border-top: solid 30px #db2828;
  border-left: solid 30px transparent;
  border-bottom: solid 30px transparent;
}

.article-top svg {
  color: white;
  float: right;
  position: relative;
  top: 10px;
  right: 7px;
  z-index: 1;
}

.first-img {
  object-fit: cover;
  max-width: 100%;
  text-align: center;
  border-radius: 5px;
}

.article-description {
  margin: 20px 0;
}

.category-tag {
  width: 100px;
  height: 35px;
  border-radius: 0 5px 5px 0;
  background-color: #db9b34;
  position: relative;
  left: -62px;
}

.category-tag:after {
  content: "";
  border-style: solid;
  border-width: 0 25px 25px 0;
  border-right-color: #c67915;
  border-top-color: #c67915;
  border-left-color: transparent;
  border-bottom-color: transparent;
  position: absolute;
  top: 100%;
  right: 75%;
}

.category-tag a {
  display: block;
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 6px 0 6px;
  color: var(--color-white);
}

.article-reading {
  margin: 15px 0 0;
  text-align: center;
}

.article-reading .el-button {
  border-color: #6b798e;
}

.article-reading .el-button--primary {
  background-color: #6b798e;
}

.article-reading .el-button--primary:hover {
  background-color: #6b798ecf;
}

.article-reading .el-button--primary:active {
  background-color: #505c6e;
}

.article-footer {
  margin: 0 0 8px;
}

.article-footer .el-tag {
  margin-left: 6px;
  /*color: #206864;*/
  /*border-color: #206864d4;*/
  /*background-color: #2068641f;*/
}

.article-footer .el-tag:hover {
  transition: .2s;
  /*background-color: #2068644C;*/
}

.article-footer .el-tag.blue {
  color: #4994c4;
  border-color: #4994c4;
  background-color: #4994c41f;
}

.article-footer .el-tag.blue:hover {
  background-color: #4994c44c;
}

.article-footer .el-tag.dark {
  color: #31322c;
  border-color: #31322c;
  background-color: #31322c1f;
}

.article-footer .el-tag.dark:hover {
  background-color: #31322c4c;
}

.article-footer .el-tag.green {
  color: #5d7259;
  border-color: #5d7259;
  background-color: #5d72591f;
}

.article-footer .el-tag.green:hover {
  background-color: #5d72594c;
}

.article-footer .el-tag.red {
  color: #b13b2e;
  border-color: #b13b2e;
  background-color: #b13b2e1f;
}

.article-footer .el-tag.red:hover {
  background-color: #b13b2e4c;
}

.article-footer .el-tag.orange {
  color: #d9883d;
  border-color: #d9883d;
  background-color: #d9883d1f;
}

.article-footer .el-tag.orange:hover {
  background-color: #d9883d4c;
}

.article-footer span .el-tag .el-tag-light {
  padding: 0 10px;
}

.article-footer .el-tag a {
  color: inherit;
  display: inline-block;
  height: 100%;
  width: 100%;
}
</style>