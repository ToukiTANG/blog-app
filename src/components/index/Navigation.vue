<template>
  <div class="men-bar">
    <h1 class="logo">Touki's blog</h1>
    <ul>
      <li class="li-item-init">
        <router-link to="/home">首页</router-link>
      </li>
      <li class="li-item-init">
        <a href="#">分类<i class="fas fa-caret-down"></i></a>
        <div class="dropdown-menu">
          <ul>
            <li
                class="li-item-init"
                v-for="item in categoryList"
                :key="item.id"
                @click="category(item.name)"
            >
              <a href="#">{{ item.name }}</a>
            </li>
          </ul>
        </div>
      </li>
      <li class="li-item-init">
        <router-link to="/archives">归档</router-link>
      </li>
      <li class="li-item-init">
        <a href="#">关于<i class="fas fa-caret-down"></i></a>
        <div class="dropdown-menu">
          <ul>
            <li class="li-item-init"><a href="#">网站</a></li>
            <li class="li-item-init"><a href="#">作者</a></li>
          </ul>
        </div>
      </li>
    </ul>
    <div class="search">
      <div class="icon"></div>
      <div class="input">
        <input type="text" placeholder="Search" id="mySearch" />
      </div>
    </div>
  </div>
</template>

<script>
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
      isActive: "1",
      isChange: true,
    };
  },
  mounted() {
    window.addEventListener("scroll", () => {
      if (this.$route.name === "home") {
        if (window.scrollY > 200) {
          const menList = document.getElementsByClassName("men-bar");
          menList[0].style.backgroundColor = "var(--color-black)";
          const liList = document.getElementsByClassName("li-item-init");
          for (let i = 0; i < liList.length; i++) {
            liList[i].className = "li-item-change";
          }
        } else {
          const menList = document.getElementsByClassName("men-bar");
          menList[0].style.backgroundColor = "transparent";
          const liList = document.getElementsByClassName("li-item-change");
          for (let i = 0; i < liList.length; i++) {
            liList[i].className = "li-item-init";
          }
        }
      }
    });
  },


  methods: {
    category(name) {
      this.$router.push(`/category/${name}`);
    },
  },
};
</script>

<style scoped>
</style>