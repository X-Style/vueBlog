<template>
  <div class="index-container">
    <!-- <ul class="label-list index-list" >
      <li v-for="(nav,index) in navs" 
          v-bind:class="{active:(indexs==index)}" 
          v-on:click="a(index)" >
        <a href="javascript:;" class="tab-link button">{{ nav.message }}</a>
      </li>
    </ul> -->
    <div class="index-info-container">
      <div class="index-info">
        <h1>WEB前端开发</h1>
        <h2>— 专注前端开发，关注用户体验 —</h2>
      </div>
      <div class="times">
        <span>{{ date }}</span>
        <span>{{ times }}</span>
        <span>{{ week }}</span>
      </div>
      <!-- 粒子 Bef -->
      <vue-particles class="particles"
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
      <!-- 粒子 End -->
      <!-- <canvas id="particle" class="particle">Your Browser does not support Canvas, please upgrade</canvas>
      <remote-js src="/static/js/particle.js"></remote-js> -->
    </div>
    <!-- 友情链接 -->
    <ul class="friendly-link">
      <li>友情链接：</li>
      <li v-for="site in friendlylink" :key="site.url" @click="openfriendlylink(site.url)">{{site.name}}</li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        times: '',
        date: '',
        week: '',
        clock: null
      }
    },
    computed: {
      ...mapGetters([
        'friendlylink'
      ])
    },
    methods: {
      openfriendlylink (url) {
        window.open(url)
      }
    },
    components: {
    },
    mounted () {
      function checkTmie (num) {
        return num < 10 ? '0' + num : num
      }
      function checkWeek (date) {
        var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        return weeks[date]
      }
      this.clock = setInterval(() => {
        const myDate = new Date()
        this.date = checkTmie(myDate.getFullYear()) + '-' + checkTmie(myDate.getMonth() + 1) + '-' + checkTmie(myDate.getDate())
        this.times = checkTmie(myDate.getHours()) + ':' + checkTmie(myDate.getMinutes()) + ':' + checkTmie(myDate.getSeconds())
        this.week = checkWeek(new Date(myDate).getDay())
      }, 1000)
    },
    beforeDestroy () {
      // 清除定时器
      window.clearInterval(this.clock)
    }
  }
</script>
