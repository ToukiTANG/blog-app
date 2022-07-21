<template>
  <div class="men-bar">
    <h1 class="logo">Touki's blog</h1>
    <ul>
      <li class="li-item-light">
        <router-link to="/home"><i class="fa-solid fa-house-chimney fa-xs"></i> 首页</router-link>
      </li>
      <li class="li-item-light">
        <a href="#"><i class="fa-solid fa-layer-group fa-xs"></i>分类<i class="fas fa-caret-down fa-xs"></i></a>
        <div class="dropdown-menu">
          <ul>
            <li
                class="li-item-light"
                v-for="item in categoryList"
                :key="item.id"
                @click="category(item.name)"
            >
              <a href="#">{{ item.name }}</a>
            </li>
          </ul>
        </div>
      </li>
      <li class="li-item-light">
        <router-link to="/archives"><i class="fa-solid fa-calendar fa-xs"></i>归档</router-link>
      </li>
      <li class="li-item-light">
        <a href="#" @click="about"><i class="fa-solid fa-circle-info fa-xs"></i>关于</a>
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
import {dark2light, light2dark} from "@/utils/navCss";
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
    return {};
  },
  computed: {
    ...mapState(["clientSize"])
  },
  watch: {
    '$route.fullPath'() {
      if (this.$route.name === "home") {
        dark2light()
      } else {
        light2dark()
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", () => {
      if (this.$route.name === "home") {
        if (window.scrollY >= this.clientSize.clientHeight / 2) {
          light2dark()
        } else {
          dark2light()
        }
      }
    })

  },
  methods: {
    category(name) {
      this.$router.push(`/category/${name}`);
    },
    about(){
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

.men-bar ul i {
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

.men-bar ul .li-item-light:hover {
  transition: background-color .2s;
  background-color: #0000000d;
}

.men-bar ul .li-item-dark:hover {
  transition: background-color .2s;
  background-color: var(--color-black-1);
}


.men-bar ul .li-item-light:hover .dropdown-menu {
  display: block;
  position: absolute;
  left: 0;
  top: 100%;
  transition: background-color .2s;
  background-color: inherit;
}

.men-bar ul .li-item-dark:hover .dropdown-menu {
  display: block;
  position: absolute;
  left: 0;
  top: 100%;
  transition: background-color .2s;
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