<template>
  <div class="archives">
    <el-card shadow="always">
      <h2 class="category-name">当前共{{ count }}篇文章</h2>
      <div class="count-text">点击日期标签查看当月文章列表</div>
      <el-divider></el-divider>
      <div class="timeline">
        <div class="timeline-item" v-for="(value, key ,index) in archiveMap" :key="index">
          <div class="timeline-header">
            <a href="#">{{ key }}</a>
          </div>
          <div v-for="item in value" :key="item.id">
            <div class="timeline-item">
              <div class="wrap">
                <span class="day">{{ item.day }}日</span>
                <a href="#">
                  <div class="title">{{ item.title }}</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {getArchives} from "@/api/archives";
import {light2dark} from "@/utils/navCss";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Archives",
  data() {
    return {
      count: 5,
      archiveMap:
          {
            "2020年12月":
                [
                  {"id": 1, "title": "测试title01-01", "day": 14}, {"id": 2, "title": "测试title01-02", "day": 12}
                ],
            "2020年1月":
                [
                  {"id": 3, "title": "测试title02-03", "day": 3},
                  {"id": 4, "title": "测试title02-02", "day": 2},
                  {"id": 5, "title": "测试title02-01", "day": 1}
                ]
          },
      colorObj: {
        0: 'tl-blue',
        1: 'tl-dark',
        2: 'tl-green',
        3: 'tl-purple',
        4: 'tl-red',
      }
    }
  },
  created() {
    // this.getArchives()
  },
  methods: {
    getArchives() {
      getArchives().then(res => {
        this.count = res.data.count
        this.archiveMap = res.data.resultMap
      }).catch(() => {
        this.$message({type: "error", message: "好像哪里出了问题呢，请重试！", showClose: true})
      })
    },
    toBlob(blog) {
      console.log(blog)
    }
  },
  mounted() {
    light2dark()
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
  background-color: #23b7e5;
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
  border-color: #23b7e5;
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
  background-color: #23b7e5;
  color: #ffffff;
  width: fit-content;
  border-radius: 5px;
}
</style>