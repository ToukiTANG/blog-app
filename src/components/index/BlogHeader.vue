<template>

  <div class="image-header" ref="header">
    <div class="main-image">
      <img class="img-view" src="https://cdn.jsdelivr.net/gh/ToukiTANG/pic/img/Lumine.jpg" alt="main-image">
    </div>
    <div class="wrapper">
      <div>
        <!--<i class="icon-down fa-solid fa-angles-down" @click="toMain"></i>-->
        <font-awesome-icon class="icon-down" icon="fa-angles-down" @click="toMain"></font-awesome-icon>
      </div>
      <div class="wave1" style="background: url(https://cdn.jsdelivr.net/gh/ToukiTANG/pic/img/wave1.png) repeat-x"></div>
      <div class="wave2" style="background: url(https://cdn.jsdelivr.net/gh/ToukiTANG/pic/img/wave2.png) repeat-x"></div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "BlogHeader",
  data() {
    return {};
  },
  computed: {
    ...mapState(["clientSize"]),
  },
  watch: {
    "clientSize.clientHeight"() {
      this.setHeaderHeight()
    },
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
  mounted() {
    this.setHeaderHeight()
  },
};
</script>

<style scoped>
.image-header {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.main-image {
  height: 100%;
  align-items: center;
}

.img-view {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.wave1, .wave2 {
  position: absolute;
  bottom: 0;
  opacity: 0.7;
}

.wave1 {
  height: 75px;
  width: 100%;
}

.wave2 {
  height: 90px;
  width: calc(100% + 100px);
  left: -100px;
}

.wrapper .icon-down {
  cursor: pointer;
  font-size: 45px;
  position: absolute;
  left: 50%;
  bottom: 90px;
  color: #eaeef178;
  animation: opener .6s ease-in-out alternate infinite;
}

.wrapper svg:hover {
  transition: all .5s;
  color: #3c4d55;
}

@keyframes opener {
  100% {
    bottom: 100px
  }
}

</style>