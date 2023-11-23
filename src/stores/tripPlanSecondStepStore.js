import {ref, watch} from 'vue'
import {defineStore, storeToRefs} from 'pinia'
import dayjs from "dayjs";
import {tripInfoFirstStepStore} from "@/stores/tripPlanOneStepStore";


export const tripInfoSecondStepStore = defineStore('tripInfoSecondStepStore', () => {
    const {storedTripList, storedTripTerm, storedTripTitle} = storeToRefs(tripInfoFirstStepStore());

    const storedDatePlan = ref(null)

    return { storedDatePlan }
})