<!-- <template>
  <div class="blog-container">
    <router-view/>
  </div>
</template>
<script>

  export default {
    components: {
    }
  }
</script>
 -->
<template>
  <div class="blog-container">
  <ul class="label-list tool-list" >
    <li v-for="(nav,index) in navs" 
        v-bind:class="{active:(indexs==index)}" 
        v-on:click="a(index)" >
      <a href="javascript:void(0)" class="tab-link button" > {{ nav.message }}</a>
    </li>
  </ul>
  <div class="blog-list-container">
    <div class="tool about-me bga-back-top">
      <div class="tool-box" 
           v-for="(content, index) in contents" 
           v-if="indexs == index">
        <div class="tool-container" v-for="wnlift in content.weba">
          <div class="tool-l"><span>{{wnlift.title}}</span></div>
          <div class="tool-r">
            <a :href="'' + item.http " target="_blank" v-for="item in wnlift.webs">
              {{item.name}}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        navs: [
          { message: '前端工具' }
        ],
        contents: [
          {
            weba: [
              {
                title: 'CSS3动画',
                webs: [
                  { http: '/tool/animate.css', name: 'Animate.css' }
                ]
              },
              {
                title: '前端Js框架',
                webs: [
                  { http: '/tool/zeptojs', name: 'Zepto.js' },
                  { http: 'http://nodejs.cn/api/', name: 'Node.js' },
                  { http: 'http://www.angularjs.net.cn/', name: 'AngularJS' },
                  { http: 'https://cn.vuejs.org/v2/api/', name: 'Vue.js' },
                  { http: 'https://reactjs.org/', name: 'React' },
                  { http: 'http://m.sui.taobao.org', name: 'SUI Mobile' },
                  { http: 'http://www.w3school.com.cn/jquerymobile/', name: 'jQuery Mobile' },
                  { http: 'http://www.requirejs.cn/', name: 'RequireJS' }
                ]
              }
            ]
          }
        ],
        indexs: 0,
        a: function (str) {
          this.indexs = str
        }
      }
    },
    components: {
    }
  }
</script>
