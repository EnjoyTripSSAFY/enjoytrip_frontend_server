import {ref, watch} from 'vue'
import { defineStore } from 'pinia'
import {getLocalTripData } from '@/api/tripApi'

export const tripInfoStore = defineStore('tripInfoStore', () => {
    const selectedState = ref("");
    const selectedCity = ref("");
    const selectedType = ref("");
    const selectedPgno = ref(1);
    const selectedPgSize = ref(10)
    const responseData = ref(null);
    const totalSize =ref(0)
    const isLoading = ref(false)

    watch([selectedType, selectedCity, selectedState, selectedPgno, selectedPgSize], async ([type, city, state, pgno]) => {
        const requestData = await getLocalTripData(selectedState.value, selectedCity.value, selectedType.value
            , selectedPgno.value, selectedPgSize.value);
        const items = requestData && requestData.items;
        const item = items && items.item;
        const totalCount = requestData && requestData.totalCount;

        if (!item) {
            throw new Error("item is null or undefined");
        }

        // responseData.value 및 totalSize.value에 할당
        responseData.value = item;
        totalSize.value = totalCount;

    });

    return { selectedType, selectedCity, selectedState, selectedPgno, selectedPgSize ,responseData, totalSize, isLoading }
})