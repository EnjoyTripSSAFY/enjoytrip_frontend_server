import {ref, watch} from 'vue'
import { defineStore } from 'pinia'
import {getLocalTripData } from '@/api/tripApi'

export const tripInfoFirstStepStore = defineStore('tripInfoFirstStepStore', () => {
    const storedTripList = ref([]);
    const storedTripTitle = ref("")
    const storedTripTerm = ref(null)


    return { storedTripList, storedTripTitle, storedTripTerm }
})