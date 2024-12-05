import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/index.js'
/*
* createRouter 创建路由实例
  配置 history 模式
    1.history模式:createWebHistory 地址栏不带 #
    2.hash模式:createWebHashHistory 地址栏带 #
      console.log(import.meta.env.DEV)I
    vite 中的环境变量 import.meta.env.BASE_URL就是 vite.config.js 中的 base 配置项*/
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   redirect: '/login',  // 重定向路由 默认跳转的路径
    // },
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue'),
    }, // 登录页 一级路由
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'), // 架子 一级路由
      redirect: '/article/channel', // 重定向路由 默认跳转的路径
      // 二级路由配置  测试访问路径: http://localhost:5174/xiao/article/channel
      children: [
        {
          // 文章管理
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue'),
        },
        {
          // 频道管理
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue'),
        },
        {
          // 个人详情
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue'),
        },
        {
          // 更换头像
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue'),
        },
        {
          // 忘记密码
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue'),
        },
      ],
    },
  ],
})

/* 登录访问拦截 => 默认是直接放行的,根据返回值决定,是放行还是拦截
   返回值:
    1.undefined/true 直接放行
    2.false 拦回from的地址页面
    3.具体路径或路径对象拦截到对应的地址 '/login' {name:'login'}
*/
// 登录访问拦截
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') {
    return '/login'
  }
  return true
})

export default router
