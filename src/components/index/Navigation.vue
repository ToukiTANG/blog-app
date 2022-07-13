<template>
  <div ref="nav">
    <el-menu
        :default-active="isActive"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#000000"
        text-color="#fff"
        active-text-color="#ffd04b"
        menu-trigger="click"
    >
      <el-menu-item index="1">
        <router-link class="link" to="/home" active-class="active">
          <i class="el-icon-s-home"></i>首页
        </router-link>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">分类</template>
        <template v-for="item in categoryList">
            <el-menu-item @click="category(item.name)" :index="item.id" :key="item.id">{{item.name}}</el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item index="3">归档</el-menu-item>
      <el-submenu index="4">
        <template slot="title">关于</template>
        <el-menu-item index="4-1">网站</el-menu-item>
        <el-menu-item index="4-2">作者</el-menu-item>
      </el-submenu>
    </el-menu>
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
    };
  },
  methods: {
    category(name) {
      this.$router.push(`/category/${name}`)
    }
  },
};
</script>

<style scoped>
.link {
  text-decoration: none;
}

ul.el-menu-demo.el-menu--horizontal.el-menu {
  display: flex;
  justify-content: center;
}

.el-row {
  background-color: #42b983;
  margin: 20px;
}

.el-col {
  background-color: #2c3e50;
  color: white;
  padding: 10px;
  border-right: 1px solid white;
}

</style>