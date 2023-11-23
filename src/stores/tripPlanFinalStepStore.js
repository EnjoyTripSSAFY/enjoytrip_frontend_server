import {ref, watch} from 'vue'
import {defineStore, storeToRefs} from 'pinia'
import dayjs from "dayjs";


export const tripInfoFinalStepStore = defineStore('tripInfoFinalStepStore', () => {
    const storedSchedule = ref([])

    return { storedSchedule }
}, { persist:false})