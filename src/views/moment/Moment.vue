<template>
  <div class="moment">
    <el-card shadow="always" :body-style="{ padding: '0 16px 16px'}">
      <h2 style="text-align: center">我的动态</h2>
      <el-divider></el-divider>
      <div class="momentList">
        <div class="moment-item" v-for="(moment,index) in momentList" :key="index">
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
              <font-awesome-icon @click="like(moment.id)" icon="fa-regular fa-heart" size="xs"
                                 :class="isLike(moment.id)?'red':''"/>
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
      momentList: [
        // {
        //   id:1,
        //   avatar: "http://rfjxf8517.hn-bkt.clouddn.com/touki.jpg",
        //   name: "Touki",
        //   content: "#### 一些配置导致的报错\n" +
        //       "\n" +
        //       "+ 运行`npm run xxx`时报错`Component name \"Home\" should always be multi-word`\n" +
        //       "\n" +
        //       "  + 原因在于组件名希望是驼峰或连字符形式，但官方也明确了单个残次组件命名时合规的，因此触发了`eslint`的语法检测\n" +
        //       "\n" +
        //       "  + **解决方案：**在`vue.config.js`配置文件中配置`lintOnSave: false`重新编译运行即可\n" +
        //       "\n" +
        //       "\n" +
        //       "\n" +
        //       "#### 一些通用配置\n" +
        //       "\n" +
        //       "+ 配置`@`为`/src`路径\n" +
        //       "\n" +
        //       "  + 在`vue.config.js`中做如下配置\n" +
        //       "\n" +
        //       "  + ```js\n" +
        //       "    const path = require('path')\n" +
        //       "    module.exports = {\n" +
        //       "      configureWebpack: {\n" +
        //       "        resolve: {\n" +
        //       "          alias: {\n" +
        //       "            '@': path.resolve(__dirname, 'src')\n" +
        //       "          }\n" +
        //       "        }\n" +
        //       "      }\n" +
        //       "    }\n" +
        //       "    ```",
        //   createTime: "2022-07-11T07:15:45.000+00:00",
        //   likes: 0,
        // },
        // {
        //   id:2,
        //   avatar: "http://rfjxf8517.hn-bkt.clouddn.com/touki.jpg",
        //   name: "Touki",
        //   content: "楚归寒本想说自己今年已经十九岁了，算不得小姑娘了，可是话到嘴边却没说出口。\n" +
        //       "\n" +
        //       "华重慢步走向厢房，楚归寒默默看着他的背影，月光下他的影子慢慢融入屋檐下。",
        //   createTime: "2022-07-11T07:15:45.000+00:00",
        //   likes: 0,
        // }
      ],
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
        this.momentList = res.data.list
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
    like(id) {
      if (this.likeMomentIds.indexOf(id) > -1) {
        //两秒后关闭
        Notification.warning({title: "注意", message: "你已经点过赞了哦！", duration: 3000})
        return
      }
      likeMoment(id).then(() => {
        Notification.success({title: "成功", message: "点赞成功！", duration: 3000})
        this.likeMomentIds.push(id)
        //成功后要更新本地的moment情况（因为此时没有请求momentList，likes需要手动更新）
        this.momentList.forEach(item => {
          if (item.id === id) {
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