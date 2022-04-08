<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
const props = defineProps({
  "apiKey": String,
  "lat": String,
  "long": String,
  "dashboard": {
    type: Boolean,
    default: false
  },
  "hourly": {
    type: Boolean,
    default: true
  },
  "daily": {
    type: Boolean,
    default: false
  },
  "units": {
    type: String,
    default: 'metric' // metric, imperial
  }
})

// Horizontal Scrollbar
const horScrollbar = ref<any>()
const scrollHorizontally = (event: any) => {
  const scrollAmount = 50
  event.preventDefault()
  if (horScrollbar.value) {
    horScrollbar.value.scrollBy({
      left: event.deltaY < 0 ? -1*scrollAmount : scrollAmount,
    })
  }
}

// Function to convert UTC string to date with day of week
const utcToDate = (date: Date) => {
  const day = date.toLocaleString('default', { weekday: 'long' })
  const month = date.toLocaleString('default', { month: 'long' })
  const dayOfMonth = date.getDate()
  return `${day}, ${dayOfMonth} ${month}`
}

// Function to convert UTC to time in 12 hour format
const utcToTime = (date: Date) => {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'pm' : 'am'
  const hour = hours % 12
  const formattedHour = hour < 10 ? `0${hour}` : hour
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
  return `${formattedHour}:${formattedMinutes} ${ampm}`
}

// Weather Data
const apiLink = ref('')
const weather = ref<any>('')
const hourly = ref<any>()
const daily = ref<any>()
watchEffect(async () => {
  apiLink.value = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.long}&appid=${props.apiKey}&units=${props.units}&exclude=minutely,alerts,current`
  try {
    const weatherData = await fetch(apiLink.value)
    weather.value = await weatherData.json()
    hourly.value = weather.value.hourly
    daily.value = weather.value.daily
    console.log(weather.value)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="component select-none font-semibold">
    <div v-if="props.dashboard">
    
    </div>
    <div v-else>
      <div v-if="hourly && props.hourly"
        ref="horScrollbar" 
        class="flex overflow-x-scroll no-scrollbar" 
        @wheel="scrollHorizontally"
      >
        <div 
          class="min-w-[150px] m-2 p-2 rounded-[15px] shadow-md shadow-gray-500"
          v-for="condition in hourly" :key="condition"
        >
        <p class="mt-1" align="center">
            {{ utcToDate(new Date((condition.dt) * 1000)) }}
          </p>
          <p class="mt-1" align="center">
            {{ utcToTime(new Date((condition.dt) * 1000)) }}
          </p>
          <p align="center" class="mt-3">
            <i-mdi:cloud-outline />
            {{ condition.clouds }}%
          </p>
          <div class="flex justify-center">
            <img draggable="false" :src="`http://openweathermap.org/img/wn/${condition.weather[0].icon}@2x.png`" />
          </div>
        </div>
      </div>
      <div v-else-if="daily && props.daily"
        ref="horScrollbar" 
        class="flex overflow-x-scroll no-scrollbar" 
        @wheel="scrollHorizontally"
      >
        <div 
          class="min-w-[150px] m-2 p-2 rounded-[15px] shadow-md shadow-gray-500"
          v-for="condition in daily" :key="condition"
        >
          <p class="mt-1" align="center">
            {{ utcToDate(new Date(condition.dt * 1000)) }}
          </p>
          <p align="center" class="mt-3">
            <i-mdi:cloud-outline />
            {{ condition.clouds }}%
          </p>
          <div class="flex justify-center">
            <img draggable="false" :src="`http://openweathermap.org/img/wn/${condition.weather[0].icon}@2x.png`" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>