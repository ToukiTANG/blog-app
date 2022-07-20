<template>
  <div class="introduction">
    <el-card shadow="hover" :body-style="{padding:0}">
      <img src="@/assets/touki.jpg" class="image" alt="">
      <div class="text-nickname">Touki</div>
      <el-divider></el-divider>
      <div class="text-description">人生海海，山山而川</div>
      <el-collapse accordion>
        <el-collapse-item title="test01" name="test01">test01</el-collapse-item>
        <el-collapse-item title="test02" name="test02">test02</el-collapse-item>
        <el-collapse-item title="test03" name="test03">test03</el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Introduction"
}
</script>

<style scoped>
.introduction{
  position: sticky;
  top: 60px;
}

.image {
  object-fit: cover;
  width: 100%;
}

.el-card{
  border: 1px solid var(--color-border);
}

.el-card.is-hover-shadow:hover {
  box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, .3)
}

.el-divider--horizontal {
  margin: 20px 0;
}

.text-nickname {
  font-size: 1.25em;
  text-align: center;
  margin-top: 20px;
}

.text-description {
  text-align: center;
  margin-bottom: 20px;
}

.el-collapse-item {
  padding-left: 15px;
  padding-right: 15px;
}

>>> .el-collapse-item__header {
  font-size: 1em;
}
</style>