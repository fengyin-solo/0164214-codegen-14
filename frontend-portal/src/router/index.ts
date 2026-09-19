import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/about/index.vue'),
    meta: { title: '关于我们' }
  },
  {
    path: '/about/reviews/:id',
    name: 'ReviewDetail',
    component: () => import('@/views/about/review-detail.vue'),
    meta: { title: '客户评价详情' }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('@/views/news/index.vue'),
    meta: { title: '新闻中心' }
  },
  {
    path: '/news/:id',
    name: 'NewsDetail',
    component: () => import('@/views/news/detail.vue'),
    meta: { title: '新闻详情' }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/products/index.vue'),
    meta: { title: '产品服务' }
  },
  {
    path: '/cases',
    name: 'Cases',
    component: () => import('@/views/cases/index.vue'),
    meta: { title: '服务案例' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/contact/index.vue'),
    meta: { title: '联系我们' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: { title: '页面未找到' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    // 浏览器前进/后退时恢复到原位置（如从评价详情返回专区）
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80
      }
    }
    return { top: 0 }
  }
})

router.beforeEach((to, _from, next) => {
  const title = to.meta.title as string
  document.title = title ? `${title} - 门户网站` : '门户网站'
  next()
})

export default router
