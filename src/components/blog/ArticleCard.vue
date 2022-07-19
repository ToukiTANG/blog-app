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
          <!--概述-->
          <div class="article-description">
            {{ blog.description }}
          </div>
          <!--首图-->
          <div v-if="blog.firstPicture" style="{width: 100%}">
            <img class="first-img" src="@/assets/firstPicture.jpg" alt="firstPicture"/>
          </div>
          <div class="me-article-footer">
            <el-tag v-for="t in blog.tags" :key="t.tagName" size="mini" type="success">{{
                t.tagName
              }}
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
  width: 100%;
}

.article-description {
  margin: 20px 0;
}

.el-tag {
  margin-left: 6px;
}
</style>