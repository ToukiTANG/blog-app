<template>
  <div>
    <div class="article-list" v-for="blog in blogList" :key="blog.id">
      <!--置顶标志-->
      <div v-if="blog.weight===1" class="article-top">
        <i class="fa-solid fa-circle-up fa-lg"></i>
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
              <div class="info-time"><i class="fa-solid fa-calendar-days fa-xs"><span>{{
                  blog.updateTime | timeToNow
                }}</span></i>
              </div>
            </div>
            <div class="info-item">
              <div class="info-views"><i class="fa-solid fa-eye fa-xs"></i><span>{{ blog.views }}</span></div>
            </div>
          </div>
          <!--分类标签-->
          <div class="category-tag">
            <router-link :to="`/category/${blog.category.categoryName}`">
              <i class="fa-solid fa-folder-open fa-sm"> {{ blog.category.categoryName }}</i>
            </router-link>
          </div>
          <!--概述-->
          <div class="article-description">
            {{ blog.description }}
          </div>
          <!--首图-->
          <div v-if="blog.firstPicture" style="{width: 100%}">
            <img class="first-img" src="@/assets/firstPicture.jpg" alt="firstPicture"/>
          </div>
          <!--阅读全文按钮-->
          <div class="article-reading">
            <el-button type="primary" round size="small">阅读全文</el-button>
          </div>
          <el-divider></el-divider>
          <!--标签-->
          <div class="article-footer">
            <el-tag v-for="t in blog.tags" :key="t.tagName">
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
          "firstPicture": "@/assets/firstPicture.jpg",
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
          "firstPicture": null,
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
      ]
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

.article-top i {
  color: white;
  float: right;
  position: relative;
  top: 18px;
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
  display: flex;
  justify-content: center;
  align-items: center;
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

.category-tag i {
  width: 100%;
  color: var(--color-white);
}

.category-tag a {
  display: flex;
  align-items: center;
  text-align: center;
  height: 100%;
  width: 100%;
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
  color: #206864;
  border-color: #206864d4;
  background-color: #2068641f;
}

.article-footer .el-tag:hover {
  transition: .2s;
  background-color: #2068644C;
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