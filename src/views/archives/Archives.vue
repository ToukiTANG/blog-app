<template>
  <div class="archives">
    <el-card shadow="always" v-show="!yearMonth">
      <h2 class="category-name">当前共{{ count }}篇文章</h2>
      <div class="count-text">点击日期标签查看当月文章列表或点击文章标签查看详情</div>
      <el-divider></el-divider>
      <div class="timeline">
        <div class="timeline-item" v-for="(value, key ,index) in archiveMap" :key="index">
          <div class="timeline-header" :class="colorObj[index%5]">
            <router-link :to="`/archive/${key}`" class="date">{{ key }}</router-link>
          </div>
          <div v-for="item in value" :key="item.id">
            <div class="timeline-item">
              <div class="wrap" :class="colorObj[index%5]">
                <span class="day">{{ item.day }}日</span>
                <router-link :to="`/blog/${item.id}`">
                  <div class="title" :class="colorObj[index%5]">{{ item.title }}</div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="timeline-header" :class="'dark'">
          <a href="#" class="date">Hello world!</a>
        </div>
      </div>
    </el-card>
    <el-card v-show="yearMonth">
      <h2>{{ yearMonth }}的文章</h2>
    </el-card>
    <blogs v-show="yearMonth" :blogList="blogList" :totalPage="totalPage"></blogs>
  </div>
</template>

<script>
import {getArchives, getBlogListByYearMonth} from "@/api/archives";
import {Message} from "element-ui";
import Blogs from "@/components/blog/Blogs";
import {mapState} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Archives",
  components: {Blogs},
  data() {
    return {
      count: 0,
      archiveMap:
          {
            // "2022年7月":
            //     [
            //       {"id": 1, "title": "测试title01-01", "day": 14}, {"id": 2, "title": "测试title01-02", "day": 12}
            //     ],
            // "2020年1月":
            //     [
            //       {"id": 3, "title": "测试title02-03", "day": 3},
            //       {"id": 4, "title": "测试title02-02", "day": 2},
            //       {"id": 5, "title": "测试title02-01", "day": 1}
            //     ],
            // "2019年12月":
            //     [
            //       {"id": 3, "title": "测试title02-03", "day": 3},
            //       {"id": 4, "title": "测试title02-02", "day": 2},
            //       {"id": 5, "title": "测试title02-01", "day": 1}
            //     ]
          },
      blogList: [],
      totalPage: 0,
    }
  },
  computed: {
    ...mapState(["colorObj"]),
    yearMonth() {
      return this.$route.params.yearMonth
    },
  },
  watch: {
    '$route.fullPath'() {
      //这里是重用组件时的判断
      if (this.yearMonth) {
        this.getBlogList()
      } else {
        this.getArchives()
      }
    }
  },
  created() {
    //这里也做判断是防止直接刷新年月归档导致不会加载的问题
    if (this.yearMonth) {
      this.getBlogList()
    } else {
      this.getArchives()
    }
  },
  methods: {
    getArchives() {
      getArchives().then(res => {
        this.count = res.data.count
        this.archiveMap = res.data.resultMap
      }).catch(() => {
        Message({type: "error", message: "好像哪里出了问题呢，请重试！", showClose: true})
      })
    },
    getBlogList(pageNum) {
      getBlogListByYearMonth(pageNum, this.yearMonth).then(res => {
        this.totalPage = res.data.totalPage
        this.blogList = res.data.list
      }).catch(() => {
        Message({type: "error", message: "好像哪里出了问题呢，请重试！", showClose: true})
      })

    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.archives .el-card {
  padding: 0;
  margin-bottom: 10px;
  border: 1px solid var(--color-border);
  text-align: center;
  /*box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, .3)*/
}

.archives .count-text {
  margin-top: 15px;
}

.timeline {
  padding: 0 50px 0;
  flex-direction: column;
}

.timeline .timeline-header {
  height: 30px;
  width: 100px;
  text-align: center;
  border-radius: 5px;
}

.timeline-header a {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: #ffffff;
  font-size: 14px;
}

.wrap {
  margin-left: 50px;
  position: relative;
  padding: 15px 0 15px 20px;
  border-style: solid;
  border-width: 0 0 0 4px;
}

.wrap:before {
  content: "";
  position: relative;
  top: 15px;
  float: left;
  width: 10px;
  height: 10px;
  margin-left: -30px;
  background-color: #ffffff;
  border-color: inherit;
  border-style: solid;
  border-width: 3px;
  border-radius: 50%;
  box-shadow: 0 0 0 4px #ffffff;
}

.wrap span {
  position: relative;
  top: 10px;
  display: block;
  float: left;
  width: 4.5em;
  margin-left: -7.5em;
  text-align: right;
}

.wrap a {
  display: block;
  width: fit-content;
}

.wrap a .title:before {
  content: "";
  transform: translateX(-50%) translateY(-50%) rotate(45deg);
  position: absolute;
  bottom: auto;
  right: auto;
  top: 50%;
  left: 0;
  width: 0.66em;
  height: 0.66em;
  z-index: 2;
  background-color: inherit;
}

.wrap a .title {
  position: relative;
  display: block;
  font-size: 14px;
  padding: 12px 15px;
  letter-spacing: 0.3px;
  color: #ffffff;
  width: fit-content;
  border-radius: 5px;
}

.timeline-header.blue, .title.blue {
  background-color: #4994c4;
}

.timeline-header.blue:hover, .title.blue:hover {
  opacity: .8;
}

.wrap.blue {
  border-color: #4994c4;
}

.timeline-header.dark, .title.dark {
  background-color: #31322c;
}

.timeline-header.dark:hover, .title.dark:hover {
  opacity: .8;
}

.wrap.dark {
  border-color: #31322c;
}

.timeline-header.green, .title.green {
  background-color: #5d7259;
}

.timeline-header.green:hover, .title.green:hover {
  opacity: .8;
}

.wrap.green {
  border-color: #5d7259;
}

.timeline-header.orange, .title.orange {
  background-color: #d9883d;
}

.timeline-header.orange:hover, .title.orange:hover {
  opacity: .8;
}

.wrap.orange {
  border-color: #d9883d;
}

.timeline-header.red, .title.red {
  background-color: #b13b2e;
}

.timeline-header.red:hover, .title.red:hover {
  opacity: .8;
}

.wrap.red {
  border-color: #b13b2e;
}
</style>