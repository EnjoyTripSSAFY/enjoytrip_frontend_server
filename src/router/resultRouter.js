const resultRouter = [
  {
    path: '/403page',
    name: '403page',
    component: () => import('@/components/common/result/403page.vue')
  },
  {
    path: '/updatePage',
    name: 'updatePage',
    component: () => import('@/components/common/result/UpdatePage.vue')
  }
]

export default resultRouter
