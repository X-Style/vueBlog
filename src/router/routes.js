import blogRoutes from './blog-routes'
/**
 * 路由表配置
 */
export default [
  {
    name: 'Index',
    path: '/Index',
    component: resolve => require.ensure([], () => resolve(require('@/views/Index.vue')), 'Index'),
    meta: {
      title: '首页'
    }
  },
  {
    name: 'AboutMe',
    path: '/AboutMe',
    component: resolve => require.ensure([], () => resolve(require('@/views/AboutMe.vue')), 'AboutMe'),
    meta: {
      title: '关于'
    }
  },
  {
    name: 'WebNav',
    path: '/WebNav',
    component: resolve => require.ensure([], () => resolve(require('@/views/WebNav.vue')), 'WebNav'),
    meta: {
      title: '网址导航'
    }
  },
  {
    name: 'Tool',
    path: '/Tool',
    component: resolve => require.ensure([], () => resolve(require('@/views/Tool.vue')), 'Tool'),
    meta: {
      title: '前端工具'
    }
  },
  {
    path: '/Blog',
    component: resolve => require.ensure([], () => resolve(require('@/views/Blog.vue')), 'Blog'),
    meta: {
      title: '博客'
    },
    children: blogRoutes
  },
  {
    path: '*',
    redirect: '/Index'
  }
]
