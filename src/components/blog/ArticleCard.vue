<template>
  <div>
    <div class="article-list" v-for="blog in blogList" :key="blog.id">
      <el-card class="me-area" :body-style="{ padding: '16px' }">
        <div class="me-article-header">
          <a @click="view(blog.id)" class="me-article-title">{{ blog.title }}</a>
          <el-button v-if="blog.weight > 0" class="me-article-icon" type="text"
          >置顶
          </el-button
          >
          <!-- 评论数展示 -->
          <!--          <span class="me-pull-right me-article-count"/>-->
          <!--          <i class="me-icon-comment"></i>&nbsp;{{ blog.commentCounts }}-->
          <span class="me-pull-right me-article-count"/>
          <i class="el-icon-view"></i>&nbsp;{{ blog.views }}
        </div>

        <div class="me-article-description">
          {{ blog.description }}
        </div>
        <div class="me-article-footer">
          <el-tag v-for="t in blog.tags" :key="t.tagName" size="mini" type="success">{{
              t.tagName
            }}
          </el-tag>

          <span class="me-pull-right me-article-count">
        <i class="el-icon-time"></i>&nbsp;{{ blog.updateTime | timeToNow}}
      </span>
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
.me-article-header {
  /*padding: 10px 18px;*/
  padding-bottom: 10px;
}

.me-article-title {
  font-weight: 600;
}

.me-article-icon {
  padding: 3px 8px;
}

.me-article-count {
  color: #a6a6a6;
  padding-left: 14px;
  font-size: 13px;
}

.me-pull-right {
  float: right;
}

.me-artile-description {
  font-size: 13px;
  line-height: 24px;
  margin-bottom: 10px;
}

.me-article-author {
  color: #a6a6a6;
  padding-right: 18px;
  font-size: 13px;
}

.el-tag {
  margin-left: 6px;
}
</style>