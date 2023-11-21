import {ref, watch} from 'vue'
import { defineStore } from 'pinia'
import {getLocalTripData } from '@/api/tripApi'

export const tripInfoStore = defineStore('tripInfoStore', () => {
    const storedTripList = ref([]);
    const storedTripTitle = ref("")


    return { storedTripList }
})