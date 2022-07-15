<template>
  <header ref="header">
<!--    <img src="https://fastly.jsdelivr.net/gh/Naccl/blog-resource/img/bg3.jpg" alt="header大图"/>-->
    <img class="header-img" src="../../assets/世界的镇魂曲.jpg" alt="header大图"/>
    <hr />
    <div class="wave">
      <i class="el-icon-bottom" @click="toMain"></i>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "BlogHeader",
  data() {
    return {};
  },
  computed: {
    ...mapState(["clientSize"]),
  },
  watch: {
    "clientSize.clientHeight"() {},
  },
  methods: {
    toMain() {
      window.scrollTo({
        top: this.clientSize.clientHeight,
        behavior: "smooth",
      });
    },
    setHeaderHeight() {
      this.$refs.header.style.height = this.clientSize.clientHeight + "px";
    },
  },
  mounted() {},
};
</script>

<style scoped>
.header-img{
  width: 100%;
  object-fit: cover;
}

</style>