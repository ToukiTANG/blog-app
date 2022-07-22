<template>
  <div class="men-bar" :class="dark?'dark':''">
    <h1 class="logo">Touki's blog</h1>
    <ul>
      <li class="li-item" :class="dark?'dark':''">
        <!--<i class="fa-solid fa-house-chimney fa-xs"></i>-->
        <router-link to="/home">
          <font-awesome-icon icon="fa-house-chimney" size="xs"></font-awesome-icon>
          首页
        </router-link>
      </li>
      <li class="li-item" :class="dark?'dark':''">
        <!--<i class="fa-solid fa-layer-group fa-xs"></i>-->
        <!--<i class="fas fa-caret-down fa-xs"></i>-->
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
                @click="category(item.name)"
            >
              <a href="#">{{ item.name }}</a>
            </li>
          </ul>
        </div>
      </li>
      <li class="li-item" :class="dark?'dark':''">
        <!--<i class="fa-solid fa-calendar fa-xs"></i>-->
        <router-link to="/archives">
          <font-awesome-icon icon="fa-calendar" size="xs"></font-awesome-icon>
          归档
        </router-link>
      </li>
      <li class="li-item" :class="dark?'dark':''">
        <!--<i class="fa-solid fa-circle-info fa-xs"></i>-->
        <a href="#" @click="about">
          <font-awesome-icon icon="fa-circle-info" size="xs"></font-awesome-icon>
          关于</a>
      </li>
    </ul>
    <div class="search">
      <div class="icon"></div>
      <div class="input">
        <input type="text" placeholder="Search" id="mySearch"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

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
      dark: false
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
    category(name) {
      this.$router.push(`/category/${name}`);
    },
    about() {
      this.$router.push(`/about`)
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

.men-bar .search {
  position: relative;
  height: 50%;
  background-color: transparent;
  border-radius: 60px;
  flex: 1;
  transition: 0.5s;
  overflow: hidden;
}

.men-bar .search .icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 100%;
  background: transparent;
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
}

.men-bar .search .icon::before {
  content: '';
  position: absolute;
  width: 15px;
  height: 15px;
  border: 3px solid #8b909f;
  border-radius: 50%;
  transform: translate(-4px, -4px);
}

.men-bar .search .icon::after {
  content: '';
  position: absolute;
  width: 3px;
  height: 12px;
  background: #8b909f;
  border-radius: 50%;
  transform: translate(6px, 6px) rotate(315deg);
}

.men-bar .search .input {
  position: relative;
  width: 300px;
  height: 100%;
  left: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.men-bar .search .input input {
  color: var(--color-white);
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 18px;
  background: transparent;
}
</style>