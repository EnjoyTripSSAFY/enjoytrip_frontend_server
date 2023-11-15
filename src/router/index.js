import { createRouter, createWebHistory } from 'vue-router'
import homeRouter from '@/router/homeRouter'
import tripInfoSharingRouter from '@/router/tripInfoSharingRouter'
import attractionRouter from '@/router/attractionRouter'
import hotPlaceRouter from '@/router/hotPlaceRouter'
import tripPlanRouter from '@/router/tripPlanRouter'
import memberRouter from '@/router/memberRouter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...homeRouter,
    ...tripInfoSharingRouter,
    ...attractionRouter,
    ...hotPlaceRouter,
    ...tripPlanRouter,
    ...memberRouter,
  ]
})

export default router
