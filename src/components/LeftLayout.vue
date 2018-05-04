<template>
  <!-- 最外层套一层 div 避免 gitHubUser 还未加载完时，右侧占满整个浏览器 -->
  <div>
      <div class="left-layout-container pc">
        <div class="user-info">
          <!-- <a href="http://x-style.github.io/"><img v-if="gitHubUser" @click="home" :src="gitHubUser.avatar_url"></a> -->
          <a href="http://x-style.github.io/"><img v-if="gitHubUser" @click="home" src="/static/img/avatar.jpg"></a>
          <div v-if="gitHubUser" class="login-name"><a href="http://x-style.github.io/">{{gitHubUser.login}}</a></div>
          <div v-if="gitHubUser">{{gitHubUser.bio}}</div>
        </div>
        <ul class="other-site">
          <li v-for="site in thirdPartySite" :key="site.url" @click="openThirdPartySite(site.url)">
            <span>
              <img :src="site.img" />
              <img :src="site.imghover" />
            </span>
          </li>
        </ul>
        <ul class="left-menu">
          <router-link :class="isIndex ? 'selected-menu':''" tag="li" :to="{name: 'Index'}" title="首页"><span>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页<i>HOME</i></span></router-link>
          <router-link :class="isBlog ? 'selected-menu':''" tag="li" :to="{name: 'BlogList'}" title="博客"><span>博&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客<i>BLOG</i></span></router-link>
          <router-link :class="isTool ? 'selected-menu':''" tag="li" :to="{name: 'Tool'}" title="前端工具"><span>前端工具<i>TOOL</i></span></router-link>
          <router-link :class="isWebNav ? 'selected-menu':''" tag="li" :to="{name: 'WebNav'}" title="网址导航"><span>网址导航<i>WEBNAV</i></span></router-link>
          <router-link :class="isAboutMe ? 'selected-menu':''" tag="li" :to="{name: 'AboutMe'}" title="关于我"><span>关&nbsp;&nbsp;于&nbsp;&nbsp;我<i>ABOUT</i></span></router-link>
        </ul>
        <div v-if="showQQGroup" class="qq-group">
          <img src="/static/img/qq-group.jpg">
        </div>
        <div class="copyright">
          <span>{{recordNumber}}</span>
          <span>@ {{copyright}}</span>
        </div>
      </div>
      <!-- 移动端 -->
      <div class="navbar">
        <nav>
          <!--左侧图标-->
          <a class="return" @click="toggleMenu()">
            <i class="icon-directory"/>
          </a>
          <!--标题-->
          <!-- <h1 class="nav_title"><p>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</p></h1> -->
          <h1 class="nav_title">
            <p>
              {{isIndex ? '首页' : '' }}
              {{isBlog ? '博客' : '' }}
              {{isTool ? '前端工具' : '' }}
              {{isWebNav ? '网址导航' : '' }}
              {{isAboutMe ? '关于我' : '' }}
            </p>
          </h1>


          <!--右侧图标-->
          <!-- <div class="nav_r">
            <a href="javascript:;">
              <i class="icon-search" />
            </a>
          </div> -->
        </nav>
      </div>
      <div class="left-user">
        <transition name="slide-fade">
        <div class="left-layout-container" v-if="showMenu">
          <div class="user-info">
            <!-- <a href="http://x-style.github.io/"><img v-if="gitHubUser" @click="home" :src="gitHubUser.avatar_url"></a> -->
            <a href="http://x-style.github.io/"><img v-if="gitHubUser" @click="home" src="/static/img/avatar.jpg"></a>
            <div v-if="gitHubUser" class="login-name"><a href="http://x-style.github.io/">{{gitHubUser.login}}</a></div>
          </div>
          <ul class="other-site">
            <li v-for="site in thirdPartySite" :key="site.url" @click="openThirdPartySite(site.url)">
              <img :src="site.img" :data-src="site.imghover" />
            </li>
          </ul>
          <ul class="left-menu">
            <router-link :class="isIndex ? 'selected-menu':''" tag="li" :to="{name: 'Index'}" @click.native="toggleMenu()" title="首页"><span>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页<i>HOME</i></span></router-link>
            <router-link :class="isBlog ? 'selected-menu':''" tag="li" :to="{name: 'BlogList'}" @click.native="toggleMenu()" title="博客"><span>博&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客<i>BLOG</i></span></router-link>
            <router-link :class="isTool ? 'selected-menu':''" tag="li" :to="{name: 'Tool'}" @click.native="toggleMenu()" title="前端工具"><span>前端工具<i>TOOL</i></span></router-link>
            <router-link :class="isWebNav ? 'selected-menu':''" tag="li" :to="{name: 'WebNav'}" @click.native="toggleMenu()" title="网址导航"><span>网址导航<i>WEBNAV</i></span></router-link>
            <router-link :class="isAboutMe ? 'selected-menu':''" tag="li" :to="{name: 'AboutMe'}" @click.native="toggleMenu()" title="关于我"><span>关&nbsp;&nbsp;于&nbsp;&nbsp;我<i>ABOUT</i></span></router-link>
          </ul>
          <div class="copyright">@ {{copyright}}</div>
        </div>
        </transition>
        <transition name="fade">
          <div class="left-layout-bg" v-if="showMenu" @click="toggleMenu()"></div>
        </transition>
      </div>
  </div>
</template>
<style lang="scss" scoped>
    .slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  left: -15rem;
  opacity: 0;
}
.fade-enter-active {
  transition: all .5s ease;
}
.fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        showMenu: false
      }
    },
    computed: {
      ...mapGetters([
        'copyright',
        'recordNumber',
        'gitHubUser',
        'showQQGroup',
        'thirdPartySite'
      ]),
      isIndex () {
        return this.$route.name === 'Index'
      },
      isBlog () {
        return this.$route.name && this.$route.name.startsWith('Blog')
      },
      isWebNav () {
        return this.$route.name === 'WebNav'
      },
      isTool () {
        return this.$route.name === 'Tool'
      },
      isAboutMe () {
        return this.$route.name === 'AboutMe'
      }
    },
    methods: {
      home () {
        this.$router.push('/')
      },
      openThirdPartySite (url) {
        window.open(url)
      },
      toggleMenu () {
        this.showMenu = !this.showMenu
        console.log('222')
      }
    }
  }
</script>
