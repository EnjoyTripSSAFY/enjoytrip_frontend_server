import {ref, watch} from 'vue'
import {defineStore, storeToRefs} from 'pinia'
import dayjs from "dayjs";


export const tripInfoSecondStepStore = defineStore('tripInfoSecondStepStore', () => {
    const storedDatePlan = ref([])

    return { storedDatePlan }
}, { persist:false})