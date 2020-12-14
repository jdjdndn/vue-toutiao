import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  {
    path: '/',
    // name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      { path: '', name: 'home', component: () => import('@/views/home') },
      {
        path: '/artical',
        name: 'artical',
        component: () => import('@/views/artical'),
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
      },
      { path: '/my', name: 'my', component: () => import('@/views/my') },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
