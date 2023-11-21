import MyPlanList from '@/components/myPlan/MyPlanList.vue'

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
        component: MyPlanList
      },
      {
        path: 'detail/:tripPlanNo',
        name: 'myPlan-detail',
        component: () => import('@/components/myPlan/MyPlanDetail.vue')
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
