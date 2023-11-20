import axios from 'axios'

const apiKey =
  'EhsL2PizQkAMwfRZnxwOXyTGMnkf7aDQsYEuNe6wEAWau3Fo3iTcRgtKE3HZTD0%2F8cCBwvUmGsTerjWWKNT0mA%3D%3D'
const endPoint = 'https://apis.data.go.kr/B551011/KorService1/'

const getURL = (baseUrl, queryParams) => {
  const queryString = Object.keys(queryParams)
    .map((key) => `${key}=${queryParams[key]}`)
    .join('&')

  return `${baseUrl}?${queryString}`
}

const getRequest = async (finalUrl) => {
  try {
    const response = await axios.get(finalUrl)
    if (!response.data || response.data.response.header.resultCode !== '0000') {
      throw new Error('Network response was not ok')
      alert("네트워크 문제로 인하에 데이터를 받을 수 없습니다.")
    }
    return response.data.response.body.items.item
  } catch (error) {
    console.error('fetch error:', error)
    alert("네트워크 문제로 인하에 데이터를 받을 수 없습니다.")
    return null
  }
}

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

  const finalUrl = getURL(baseUrl, queryParams)
  return getRequest(finalUrl)
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

  const finalUrl = getURL(baseUrl, queryParams)
  return getRequest(finalUrl)
}

const getLocalTripData = async (state, city, type) => {
  const service = 'areaBasedList1'
  const baseUrl = endPoint + service

  const queryParams = {
    numOfRows: '100',
    pageNo: 1,
    MobileOS: 'ETC',
    MobileApp: 'EnjoyTrip',
    areaCode: state,
    sigunguCode: city,
    contentTypeId: type,
    _type: 'json',
    serviceKey: apiKey
  }

  const finalUrl = getURL(baseUrl, queryParams)
  return getRequest(finalUrl)
}

export { getCityData, getStateData, getLocalTripData }
