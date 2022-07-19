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
          <!--首图-->
          <div>

          </div>
          <!--概述-->
          <div class="me-article-description">
            {{ blog.description }}
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
    blogList: {
      type: Array,
      require: true
    },
  },
  data() {
    return {};
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

.el-tag {
  margin-left: 6px;
}
</style>