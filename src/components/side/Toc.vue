<template>
  <div class="toc">
    <el-card class="toc-container" shadow="hover" style="{padding: 0}">
      <div class="toc-header">
        <font-awesome-icon icon="fa-solid fa-list" />
        <span>本文目录</span>
      </div>
      <el-divider></el-divider>
      <div class="js-toc">
      </div>
    </el-card>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Toc",
  computed: {
    ...mapState(['isBlogRenderComplete'])
  },
  watch: {
    //文章渲染完成时，生成目录
    isBlogRenderComplete() {
      if (this.isBlogRenderComplete) {
        this.initTocbot()
      }
    }
  },
  mounted() {
    // 有可能组件创建比较慢，文章渲染已经完成，watch的时候，isBlogRenderComplete已经是true，监听不到 isBlogRenderComplete 的改变，也就不会执行watch中的方法
    // 就需要在 mounted 中init
    if (window.document.querySelector('.js-toc-content')) {
      this.initTocbot()
    }
  },
  methods: {
    initTocbot() {
      tocbot.init({
        // Where to render the table of contents.
        tocSelector: '.js-toc',
        // Where to grab the headings to build the table of contents.
        contentSelector: '.js-toc-content',
        // Which headings to grab inside of the contentSelector element.
        headingSelector: 'h1,h2,h3,h4,h5,h6',
        // Element to add the positionFixedClass to.
        positionFixedSelector: null,
        // Smooth scrolling enabled.
        scrollSmooth: true,
        // Smooth scroll duration.
        scrollSmoothDuration: 420,
      })
    }
  },
}
</script>

<style scoped>

>>> .el-card__body {
  padding: 0;
}

.el-card {
  border: 1px solid var(--color-border);
}

.el-card.is-hover-shadow:hover {
  box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, .3)
}

.toc-header {
  background-color: var(--color-base);
  display: flex;
  align-items: center;
}

.toc-header svg {
  margin: 17px 10px 15px 20px;
}

.toc-header span {
  display: block;
}

.el-divider--horizontal {
  height: 2px;
  margin: 0 0 20px;
}

.js-toc {
  margin-bottom: 20px;
}

.js-toc >>> a {
  color: #24292F;
  opacity: .7;
  display: block;
  padding: 4px 0;
}

>>> ol.toc-list {
  padding-left: 30px;
  padding-right: 5px;
}

>>> a.is-active-link {
  transition: all .3s ease-in-out;
  color: #003d74;
  opacity: 1;
  font-weight: 700;
}

>>> .is-collapsed {
  transition: all .3s ease-in-out;
  display: none;
  max-height: 0;
}
</style>