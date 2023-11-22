import {ref, watch} from 'vue'
import { defineStore } from 'pinia'
import {getLocalTripData } from '@/api/tripApi'

export const kakaoMapPosStoreAttraction = defineStore('kakaoMapPosStoreAttraction', () => {
    const currentPos = ref(null);

    return { currentPos }
})