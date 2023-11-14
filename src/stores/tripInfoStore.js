import { ref } from 'vue'
import { defineStore } from 'pinia'

export const tripInfoStore = defineStore('tripInfoStore', () => {
    const selectedState = ref("");
    const selectedCity = ref("");
    const selectedType = ref("");
    const selectedPgno = ref(1);

    return { selectedType, selectedCity, selectedState, selectedPgno }
})