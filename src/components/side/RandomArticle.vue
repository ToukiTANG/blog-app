<template>
  <div class="random-article">
    <el-card class="random-container" shadow="hover" style="{padding: 0}">
      <div class="random-header">
        <!--<i class="fa-solid fa-shuffle"></i>-->
        <font-awesome-icon icon="fa-shuffle"></font-awesome-icon>
        <span>随机文章</span>
      </div>
      <el-divider></el-divider>
      <div class="article-container">
        <div class="article-item" v-for="article in randomList" :key="article.id">
          <img :src="article.firstPicture" alt="">
          <div class="article-info">
            <div class="date">{{ article.updateTime|timeFormat("yyyy-MM-DD") }}</div>
            <div class="title">{{ article.title }}</div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "RandomArticle",
  data() {
    return {
      randomList: [
        {
          "id": 1,
          "title": "随机文章1",
          "firstPicture": "/img/firstPicture.c7dd3f07.jpg",
          "updateTime": "2022-07-11T07:15:45.000+00:00"
        },
        {
          "id": 2,
          "title": "随机文章2",
          "firstPicture": "/img/firstPicture.c7dd3f07.jpg",
          "updateTime": "2022-07-10T07:15:45.000+00:00"
        },
        {
          "id": 3,
          "title": "随机文章3",
          "firstPicture": "/img/firstPicture.c7dd3f07.jpg",
          "updateTime": "2022-07-09T07:15:45.000+00:00"
        }]
    }
  },
}
</script>

<style scoped>
.random-article {
  position: sticky;
  top: 60px;
}

.random-article >>> .el-card__body {
  padding: 0;
}

.random-article .el-divider--horizontal {
  margin: 0;
  height: 2px;
}

.random-header {
  background-color: var(--color-base);
  display: flex;
  align-items: center;
}

.random-header svg {
  margin: 17px 10px 15px 20px;
}

.random-header span{
  display: block;
}

.random-article .el-card {
  border: 1px solid var(--color-border);
}

.random-article .el-card.is-hover-shadow:hover {
  box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, .3)
}

.article-container {
  padding: 0 15px;
}

.article-item {
  margin: 15px auto;
  height: 110px;
  position: relative;
  cursor: pointer;
}

.article-item .article-info {
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, .6));
  position: absolute;
  bottom: 0;
  color: white;
  width: 100%;
  font-size: 0.8em;
  padding: 0.5em;
  border-radius: 5px;
}

.article-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

</style>