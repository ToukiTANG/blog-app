<template>
  <footer>
    <div class="footer-container">
      <div class="content-top">
        <div class="content-top-item">最新博客</div>
        <div class="content-top-item divider-container">
          <el-divider direction="vertical"></el-divider>
        </div>
        <div class="content-top-item">箴言</div>
      </div>
      <el-divider></el-divider>
      <div class="content-bottom">网站信息</div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "BlogFooter",
};
</script>

<style scoped>
footer {
  height: 200px;
  background-color: var(--color-black-1);
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-container {
  color: var(--color-white);
  width: 800px;
}

.el-divider--horizontal {
  margin: 0 0 20px 0;
  opacity: .5;
}

.el-divider--vertical {
  height: 6em;
  margin: 0;
  opacity: .5;
}

.content-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-top-item {
  text-align: center;
  flex: 5;
  padding: 20px;
  height: 130px;
}

.divider-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-bottom {
  margin-top: 20px;
  text-align: center;
}
</style>