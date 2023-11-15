import { createRouter, createWebHistory } from 'vue-router'
import homeRouter from './homeRouter'
import tripInfoSharingRouter from './tripInfoSharingRouter'
import attractionRouter from './attractionRouter'
import hotPlaceRouter from './hotPlaceRouter'
import tripPlanRouter from './tripPlanRouter'
import memberRouter from "@/router/memberRouter";

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
