import {ref, watch} from 'vue'
import { defineStore } from 'pinia'
import {getLocalTripData } from '@/api/tripApi'

export const kakaoMapPosStore = defineStore('kakaoMapPosStore', () => {
    const currentPos = ref(null);

    return { currentPos }
})