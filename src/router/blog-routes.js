export default [
  {
    path: '',
    redirect: {
      name: 'BlogList'
    }
  },
  {
    path: 'BlogList',
    name: 'BlogList',
    component: resolve => require(['@/views/BlogList.vue'], resolve),
    meta: {
      title: '博客'
    }
  },
  {
    path: 'BlogDetail/:number',
    name: 'BlogDetail',
    component: resolve => require(['@/views/BlogDetail.vue'], resolve),
    meta: {
      title: '文章'
    }
  }
]
