import { createRouter, createWebHistory } from 'vue-router'
// import homeRouter from './homeRouter'
// import tripInfoSharingRouter from './tripInfoSharingRouter'
// import attractionRouter from './attractionRouter'
// import hotPlaceRouter from './hotPlaceRouter'
// import tripPlanRouter from './tripPlanRouter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ...homeRouter,
    // ...tripInfoSharingRouter,
    // ...attractionRouter,
    // ...hotPlaceRouter,
    // ...tripPlanRouter
  ]
})

export default router
