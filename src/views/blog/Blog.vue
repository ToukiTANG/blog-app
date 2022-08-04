<template>
  <div class="blog">
    <div class="blog-top" v-if="blog.weight===1">
      <font-awesome-icon icon="fa-solid fa-circle-up" size="lg"></font-awesome-icon>
    </div>
    <el-card shadow="always" :body-style="{ padding: '0 16px 16px' }">
      <div class="blog-header">
        <!--标题-->
        <div class="blog-title">
          <h2>
            <a href="#">{{ blog.title }}</a>
          </h2>
        </div>
        <!--简略信息图标-->
        <div class="blog-info">
          <div class="info-item">
            <div class="info-time">
              <font-awesome-icon icon="fa-solid fa-calendar-days" size="xs"></font-awesome-icon>
              <span>{{
                  blog.updateTime | timeToNow
                }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-views">
              <font-awesome-icon icon="fa-solid fa-eye" size="xs"></font-awesome-icon>
              <span>{{ blog.views }}</span></div>
          </div>
          <div class="info-item">
            <div class="info-focus">
              <el-tooltip content="点击切换专注模式" placement="top">
                <font-awesome-icon icon="fa-solid fa-book" size="xs"></font-awesome-icon>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <!--这里加一个判断，否则异步渲染会报警告-->
      <div class="category-tag" v-if="blog.category">
        <router-link :to="`/category/${blog.category.categoryName}`">
          <font-awesome-icon icon="fa-solid fa-folder-open" size="sm"></font-awesome-icon>
          {{ blog.category.categoryName }}
        </router-link>
      </div>
      <!--正文-->
      <div class="blog-content">
        <div class="typo js-toc-content match-braces rainbow-braces" v-html="blog.content"></div>
      </div>
      <el-divider></el-divider>
      <!--标签-->
      <div class="blog-footer">
        <el-tag v-for="t in blog.tags" :key="t.id" :class="colorObj[Math.round(Math.random()*4)]">
          <router-link :to="`/tag/${t.tagName}`">{{ t.tagName }}</router-link>
        </el-tag>
      </div>
    </el-card>
    <div class="blog-msg">
      <ul class="msg-list">
        <li>作者：Touki</li>
        <li>发表时间：{{ blog.createTime|timeFormat }}</li>
        <li>最后编辑：{{ blog.updateTime|timeFormat }}</li>
        <li>本作品采用<a href="http://creativecommons.org/licenses/by/4.0/" target="_blank">署名4.0国际(CC BY 4
          .0)</a>进行许可。可自由转载引用，并允许商业性使用，但需署名作者且注明出处。
        </li>
      </ul>
    </div>
    <div class="blog-comment">
      <h3>评论已关闭</h3>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {getBlog} from "@/api/blog";
import {Message} from "element-ui";
import {SET_FOCUS_MODE, SET_IS_BLOG_RENDER_COMPLETE} from "@/store/mutation-types";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Blog",
  components: {},
  data() {
    return {
      blog:
          {
            // id: 1,
            // title: "测试标题",
            // createTime: "2022-07-09T07:40:35.000+00:00",
            // updateTime: "2022-07-14T07:15:45.000+00:00",
            // weight: 1,
            // views: 10,
            // content: "<h3 id=\"date的转换问题\">Date的转换问题</h3>\n<hr />\n<h4 id=\"获取当前时间\">获取当前时间</h4>\n<pre><code class=\"language-java\">Calendar calendar = Calendar.getInstance();\nDate currentTime = calendar.getTime()\n</code></pre>\n<h4 id=\"将-javautildate-格式转换成-string-格式\">将 java.util.Date 格式转换成 String 格式</h4>\n<pre><code class=\"language-java\">Date date = new Date();  // 获取当前系统时间\nSimpleDateFormat simpleDateFormat = new SimpleDateFormat(&quot;yyyy-MM-dd HH:mm:ss&quot;);  // 设置日期格式\nString strTime = simpleDateFormat.format(date);  // 格式转换\nSystem.out.println(strTime); \n</code></pre>\n<h4 id=\"将-javautildate-格式转换成-javasqldate-格式\">将 java.util.Date 格式转换成 java.sql.Date 格式</h4>\n<pre><code class=\"language-java\">Date date = new Date();\nlong longTime = date.getTime();\njava.sql.Date sDate = new java.sql.Date(longTime);\nSystem.out.println(sDate);\n</code></pre>\n<h4 id=\"将-javautildate-格式转换成-timestamp-格式\">将 java.util.Date 格式转换成 Timestamp 格式</h4>\n<pre><code class=\"language-java\">Date date = new Date();\nTimestamp timestamp = new Timestamp(date.getTime());\nSystem.out.println(timestamp);\n</code></pre>\n<h4 id=\"将-string-格式转换成-javautildate-格式\">将 String 格式转换成 java.util.Date 格式</h4>\n<pre><code class=\"language-java\">\nString strTime = &quot;2019-06-10 17:32:05&quot;;\nSimpleDateFormat simpleDateFormat = new SimpleDateFormat(&quot;yyyy-MM-dd HH:mm:ss&quot;);\nDate date = null;\ntry {\n    date = simpleDateFormat.parse(strTime);\n} catch (ParseException e) {\n    e.printStackTrace();\n}\nSystem.out.println(date);\n</code></pre>\n<h3 id=\"string\">String</h3>\n<hr />\n<h4 id=\"stringstringbufferstringbuilder\">String、StringBuffer、StringBuilder</h4>\n<ul>\n<li>\n<p>底层</p>\n<ul>\n<li>三者底层都是用<code>char[]</code>数组储存数据（<code>JDK9</code>之后采用<code>byte[]</code>数组储存）</li>\n</ul>\n</li>\n<li>\n<p>线程安全</p>\n<ul>\n<li><code>StringBuff</code>是线程非安全的，<code>StringBuilder</code>是线程安全的</li>\n</ul>\n</li>\n<li>\n<p>容量与扩容</p>\n<ul>\n<li><strong>初始容量</strong>：<code>StringBuffer</code>与<code>StringBuilder</code>的初始<code>char[]</code>容量均为16（<strong>实际上</strong>如果使用<code>new StringBuffer(&quot;test&quot;)</code>等方式创建，容量会是<code>length(&quot;test&quot;)+16</code>），</li>\n<li><strong>扩容</strong>：扩容时（如进行<code>append()</code>操作时）将原容量翻倍并加2与新容量比较，取较大的容量为最终的新容量（期间还会防止OOM），扩容代码如下：</li>\n</ul>\n</li>\n</ul>\n<pre><code class=\"language-java\">private int newCapacity(int minCapacity) {\n    // overflow-conscious code\n    int newCapacity = (value.length &lt;&lt; 1) + 2;\n    if (newCapacity - minCapacity &lt; 0) {\n        newCapacity = minCapacity;\n    }\n    return (newCapacity &lt;= 0 || MAX_ARRAY_SIZE - newCapacity &lt; 0)\n        ? hugeCapacity(minCapacity)\n        : newCapacity;\n}\n</code></pre>\n<h4 id=\"string与一些常用类型间的转化\">String与一些常用类型间的转化</h4>\n<h5 id=\"string与int\">String与Int</h5>\n<pre><code class=\"language-java\">//String转int，这里其实涉及拆装箱\nString str1 = &quot;123&quot;;\nint num1 = Integer.parseInt(str1);\n//int转String\nint num2 = 123;\nString str2 = String.valueOf(num2);\n</code></pre>\n<h5 id=\"string与char\">String与char[]</h5>\n<pre><code class=\"language-java\">//String转char[]\nString str1 = &quot;hello&quot;;\nchar[] char1 = str1.toCharArray();\n//char[]转String\nchar[] char2 = new char[]{'h','e','l','l','o'};\nString str2 = new String(char2);\n</code></pre>\n<h5 id=\"string与byte\">String与byte[]</h5>\n<pre><code class=\"language-java\">//String转byte[]\nString str1 = &quot;abc123&quot;;\nbyte[] bytes1 =str1.getBytes();//[97, 98, 99, 49, 50, 51]\n//byte[]转String\nString str2 = new String(bytes1);\n</code></pre>\n<h4 id=\"string不变性的理解\">String不变性的理解</h4>\n<h5 id=\"string不可变的原因\">String不可变的原因</h5>\n<ul>\n<li>String类的成员变量如下(JDK1.8)</li>\n</ul>\n<pre><code class=\"language-java\">public final class String\n    implements java.io.Serializable, Comparable&lt;String&gt;, CharSequence {\n    /** The value is used for character storage. */\n    private final char value[];\n\n    /** Cache the hash code for the string */\n    private int hash; // Default to 0\n\n    /** use serialVersionUID from JDK 1.0.2 for interoperability */\n    private static final long serialVersionUID = -6849794470754667710L;\n\n    /**\n     * Class String is special cased within the Serialization Stream Protocol.\n     *\n     * A String instance is written into an ObjectOutputStream according to\n     * &lt;a href=&quot;{@docRoot}/../platform/serialization/spec/output.html&quot;&gt;\n     * Object Serialization Specification, Section 6.2, &quot;Stream Elements&quot;&lt;/a&gt;\n     */\n    private static final ObjectStreamField[] serialPersistentFields =\n        new ObjectStreamField[0];\n}\n</code></pre>\n<ul>\n<li>\n<p>其中最主要的是<code>value[]</code>字符数组和<code>hash</code>标记，<code>serialVersionUID</code>与<code>serialPersistentFields</code>为序列化相关变量</p>\n</li>\n<li>\n<p>因此String不可变的==原因一==：保存字符串的<code>value[]</code>数组被<code>final</code>修饰并被设置为私有的，另一方面String类并没有暴露/提供修改这个字符串的方法。</p>\n</li>\n<li>\n<p>==原因二==：String类被<code>final</code>修饰导致其不能被继承，杜绝了子类的破坏。</p>\n<ul>\n<li>==注意==，在Java9之后、String、StringBuild与StringBuffer的使用改为使用**<code>byte[]</code>数组**存储字符串。至于原因，是因为新的String支持的编码方案的原因，这里不必深究。</li>\n</ul>\n</li>\n</ul>\n<h5 id=\"string真的不可变吗\">String真的“不可变”吗？</h5>\n<ul>\n<li>有时候会出现以下的迷惑问题</li>\n</ul>\n<pre><code class=\"language-java\">String s = &quot;ABCabc&quot;;\nSystem.out.println(&quot;s = &quot; + s);\n//s=ABCabc\ns = &quot;123456&quot;;\nSystem.out.println(&quot;s = &quot; + s);\n//s=123456\n</code></pre>\n<ul>\n<li>\n<p>乍一看，字符串<code>s</code>确实被改变了。但事实上，这里的<code>s</code>仅仅是字符串对象的一个引用，最终改变的仅仅是<code>s</code>的引用值而已。</p>\n</li>\n<li>\n<p>相同的，以下示例</p>\n</li>\n</ul>\n<pre><code class=\"language-java\">String a = &quot;ABCabc&quot;;\nSystem.out.println(&quot;a = &quot; + a);\n//a=ABCabc\na = a.replace('A', 'a');\nSystem.out.println(&quot;a = &quot; + a);\n//a=aBCabc\n</code></pre>\n<ul>\n<li>原因同上，仅仅是引用改变了，==注意替代成功时返回的是一个新的字符串对象==</li>\n</ul>\n<pre><code class=\"language-java\">public String replace(char oldChar, char newChar) {\n    if (oldChar != newChar) {\n        int len = value.length;\n        int i = -1;\n        char[] val = value; /* avoid getfield opcode */\n\n        while (++i &lt; len) {\n            if (val[i] == oldChar) {\n                break;\n            }\n        }\n        if (i &lt; len) {\n            char buf[] = new char[len];\n            for (int j = 0; j &lt; i; j++) {\n                buf[j] = val[j];\n            }\n            while (i &lt; len) {\n                char c = val[i];\n                buf[i] = (c == oldChar) ? newChar : c;\n                i++;\n            }\n            return new String(buf, true); /* 返回了新的字符串对象 */\n        }\n    }\n    return this;\n}\n</code></pre>\n<ul>\n<li><strong>另一方面</strong>，如果我们能够访问到字符串的<code>value</code>变量，字符串就是==可以被改变的==！答案就是使用反射。</li>\n</ul>\n<pre><code class=\"language-java\">public static void testReflection() throws Exception {\n\t\t\n    //创建字符串&quot;Hello World&quot;， 并赋给引用s\n    String s = &quot;Hello World&quot;; \n\n    System.out.println(&quot;s = &quot; + s);\t//Hello World\n\n    //获取String类中的value字段\n    Field valueFieldOfString = String.class.getDeclaredField(&quot;value&quot;);\n\n    //改变value属性的访问权限\n    valueFieldOfString.setAccessible(true);\n\n    //获取s对象上的value属性的值\n    char[] value = (char[]) valueFieldOfString.get(s);\n\n    //改变value所引用的数组中的第5个字符\n    value[5] = '_';\n\n    System.out.println(&quot;s = &quot; + s);  //Hello_World\n}\n</code></pre>\n<ul>\n<li>总结：通常我们认为的字符串改变了仅仅是改变了引用值而已，字符串本身时不会改变的；但如果使用反射获取到字符串中的<code>value</code>变量，那么其实也是可以对字符串本身进行修改的。</li>\n</ul>\n",
            // category: {
            //   id: 1,
            //   categoryName: "随笔"
            // },
            // tags: [
            //   {
            //     id: 1,
            //     tagName: "SpringBoot"
            //   },
            //   {
            //     id: 2,
            //     tagName: "Java"
            //   },
            //   {
            //     id: 3,
            //     tagName: "Python"
            //   }]
          },
    }
  },
  computed: {
    ...mapState(["colorObj", "siteInfo"])
  },
  methods: {
    getBlog(id = this.$route.params.id) {
      getBlog(id).then((res) => {
        this.blog = res.data
        document.title = this.blog.title + this.siteInfo.webTitleSuffix
        //v-html渲染完成后再渲染代码块样式
        this.$nextTick(() => {
          Prism.highlightAll()
          //将文章渲染完成状态置为 true
          this.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, true)
        })
      }).catch(() => {
        Message({type: "error", message: "文章详情加载失败，请重试！", showClose: true})
      })
    }
  },
  created() {
    this.getBlog()
  },
  beforeRouteEnter(to, from, next) {
    //路由到博客文章页面之前，应将文章的渲染完成状态置为 false
    next(vm => {
      // 当 beforeRouteEnter 钩子执行前，组件实例尚未创建
      // vm 就是当前组件的实例，可以在 next 方法中把 vm 当做 this用
      vm.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, false)
    })
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(SET_FOCUS_MODE, false)
    // 从文章页面路由到其它页面时，销毁当前组件的同时，要销毁tocbot实例
    // 否则tocbot一直在监听页面滚动事件，而文章页面的锚点已经不存在了，会报"Uncaught TypeError: Cannot read property 'className' of null"
    tocbot.destroy()
    next()
  },
  beforeRouteUpdate(to, from, next) {
    //当在文章页面跳转到其他文章页面时应该重新获取文章
    if (to.path !== from.path) {
      this.$store.commit(SET_FOCUS_MODE, false)
      this.getBlog(to.params.id)
      //只要路由路径有改变，且停留在当前Blog组件内，就把文章的渲染完成状态置为 false
      this.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, false)
      next()
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.el-card {
  padding: 25px 20px 0;
  /*margin-bottom: 30px;*/
  border: 1px solid var(--color-border);
  overflow: visible;
  border-radius: 4px 4px 0 0;
}

.blog-title {
  margin-bottom: 20px;
}

.blog-title h2 {
  text-align: center;
}

.blog-title h2 a {
  color: #333333;
}

.blog-top {
  width: 0;
  height: 0;
  float: right;
  position: relative;
}

.blog-top:after {
  content: "";
  float: right;
  position: relative;
  border-right: solid 30px #db2828;
  border-top: solid 30px #db2828;
  border-left: solid 30px transparent;
  border-bottom: solid 30px transparent;
}

.blog-top svg {
  color: white;
  float: right;
  position: relative;
  top: 10px;
  right: 7px;
  z-index: 1;
}

.blog-info {
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-item {
  margin: 0 10px;
  display: inline-block;
  line-height: 100%;
}

.info-item span {
  margin-left: 5px;
}

.info-time {
  color: #4182a4;
}

.info-views {
  color: #2a6e3f;
}

.info-font-size, .info-focus {
  cursor: pointer;
  color: #999999;
}

.info-font-size:hover, .info-focus:hover {
  color: #303133;
}

.category-tag {
  width: 100px;
  height: 35px;
  border-radius: 0 5px 5px 0;
  background-color: #db9b34;
  position: relative;
  left: -62px;
}

.category-tag:after {
  content: "";
  border-style: solid;
  border-width: 0 25px 25px 0;
  border-right-color: #c67915;
  border-top-color: #c67915;
  border-left-color: transparent;
  border-bottom-color: transparent;
  position: absolute;
  top: 100%;
  right: 75%;
}

.category-tag a {
  display: block;
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 6px 0 6px;
  color: var(--color-white);
}

.blog-footer {
  margin: 0 0 8px;
}

.blog-footer .el-tag {
  margin-left: 6px;
  color: #206864;
  border-color: #206864d4;
  background-color: #2068641f;
}

.blog-footer .el-tag:hover {
  transition: .2s;
  background-color: #2068644C;
}

.blog-footer .el-tag:hover {
  transition: .2s;
  /*background-color: #2068644C;*/
}

.blog-footer .el-tag.blue {
  color: #4994c4;
  border-color: #4994c4;
  background-color: #4994c41f;
}

.blog-footer .el-tag.blue:hover {
  background-color: #4994c44c;
}

.blog-footer .el-tag.dark {
  color: #31322c;
  border-color: #31322c;
  background-color: #31322c1f;
}

.blog-footer .el-tag.dark:hover {
  background-color: #31322c4c;
}

.blog-footer .el-tag.green {
  color: #5d7259;
  border-color: #5d7259;
  background-color: #5d72591f;
}

.blog-footer .el-tag.green:hover {
  background-color: #5d72594c;
}

.blog-footer .el-tag.red {
  color: #b13b2e;
  border-color: #b13b2e;
  background-color: #b13b2e1f;
}

.blog-footer .el-tag.red:hover {
  background-color: #b13b2e4c;
}

.blog-footer .el-tag.orange {
  color: #d9883d;
  border-color: #d9883d;
  background-color: #d9883d1f;
}

.blog-footer .el-tag.orange:hover {
  background-color: #d9883d4c;
}

.blog-footer span .el-tag .el-tag-light {
  padding: 0 10px;
}

.blog-footer .el-tag a {
  color: inherit;
  display: inline-block;
  height: 100%;
  width: 100%;
}

.blog-msg {
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border: 1px solid var(--color-border);
  border-top: none;
  border-bottom: none;
  /*border-radius: 0 0 4px 4px;*/
  /*margin-bottom: 30px;*/
  background-color: #fcfff5;
}

.blog-msg a {
  color: #0366d6;
}

ul.msg-list {
  margin-left: 20px;
  line-height: 1.5;
  color: #4c7d4b;
}

.blog-comment {
  margin-bottom: 20px;
  background-color: white;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border: 1px solid var(--color-border);
  border-top: 2px solid #00b5ad;
  border-radius: 0 0 4px 4px;
}
</style>