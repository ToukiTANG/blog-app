<template>
  <header ref="header">
    BlogHeader组件
    <div>
      <!-- <div
        class="bgimag"
        style="
          background-image: url('https://fastly.jsdelivr.net/gh/Naccl/blog-resource/img/bg1.jpg');
        "
      ></div> -->
      <!-- <img
        src="https://fastly.jsdelivr.net/gh/Naccl/blog-resource/img/bg1.jpg"
      /> -->
    </div>
    <hr />
    <div class="wrpper">
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

<style>

</style>