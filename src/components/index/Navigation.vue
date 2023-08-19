<template>
  <div class="men-bar" :class="dark?'dark':''">
    <h1 class="logo">Touki's blog</h1>
    <ul>
      <li class="li-item" :class="dark?'dark':''">
        <router-link to="/home">
          <font-awesome-icon icon="fa-house-chimney" size="xs"></font-awesome-icon>
          首页
        </router-link>
      </li>
      <li class="li-item" :class="dark?'dark':''">
        <a href="#">
          <font-awesome-icon icon="fa-layer-group" size="xs"></font-awesome-icon>
          分类
          <font-awesome-icon icon="fa-caret-down" size="xs"></font-awesome-icon>
        </a>
        <div class="dropdown-menu">
          <ul>
            <li
                class="li-item" :class="dark?'dark':''"
                v-for="item in categoryList"
                :key="item.id"
            >
              <router-link :to="`/category/${item.categoryId}`">{{ item.categoryName }}</router-link>
            </li>
          </ul>
        </div>
      </li>
      <li class="li-item" :class="dark?'dark':''">
        <router-link to="/archives">
          <font-awesome-icon icon="fa-calendar" size="xs"></font-awesome-icon>
          归档
        </router-link>
      </li>
      <li class="li-item" :class="dark?'dark':''">
        <router-link to="/moment">
          <font-awesome-icon icon="fa-comment-dots" size="xs"></font-awesome-icon>
          动态
        </router-link>
      </li>
      <li class="li-item" :class="dark?'dark':''">
        <router-link to="/about">
          <font-awesome-icon icon="fa-circle-info" size="xs"></font-awesome-icon>
          关于
        </router-link>
      </li>
    </ul>
    <el-autocomplete
        class="search"
        v-model="queryString"
        :fetch-suggestions="querySearchAsync"
        placeholder="Search..."
        popper-class="search-item"
        @select="handleSelect"
        suffix-icon="el-icon-search"
        :debounce="1000"
    >
      <template slot-scope="{ item }">
        <div class="title">{{ item.title }}</div>
        <span class="content">{{ item.contentText }}</span>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {getSearchBlogList} from "@/api/blog";
import {Message} from "element-ui";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navigation",
  props: {
    categoryList: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      dark: false,
      queryString: '',
      queryResult: [],
    };
  },
  computed: {
    ...mapState(["clientSize"])
  },
  watch: {
    '$route.fullPath'() {
      this.dark = this.$route.name !== "home";
    }
  },
  mounted() {
    //如果在其他路由页面直接刷新，就会重新挂载nav，这里做一次判断，并对代码做一个精简和性能优化
    if (this.$route.name !== "home") {
      this.dark = true
    }
    window.addEventListener("scroll", () => {
      if (this.$route.name === "home") {
        this.dark = window.scrollY >= this.clientSize.clientHeight / 2;
      }
    })


  },
  methods: {
    querySearchAsync(queryString, callback) {
      if (queryString == null
          || queryString.trim() === ''
          || queryString.indexOf('%') !== -1
          || queryString.indexOf('_') !== -1
          || queryString.indexOf('[') !== -1
          || queryString.indexOf('#') !== -1
          || queryString.indexOf('*') !== -1
          || queryString.trim().length > 20) {
        return
      }
      getSearchBlogList(queryString).then(res => {
        this.queryResult = res.data
        if (this.queryResult.length === 0) {
          this.queryResult.push({title: '无相关搜索结果'})
        }
        callback(this.queryResult)
      }).catch(() => {
        Message({type: "error", message: "搜索好像出了一点问题呢，请稍后重试！", showClose: true})
      })
    },
    handleSelect(item) {
      if (item.blogId) {
        this.$router.push(`/blog/${item.blogId}`)
      }
    }
  },
};
</script>

<style scoped>
.men-bar {
  background-color: transparent;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  position: relative;
  z-index: 1000;
}

.nav-menu.dark {
  transition: .5s all ease-in-out;
  background-color: var(--color-black);
}

.men-bar .logo {
  flex: 1;
  color: #f5f3f2;
  font-size: 25px;
  font-style: italic;
  opacity: .8;
}

.men-bar ul {
  list-style: none;
  display: flex;
  flex: 6;
  height: 100%;
}

.men-bar ul svg {
  margin-right: 5px;
}

.men-bar ul li {
  width: 120px;
  position: relative;
}

.men-bar ul li a {
  font-size: 20px;
  color: var(--color-white);
  text-decoration: none;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.men-bar ul .li-item:hover {
  transition: background-color .2s ease-in-out;
  background-color: #0000000d;
}

.men-bar ul .li-item.dark:hover {
  transition: background-color .2s ease-in-out;
  background-color: var(--color-black-1);
}


.men-bar ul .li-item:hover .dropdown-menu {
  display: block;
  position: absolute;
  left: 0;
  top: 100%;
  transition: background-color .2s ease-in-out;
  background-color: inherit;
}

.men-bar ul .li-item.dark:hover .dropdown-menu {
  display: block;
  position: absolute;
  left: 0;
  top: 100%;
  transition: background-color .2s ease-in-out;
  background-color: var(--color-black);
  border-radius: 5px;
}

.men-bar ul li:hover .dropdown-menu ul {
  display: block;
}

.men-bar ul li:hover .dropdown-menu ul li {
  height: 60px;
  border-radius: 5px;
}


.dropdown-menu {
  display: none
}

.fa-caret-down {
  padding-left: 5px;
}

input {
  border: none;
}

>>> .el-input__inner {
  background-color: transparent;
  color: #e9e9e9;
  border: none;
  border-left: 1px solid #e9e9e93b;
  border-radius: 0;
}

>>> .el-input__suffix {
  color: #e9e9e9;
}

.search {
  min-width: 300px !important;
}

.title{
  font-weight: 700;
}

.content{
  margin-left: 10px;
}
</style>
