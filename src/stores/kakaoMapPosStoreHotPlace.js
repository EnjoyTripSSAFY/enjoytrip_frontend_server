import {ref, watch} from 'vue'
import { defineStore } from 'pinia'
import {getLocalTripData } from '@/api/tripApi'
import axios from "axios";

export const kakaoMapPosStoreHotPlace = defineStore('kakaoMapPosStoreHotPlace', () => {
    const currentPos = ref(null);
    const searchKeyword = ref("")
    const places = ref(null)
    const currentPage = ref(1)
    const totalSize = ref(null);
    const size = 15;


    watch(searchKeyword, async (newKeyword) => {
        try {
            const response = await axios.get('http://dapi.kakao.com/v2/local/search/keyword.json?', {
                params: {
                    query: searchKeyword.value,
                    page: currentPage.value,
                    size: size
                },
                headers: {
                    'Authorization': 'KakaoAK 27791d30c5f0484aee5db5b1f69202d5'
                },
            });
            // Update places or handle the response as needed
            places.value = response.data.documents;
            totalSize.value = response.data.meta.pageable_count



        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error, show a message, etc.
        }
    });

    watch(currentPage, async (newKeyword) => {
        try {
            const response = await axios.get('http://dapi.kakao.com/v2/local/search/keyword.json?', {
                params: {
                    query: searchKeyword.value,
                    page: currentPage.value,
                    size: size
                },
                headers: {
                    'Authorization': 'KakaoAK 27791d30c5f0484aee5db5b1f69202d5'
                },
            });
            // Update places or handle the response as needed
            places.value = response.data.documents;
            totalSize.value = response.data.meta.pageable_count


        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error, show a message, etc.
        }
    });


    return { currentPos, searchKeyword, places, currentPage, totalSize }
})