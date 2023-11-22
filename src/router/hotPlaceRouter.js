import HotPlaceView from '@/views/HotPlaceView.vue'

const hotPlaceRouter = [
  {
    path: '/hotPlace',
    name: 'hotPlace',
    component: HotPlaceView,
    redirect: { name: 'hotPlace-list' },
    children: [
      {
        path: 'list',
        name: 'hotPlace-list',
        component: () => import('@/components/hotPlace/hotPlaceList.vue')
      },
      {
        path: 'view/:articleno',
        name: 'hotPlace-view',
        props : true,
        component: () => import('@/components/hotPlace/hotPlaceDetail.vue')
      },
      {
        path: 'write',
        name: 'hotPlace-write',
        component: () => import('@/components/hotPlace/hotPlaceWrite.vue')
      },
      {
        path: 'modify/:articleno',
        name: 'hotPlace-modify',
        props : true,
        component: () => import('@/components/hotPlace/hotPlaceModify.vue')
      }
    ]
  }
]

export default hotPlaceRouter
