const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const dateInput = document.querySelector('#date-input')
const weatherHeader = document.querySelector('#weather-header')
const weatherCardsContainer = document.querySelector('#weather-cards')

import { convertDate } from './utils'

// render weather info
const renderWeather = (data, city, regionCode) => {
  const weatherHeading = document.createElement('h1')
  weatherHeading.setAttribute('class', 'weather-header')
  weatherHeading.textContent = `WEATHER FORECAST FOR ${city.toUpperCase()}, ${regionCode}`
  weatherHeader.append(weatherHeading)

  const slicedData = data.daily.data.slice(0, 3)

  slicedData.forEach((data) => {
    const { time, icon, temperatureMax, temperatureLow } = data

    const cards = document.createElement('div')
    const day = document.createElement('h2')
    const weatherIcon = document.createElement('img')
    const weatherType = document.createElement('p')
    const temperature = document.createElement('p')

    day.setAttribute('class', 'day')
    day.textContent = `${convertDate(time)}:`

    if (icon === 'cloudy') {
      weatherIcon.setAttribute('src', require('../img/cloudy.png'))
    } else if (icon === 'rain') {
      weatherIcon.setAttribute('src', require('../img/rain.png'))
    } else if (icon === 'snow') {
      weatherIcon.setAttribute('src', require('../img/snow.png'))
    } else if (icon === 'sunny') {
      weatherIcon.setAttribute('src', require('../img/sunny.png'))
    }

    weatherType.textContent = icon

    temperature.innerHTML = `${temperatureMax}° / ${temperatureLow}° F`

    cards.setAttribute('class', 'weather-cards')
    cards.append(day, weatherIcon, weatherType, temperature)

    weatherCardsContainer.append(cards)
  })
}

// get weather data
const fetchWeather = async (latitude, longitude, date, city, regionCode) => {
  const response = await fetch(
    `https://se-weather-api.herokuapp.com/api/v1/forecast?latitude=${latitude}&${longitude}=-104.2&date=${date}`
  )

  const data = await response.json()
  console.log(data)
  if (data.error) {
    alert('forcast not available for that day')
    return
  }
  renderWeather(data, city, regionCode)
}

// get longitude and latitude coordinates
const fetchCoordinates = async (zipcode) => {
  const response = await fetch(
    `https://se-weather-api.herokuapp.com/api/v1/geo?zip_code=${zipcode}`
  )
  const data = await response.json()
  const { longitude, latitude, city, regionCode } = data

  const dateValue = dateInput.value
  const dateArr = dateValue.split('-')
  const formattedMonthDayYear = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`

  fetchWeather(latitude, longitude, formattedMonthDayYear, city, regionCode)
}

const handleSubmit = (e) => {
  e.preventDefault()

  const searchValue = searchInput.value.trim()
  weatherHeader.innerHTML = ''
  weatherCardsContainer.innerHTML = ''

  fetchCoordinates(searchValue)
}

searchForm.addEventListener('submit', handleSubmit)
