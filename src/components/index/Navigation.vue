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
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-menu-item index="2-4">选项4</el-menu-item>
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
  name: "Navigation",
  data() {
    return {
      isActive: "1",
    };
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
</style>