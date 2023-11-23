const requireAuth = () => (to, from, next) => {
  if (sessionStorage.getItem('access-token') !== null) {
    return next()
  }
  next('/403page')
}

const tripPlanRouter = [
  {
    path: '/tripPlan',
    name: 'tripPlan',
    component: () => import('@/views/TripPlanView.vue'),
    redirect: { name: 'plan-page1' },
    children: [
      {
        path: 'plan-page1',
        name: 'plan-page1',
        component: () => import('@/components/trip-plan/PlanPage1.vue'),
        beforeEnter: requireAuth()
      },
      {
        path: 'plan-page2',
        name: 'plan-page2',
        component: () => import('@/components/trip-plan/PlanPage2.vue'),
        beforeEnter: requireAuth()
      },
      {
        path: 'plan-page3',
        name: 'plan-page3',
        component: () => import('@/components/trip-plan/PlanPage3.vue'),
        beforeEnter: requireAuth()
      }
    ]
  }
]

export default tripPlanRouter
