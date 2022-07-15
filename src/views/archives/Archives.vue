<template>
  <div class="Archives">
    <div>
      <h2 class="blog-archives">文章归档</h2>
      <p>目前共{{ count }}篇日志</p>
    </div>
    <el-divider></el-divider>
    <div class="time-line">
      <el-timeline>
        <template v-for="(value,key,index1) in archiveMap">
          <div :key="index1">
            <el-timeline-item timestamp="" placement="bottom">
              <el-tag effect="dark">{{ key }}</el-tag>
            </el-timeline-item>
            <el-timeline-item v-for="item in value" :key="item.id" :timestamp="item.day+'日'" placement="bottom">
              <el-tag effect="plain">{{ item.title }}</el-tag>
            </el-timeline-item>
          </div>
        </template>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import {getArchives} from "@/api/archives";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Archives",
  data() {
    return {
      count: 0,
      archiveMap: {"2020": ["1-1", "1-2"], "2021": ["2-1", "2-2", "2-3"]}
    }
  },
  created() {
    this.getArchives()
  },
  methods: {
    getArchives() {
      getArchives().then(res => {
        this.count = res.data.count
        this.archiveMap = res.data.resultMap
      }).catch(() => {
        this.$message({type: "error", message: "好像哪里出了问题呢，请重试！", showClose: true})
      })
    }
  },
}
</script>

<style scoped>

</style>