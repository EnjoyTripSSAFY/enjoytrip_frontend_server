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
        component: () => import('@/components/trip-plan/PlanPage1.vue')
      },
      {
        path: 'plan-page2',
        name: 'plan-page2',
        component: () => import('@/components/trip-plan/PlanPage2.vue')
      },
      {
        path: 'plan-page3',
        name: 'plan-page3',
        component: () => import('@/components/trip-plan/PlanPage3.vue')
      }
    ]
  }
]

export default tripPlanRouter
