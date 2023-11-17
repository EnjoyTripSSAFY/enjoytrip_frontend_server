import TripInfoSharingView from '@/views/TripInfoSharingView.vue'
import TripInfoSharingList from '@/components/tripInfoSharing/tripInfoSharingList.vue'

const tripInfoSharingRouter = [
  {
    path: '/tripInfoSharing',
    name: 'tripInfoSharing',
    component: TripInfoSharingView,
    redirect: { name: 'tripInfoSharing-list' },
    children: [
      {
        path: 'list',
        name: 'tripInfoSharing-list',
        component: TripInfoSharingList
      },
      {
        path: 'view/:articleno',
        name: 'tripInfoSharing-view',
        props : true,
        component: () => import('@/components/tripInfoSharing/tripInfoSharingDetail.vue')
      },
      {
        path: 'write',
        name: 'tripInfoSharing-write',
        component: () => import('@/components/tripInfoSharing/tripInfoSharingWrite.vue')
      },
      {
        path: 'modify/:articleno',
        name: 'tripInfoSharing-modify',
        props : true,
        component: () => import('@/components/tripInfoSharing/tripInfoSharingModify.vue')
      }
    ]
  }
]

export default tripInfoSharingRouter
