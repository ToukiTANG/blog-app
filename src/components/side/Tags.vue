<template>
  <div class="tags">
    <el-card class="tags-container" shadow="hover" style="{padding: 0}">
      <div class="tags-header">
        <font-awesome-icon icon="fa-tags"></font-awesome-icon>
        <span>标签云</span>
      </div>
      <el-divider></el-divider>
      <div class="tags-item-container">
        <el-tag :class="colorObj[index%5]" v-for="(t,index) in tagList" :key="index">
          <a href="#">{{ t.tagName }}</a>
        </el-tag>
      </div>
    </el-card>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tags",
  data() {
    return {
      tagList: [{id: 1, tagName: "Java"}, {id: 2, tagName: "SpringBoot"}, {id: 3, tagName: "Python"}, {
        id: 4, tagName:
            "测试tag名字"
      }, {id: 5, tagName: "C++"}],
    }
  },
  computed: {
    ...mapState(["colorObj"])
  },
}
</script>

<style scoped>
.tags {
  position: sticky;
  top: 522px;
}

.tags >>> .el-card__body {
  padding: 0;
}

.tags .el-divider--horizontal {
  margin: 0;
  height: 2px;
}

.tags .el-card {
  border: 1px solid var(--color-border);
}

.tags .el-card.is-hover-shadow:hover {
  box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, .3)
}

.tags-header {
  background-color: var(--color-base);
  display: flex;
  align-items: center;
}

.tags svg {
  margin: 17px 10px 15px 20px;
}

.tags span {
  display: block;
}

.tags-item-container {
  padding: 10px 15px;
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
}

.tags-item-container .el-tag {
  margin: 5px;
  /*color: #206864;*/
  /*border-color: #206864;*/
  /*background-color: #2068641f;*/
}

.tags-item-container .el-tag a {
  color: inherit;
  display: inline-block;
  height: 100%;
  width: 100%;
}

.tags-item-container .el-tag:hover {
  transition: .2s;
  /*background-color: #2068644C;*/
}

.tags-item-container .el-tag.blue {
  color: #4994c4;
  border-color: #4994c4;
  background-color: #4994c41f;
}

.tags-item-container .el-tag.blue:hover {
  background-color: #4994c44c;
}

.tags-item-container .el-tag.dark {
  color: #31322c;
  border-color: #31322c;
  background-color: #31322c1f;
}

.tags-item-container .el-tag.dark:hover {
  background-color: #31322c4c;
}

.tags-item-container .el-tag.green {
  color: #5d7259;
  border-color: #5d7259;
  background-color: #5d72591f;
}

.tags-item-container .el-tag.green:hover {
  background-color: #5d72594c;
}

.tags-item-container .el-tag.red {
  color: #b13b2e;
  border-color: #b13b2e;
  background-color: #b13b2e1f;
}

.tags-item-container .el-tag.red:hover {
  background-color: #b13b2e4c;
}

.tags-item-container .el-tag.orange {
  color: #d9883d;
  border-color: #d9883d;
  background-color: #d9883d1f;
}

.tags-item-container .el-tag.orange:hover {
  background-color: #d9883d4c;
}

.tags-item-container span .el-tag .el-tag-light {
  padding: 0 10px;
}

</style>