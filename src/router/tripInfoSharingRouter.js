import TripInfoSharingView from '@/views/TripInfoSharingView.vue'
import TripInfoSharingList from '@/components/tripInfoSharing/tripInfoSharingList.vue'

const requireAuth = () => (to, from, next) => {
  if (sessionStorage.getItem('access-token') !== null) {
    return next()
  }
  next('/403page')
}

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
        props: true,
        component: () => import('@/components/tripInfoSharing/tripInfoSharingDetail.vue'),
        beforeEnter: requireAuth()
      },
      {
        path: 'write',
        name: 'tripInfoSharing-write',
        component: () => import('@/components/tripInfoSharing/tripInfoSharingWrite.vue'),
        beforeEnter: requireAuth()
      },
      {
        path: 'modify/:articleno',
        name: 'tripInfoSharing-modify',
        props: true,
        component: () => import('@/components/tripInfoSharing/tripInfoSharingModify.vue'),
        beforeEnter: requireAuth()
      }
    ]
  }
]

export default tripInfoSharingRouter
