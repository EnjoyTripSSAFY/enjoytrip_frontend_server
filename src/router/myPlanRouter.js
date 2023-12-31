import MyPlanList from '@/components/myPlan/MyPlanList.vue'

import TripInfoSharingView from '@/views/TripInfoSharingView.vue'
import TripInfoSharingList from '@/components/tripInfoSharing/tripInfoSharingList.vue'

const requireAuth = () => (to, from, next) => {
  if (sessionStorage.getItem('access-token') !== null) {
    return next()
  }
  next('/403page')
}

const myPlanRouter = [
  {
    path: '/myPlan',
    name: 'myPlan',
    component: () => import('@/views/MyPlanView.vue'),
    redirect: { name: 'myPlan-list' },
    children: [
      {
        path: 'list',
        name: 'myPlan-list',
        // component: MyPlanList
        component: () => import('@/components/myPlan/MyPlanList.vue'),
        beforeEnter: requireAuth()
      },
      {
        path: 'detail/:tripPlanNo',
        name: 'myPlan-detail',
        component: () => import('@/components/myPlan/MyPlanDetail.vue'),
        beforeEnter: requireAuth()
      }
      // {
      //   path: 'write',
      //   name: 'tripInfoSharing-write',
      //   component: () => import('@/components/tripInfoSharing/tripInfoSharingWrite.vue')
      // },
      // {
      //   path: 'modify/:articleno',
      //   name: 'tripInfoSharing-modify',
      //   component: () => import('@/components/tripInfoSharing/tripInfoSharingModify.vue')
      // }
    ]
  }
]

export default myPlanRouter
