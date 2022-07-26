<template>
  <div class="random-blog">
    <el-card class="random-container" shadow="hover" style="{padding: 0}">
      <div class="random-header">
        <!--<i class="fa-solid fa-shuffle"></i>-->
        <font-awesome-icon icon="fa-shuffle"></font-awesome-icon>
        <span>随机文章</span>
      </div>
      <el-divider></el-divider>
      <div class="blog-container">
        <div class="blog-item" v-for="blog in randomBlogList" :key="blog.id" @click="view(blog.id)">
          <img :src="blog.firstPicture?blog.firstPicture:default_img" alt="">
          <div class="blog-info">
            <div class="date">{{ blog.createTime|timeFormat("yyyy-MM-DD") }}</div>
            <div class="title">{{ blog.title }}</div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "RandomBlog",
  data() {
    return {
      default_img: "http://rfjxf8517.hn-bkt.clouddn.com/random_default.jpg"
      /*randomList: [*/
      /*  {*/
      /*    "id": 1,*/
      /*    "title": "随机文章1",*/
      /*    "firstPicture": "/img/firstPicture.c7dd3f07.jpg",*/
      //     "updateTime": "2022-07-11T07:15:45.000+00:00"
      //   },
      //   {
      //     "id": 2,
      //     "title": "随机文章2",
      //     "firstPicture": "/img/firstPicture.c7dd3f07.jpg",
      //     "updateTime": "2022-07-10T07:15:45.000+00:00"
      //   },
      //   {
      //     "id": 3,
      //     "title": "随机文章3",
      //     "firstPicture": "/img/firstPicture.c7dd3f07.jpg",
      //     "updateTime": "2022-07-09T07:15:45.000+00:00"
      //   }]
    }
  },
  props: {
    randomBlogList: {
      type: Array,
      require: true
    },
  },
  methods: {
    view(id) {
      this.$router.push(`/blog/${id}`)
    }
  },
}
</script>

<style scoped>
.random-blog {
  position: sticky;
  top: 60px;
}

.random-blog >>> .el-card__body {
  padding: 0;
}

.random-blog .el-divider--horizontal {
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

.random-header span {
  display: block;
}

.random-blog .el-card {
  border: 1px solid var(--color-border);
}

.random-blog .el-card.is-hover-shadow:hover {
  box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, .3)
}

.blog-container {
  padding: 0 15px;
}

.blog-item {
  margin: 15px auto;
  height: 100px;
  position: relative;
  cursor: pointer;
}

.blog-item .blog-info {
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, .6));
  position: absolute;
  bottom: 0;
  color: white;
  width: 100%;
  font-size: 0.8em;
  padding: 0.5em;
  border-radius: 5px;
}

.blog-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

</style>