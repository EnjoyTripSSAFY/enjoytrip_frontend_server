import axios from 'axios'

const apiKey =
  'EhsL2PizQkAMwfRZnxwOXyTGMnkf7aDQsYEuNe6wEAWau3Fo3iTcRgtKE3HZTD0/8cCBwvUmGsTerjWWKNT0mA=='
const endPoint = 'https://apis.data.go.kr/B551011/KorService1/'

const getURL = (baseUrl, queryParams) => {
  const queryString = Object.keys(queryParams)
    .map((key) => `${key}=${queryParams[key]}`)
    .join('&')

  return `${baseUrl}?${queryString}`
}

const getRequest = async (baseUrl, queryParams) => {
  return await axios.get(baseUrl, { params: queryParams })
      .then((res) => {
        if (!res.data || !res.data.response || !res.data.response.body) {
          throw new Error('Network response was not ok');
        }
        return res.data.response.body;
      })
      .catch((err) => {
        console.error('fetch error:', err);
        return null;
      })
};
const getStateData = () => {
  const service = 'areaCode1'
  const baseUrl = endPoint + service

  const queryParams = {
    numOfRows: '100',
    pageNo: '1',
    MobileOS: 'ETC',
    MobileApp: 'EnjoyTrip',
    _type: 'json',
    serviceKey: apiKey
  }

  return getRequest(baseUrl, queryParams)
}

const getCityData = (city) => {
  const service = 'areaCode1'
  const baseUrl = endPoint + service

  const queryParams = {
    numOfRows: '100',
    pageNo: '1',
    MobileOS: 'ETC',
    MobileApp: 'EnjoyTrip',
    areaCode: city,
    _type: 'json',
    serviceKey: apiKey
  }

  // const finalUrl = getURL(baseUrl, queryParams)
  return getRequest(baseUrl, queryParams)
}

const getLocalTripData = async (state, city, type, pageno, pageSize) => {
  const service = 'areaBasedList1'
  const baseUrl = endPoint + service

  if(!pageno) pageno = 1

  const queryParams = {
    numOfRows: pageSize,
    pageNo: pageno,
    MobileOS: 'ETC',
    MobileApp: 'EnjoyTrip',
    areaCode: state,
    sigunguCode: city,
    contentTypeId: type,
    _type: 'json',
    serviceKey: apiKey
  }

  // const finalUrl = getURL(baseUrl, queryParams)
  return getRequest(baseUrl, queryParams)
}

export { getCityData, getStateData, getLocalTripData }
