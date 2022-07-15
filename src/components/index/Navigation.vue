<template>
  <div class="men-bar">
    <h1 class="logo">Touki's blog</h1>
    <ul>
      <li>
        <router-link to="/home">首页</router-link>
      </li>
      <li><a href="#">分类<i class="fas fa-caret-down"></i></a>
        <div class="dropdown-menu">
          <ul>
            <li class="li-item" v-for="item in categoryList" :key="item.id" @click="category(item.name)"><a
                href="#">{{ item.name }}</a></li>
          </ul>
        </div>
      </li>
      <li>
        <router-link to="/archives">归档</router-link>
      </li>
      <li><a href="#">关于<i class="fas fa-caret-down"></i></a>
        <div class="dropdown-menu">
          <ul>
            <li class="li-item"><a href="#">网站</a></li>
            <li class="li-item"><a href="#">作者</a></li>
          </ul>
        </div>
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

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navigation",
  props: {
    categoryList: {
      type: Array,
      require: true
    },
  },
  data() {
    return {
      isActive: "1",
      isChange: true,
    };
  },
  mounted() {
    function setStyleSheet(title) {
      // 首先找到DOM中所有的link标签
      const link_list = document.getElementsByTagName("link");
      if (link_list) {
        for (let i = 0; i < link_list.length; i++) {
          // 要找到所有link中rel属性值包括style的，也就是包括stylesheet和alternate stylesheet;
          if (link_list[i].getAttribute("rel").indexOf("style") != -1) {
            // 将符合条件的link的disabled的属性设为true，都改为禁用；
            link_list[i].disabled = true;
            // 然后判断link标签中的title属性，找到我们需要替换的css文件
            // 找到后将该link的disabled改为启用；
            if (link_list[i].getAttribute("title") === title) {
              link_list[i].disabled = false;
            }
          }
        }
      }
    }

    window.addEventListener("scroll", () => {
      if (this.$route.name === "home") {
        if (window.scrollY > 100) {

          setStyleSheet("b")
        }
      }
    })
  },
  methods: {
    category(name) {
      this.$router.push(`/category/${name}`)
    },

  }
}
</script>

<style scoped>

</style>