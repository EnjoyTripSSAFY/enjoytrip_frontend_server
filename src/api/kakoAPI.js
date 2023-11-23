import axios from "axios";

const keywordSearch =
async (searchKeyword, currentPage) => {
    await axios.get('http://dapi.kakao.com/v2/local/search/keyword.json?', {
        params: {
            query: searchKeyword,
            page: currentPage,
            size: 15
        },
        headers: {
            'Authorization': 'KakaoAK 27791d30c5f0484aee5db5b1f69202d5'
        },
    }).then((res) => {
        return res
    }).catch((err) => alert("통신 중 에러가 발생했습니다."))
}

const imageSearch =
    async (searchKeyword, success, fail) => {
        await axios.get('https://dapi.kakao.com/v2/search/image', {
            params: {
                query: searchKeyword,
                page: 1,
                size: 1
            },
            headers: {
                'Authorization': 'KakaoAK 27791d30c5f0484aee5db5b1f69202d5'
            },
        }).then(success).catch(fail)
}

export {keywordSearch,imageSearch}