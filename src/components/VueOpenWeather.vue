<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
const props = defineProps({
  "apiKey": String,
  "lat": String,
  "long": String,
  "hourly": {
    type: Boolean,
    default: false
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

// Function to account for different Time Zone based on offset
const convertTimeZone = (time: number, offset: number) => {
  const date = new Date((time + offset) * 1000)
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000)
  const nd = new Date(utc + (3600000*offset))
  return nd
}

// Function to convert UTC string to date with day of week
const utcToDate = (time: number, offset: number) => {
  const date = convertTimeZone(time, offset)
  const day = date.toLocaleString('default', { weekday: 'long' })
  const month = date.toLocaleString('default', { month: 'long' })
  const dayOfMonth = date.getDate()
  return `${day}, ${dayOfMonth} ${month}`
}

// Function to convert UTC to time in 12 hour format
const utcToTime = (time: number, offset: number) => {
  const date = convertTimeZone(time, offset)
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
  <div class="component">
    <div
      ref="horScrollbar" 
      class="horizontal" 
      @wheel="scrollHorizontally"
    >
      <div v-if="hourly && props.hourly"
        class="card"
        v-for="condition in hourly" :key="condition"
      >
        <p style="margin-top: 0.25rem;" align="center">
          {{ utcToDate(condition.dt, weather.timezone_offset) }}
        </p>
        <p style="margin-top: 0.25rem;" align="center">
          {{ utcToTime(condition.dt, weather.timezone_offset) }}
        </p>
        <p style="margin-top: 0.75rem;" align="center">
          <svg width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 18H6a4 4 0 0 1-4-4a4 4 0 0 1 4-4h.71C7.37 7.69 9.5 6 12 6a5.5 5.5 0 0 1 5.5 5.5v.5H19a3 3 0 0 1 3 3a3 3 0 0 1-3 3m.35-7.97A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.03A6.004 6.004 0 0 0 0 14a6 6 0 0 0 6 6h13a5 5 0 0 0 5-5c0-2.64-2.05-4.78-4.65-4.97Z"></path></svg>
          {{ condition.clouds }}%
        </p>
        <div class="center">
          <img draggable="false" :src="`https://openweathermap.org/img/wn/${condition.weather[0].icon}@2x.png`" />
        </div>
      </div>
      <div v-else-if="daily && props.daily"
        class="card"
        v-for="dailyCond in daily" :key="dailyCond"
      >
        <p style="margin-top: 0.25rem;" align="center">
          {{ utcToDate(dailyCond.dt, weather.timezone_offset) }}
        </p>
        <p style="margin-top: 0.75rem;" align="center">
          <svg width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 18H6a4 4 0 0 1-4-4a4 4 0 0 1 4-4h.71C7.37 7.69 9.5 6 12 6a5.5 5.5 0 0 1 5.5 5.5v.5H19a3 3 0 0 1 3 3a3 3 0 0 1-3 3m.35-7.97A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.03A6.004 6.004 0 0 0 0 14a6 6 0 0 0 6 6h13a5 5 0 0 0 5-5c0-2.64-2.05-4.78-4.65-4.97Z"></path></svg>
          {{ dailyCond.clouds }}%
        </p>
        <div class="center">
          <img draggable="false" :src="`https://openweathermap.org/img/wn/${dailyCond.weather[0].icon}@2x.png`" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.center {
  display: flex;
  justify-content: center;
}
.component {
  user-select: none;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
}

.horizontal {
  display: flex;
  overflow-x: scroll;
}

.horizontal::-webkit-scrollbar {
  display: none;
}

.card {
  min-width: 150px;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}
</style>