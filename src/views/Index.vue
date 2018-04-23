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
      <div>
        <h1>WEB前端开发</h1>
        <h2>— 专注前端开发，关注用户体验 —</h2>
      </div>
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
    }
  }
</script>
