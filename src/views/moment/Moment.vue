<template>
  <div class="moment">
    <el-card shadow="always" :body-style="{ padding: '0 16px 16px'}">
      <h2 style="text-align: center">我的动态</h2>
      <el-divider></el-divider>
      <div class="momentList">
        <div class="moment-item" v-for="(moment,index) in momentList" :key="index" v-viewer>
          <div class="avatar">
            <img :src="introduction.avatar" alt="moment-avatar">
          </div>
          <div class="content">
            <div class="top">
              <span style="font-weight: 700">
                {{ introduction.nickname }}
              </span>
              <span style="float: right;font-size: .8em">{{ moment.createTime|timeFormat }}</span>
            </div>
            <div class="typo match-braces rainbow-braces" v-html="moment.content"></div>
            <div class="bottom">
              <font-awesome-icon @click="like(moment.momentId)" icon="fa-regular fa-heart" size="xs"
                                 :class="isLike(moment.momentId)?'red':''"/>
              {{ moment.likes }}
            </div>
          </div>
        </div>
      </div>
      <el-pagination @current-change="handleCurrentChange" :current-page="pageNum" :total="total"
                     :page-size="pageSize"
                     layout="prev, pager, next, jumper" background>
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {getMomentList, likeMoment} from "@/api/moment";
import {Message, Notification} from "element-ui";
import {mapState} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Moment",
  components: {},
  data() {
    return {
      momentList: [],
      pageNum: 1,
      total: 1,
      pageSize: 1,
      //用localStorage本地存储已点赞的动态id数组
      likeMomentIds: JSON.parse(window.localStorage.getItem('likeMomentIds') || '[]')
    }
  },
  computed: {
    ...mapState(["introduction"]),
    isLike() {
      return function (id) {
        //判断已点赞的动态是否存在于localStorage
        return this.likeMomentIds.indexOf(id) > -1
      }
    }
  },
  watch: {
    likeMomentIds(newValue) {
      //将likeMomentIds最新值的json数据保存到localStorage
      window.localStorage.setItem('likeMomentIds', JSON.stringify(newValue))
    }
  },
  created() {
    this.getMomentList()
  },
  methods: {
    getMomentList() {
      getMomentList(this.pageNum).then(res => {
        this.momentList = res.data.dataList
        this.total = res.data.total
        this.pageSize = res.data.pageSize
        //Prism需要手动渲染
        this.$nextTick(() => {
          Prism.highlightAll()
        })
      }).catch(() => {
        Message({type: "error", message: "动态加载失败，请重试！", showClose: true})
      })
    },
    handleCurrentChange(newPage) {
      this.scrollToTop()
      this.pageNum = newPage
      this.getMomentList();
    },
    like(momentId) {
      if (this.likeMomentIds.indexOf(momentId) > -1) {
        //两秒后关闭
        Notification.warning({title: "注意", message: "你已经点过赞了哦！", duration: 3000})
        return
      }
      likeMoment(momentId).then(() => {
        Notification.success({title: "成功", message: "点赞成功！", duration: 3000})
        this.likeMomentIds.push(momentId)
        //成功后要更新本地的moment情况（因为此时没有请求momentList，likes需要手动更新）
        this.momentList.forEach(item => {
          if (item.momentId === momentId) {
            return item.likes++
          }
        })
      }).catch(() => {
        Notification.warning({title: "注意", message: "异常情况，请刷新重试！", duration: 3000})
      })
    }
  },
}
</script>

<style scoped>

.el-card {
  padding: 25px 20px 0;
  margin-bottom: 20px;
  border: 1px solid var(--color-border);
  overflow: visible;
  border-radius: 4px;
}

.momentList {
  padding-left: 40px;
  margin-left: 25px;
  border-left: 1px solid #dee5e7;
}

.moment-item {
  margin-top: 2em;
}

.moment-item img {
  float: left;
  object-fit: cover;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  margin-left: -62.5px;
}

.moment-item .content {
  width: 100%;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: white;
  padding: 10px 15px;
}

.moment-item .content:before {
  border-width: 0 0 1px 1px;
  transform: translateX(-50%) translateY(-50%) rotate(45deg);
  bottom: auto;
  right: auto;
  top: 22px;
  left: 0;
  position: absolute;
  content: "";
  background-image: none;
  width: 12px;
  height: 12px;
  transition: background .1s ease;
  background-color: inherit;
  border-style: solid;
  border-color: #d4d4d5;
}

.content .top {
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, .05);
}

.v-note-wrapper {
  min-height: 0;
  z-index: 0;
}

.typo {
  margin: 20px 0;
}

.markdown-body >>> .v-show-content {
  padding: 15px !important;
}

.markdown-body >>> p {
  margin: 10px 0 !important;
}

.content .bottom {
  border-top: 1px solid rgba(0, 0, 0, .05);
  padding: 5px 15px;
}

.content .bottom svg {
  cursor: pointer;
  opacity: .5;
}

.content .bottom svg:hover {
  opacity: 1;
}

.content .bottom svg.red {
  color: red;
}

.el-pagination {
  margin-top: 20px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
