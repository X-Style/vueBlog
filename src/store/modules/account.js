import { makeAction } from '../util'

const SET_GITHUB_USER = 'SET_GITHUB_USER'
const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'
const SET_TOKEN_USER = 'SET_TOKEN_USER'
const LS_KEY_ACCESS_TOKEN = 'LS_KEY_ACCESS_TOKEN'

const state = {
  accessToken: localStorage.getItem(LS_KEY_ACCESS_TOKEN),  // 这个不要修改，这个不要修改，这个不要修改。当前登录用户的 GitHub AccessToken
  auth: {
    proxy: 'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token', // 这个不要修改，这个不要修改，这个不要修改。
    clientID: '303e2727217a26346d74',   // 改成你在 https://github.com/settings/applications/new 新建的 OAuth application 的 Client ID
    clientSecret: 'fa51f6fa0939842347f7f93245064234fa97137f'  // 改成你在 https://github.com/settings/applications/new 新建的 OAuth application 的 Client Secret
  },
  gitHubUser: null,  // 这个不要修改，这个不要修改，这个不要修改。
  gitHubUsername: 'X-Style',  // 修改成你自己的 GitHub 账号
  copyright: '2017 - 2018',  // 修改成你自己的
  friendlylink: [
    {
      name: 'Jason',
      url: 'http://www.wangyangde.cn'
    },
    {
      name: '拿根针尖对麦芒',
      url: 'https://xnxy.github.io'
    },
    {
      name: '王权伟の博客',
      url: 'http://www.wangquanwei.com/'
    },
    {
      name: '杨晓平の博客',
      url: 'https://guyueyang.github.io/'
    }
  ],
  recordNumber: 'null',  // 修改成你自己的备案编号，如果没有备案的话就设置为 null
  repo: 'X-Style/X-Style.github.io',  // 记录 Issue 的仓库的全名「用户名/仓库名」
  pageSize: 10,  // 博客列表每页显示多少条博客
  showQQGroup: true,  // 如果要显示你自己的 QQ 群二维码图片的话这里配置成 true 并且替换「BGAIssueBlog-Web/static/img/qq-group.png」为你自己的 QQ 群二维码图片，否则配置成 false 即可
  thirdPartySite: [  // 配置你想在左上角展示的第三方站点信息
    {
      img: '/static/img/github.svg',  // 第三方站点图标，存放在「BGAIssueBlog-Web/static/img」目录中
      imghover: '/static/img/github-hover.svg',
      url: 'https://github.com/X-Style'  // 第三方站点的 url
    },
    {
      img: '/static/img/twitter.svg',  // 第三方站点图标，存放在「BGAIssueBlog-Web/static/img」目录中
      imghover: '/static/img/twitter-hover.svg',
      url: 'https://twitter.com/wangchongtech'  // 第三方站点的 url
    },
    {
      img: '/static/img/weibo.svg',  // 第三方站点图标，存放在「BGAIssueBlog-Web/static/img」目录中
      imghover: '/static/img/weibo-hover.svg',
      url: 'https://weibo.com/jasondesigner'  // 第三方站点的 url
    }
    // 如果还有其他站点需要显示，继续在这里追加
  ]
}

const mutations = {
  [SET_GITHUB_USER] (state, gitHubUser) {
    state.gitHubUser = gitHubUser
  },
  [SET_ACCESS_TOKEN] (state, accessToken) {
    state.accessToken = accessToken
    localStorage.setItem(LS_KEY_ACCESS_TOKEN, accessToken)
  },
  [SET_TOKEN_USER] (state, tokenUser) {
    state.tokenUser = tokenUser
  }
}

const actions = {
  setGitHubUser: makeAction(SET_GITHUB_USER),
  setAccessToken: makeAction(SET_ACCESS_TOKEN)
}

const getters = {
  gitHubUsername (state) {
    return state.gitHubUsername
  },
  copyright (state) {
    return `${state.copyright} ${state.gitHubUsername}`
  },
  recordNumber (state) {
    return state.recordNumber
  },
  repo (state) {
    return state.repo
  },
  gitHubUser (state) {
    return state.gitHubUser
  },
  showQQGroup (state) {
    return state.showQQGroup
  },
  thirdPartySite (state) {
    return state.thirdPartySite
  },
  friendlylink (state) {
    return state.friendlylink
  },
  pageSize (state) {
    return state.pageSize
  },
  auth (state) {
    return state.auth
  },
  accessToken (state) {
    return state.accessToken
  },
  loginLink (state) {
    const query = {
      client_id: state.auth.clientID,
      redirect_uri: location.href,
      scope: 'public_repo'
    }

    const queryString = Object.keys(query)
      .map(key => `${key}=${encodeURIComponent(query[key] || '')}`)
      .join('&')

    return `http://github.com/login/oauth/authorize?${queryString}`
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
