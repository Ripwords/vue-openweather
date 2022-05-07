<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { utcToDate, utcToTime } from './utils'
const props = defineProps({
  "apiKey": String,
  "lat": String,
  "long": String,
  "units": {
    type: String,
    default: 'metric' // metric, imperial
  }
})
const emits = defineEmits(["currentWeather"])
const update = ref(true)

// Function that converts angle to N/S/E/W/NE/NW/SE/SW
const convertDirection = (angle: number) => {
  if (angle >= 22.5 && angle < 67.5) {
    return 'NE'
  } else if (angle >= 67.5 && angle < 112.5) {
    return 'E'
  } else if (angle >= 112.5 && angle < 157.5) {
    return 'SE'
  } else if (angle >= 157.5 && angle < 202.5) {
    return 'S'
  } else if (angle >= 202.5 && angle < 247.5) {
    return 'SW'
  } else if (angle >= 247.5 && angle < 292.5) {
    return 'W'
  } else if (angle >= 292.5 && angle < 337.5) {
    return 'NW'
  } else if (angle >= 337.5 || angle < 22.5) {
    return 'N'
  }
}

const weather = ref<any>()
const currentWeather = ref<any>()
watchEffect(async () => {
  try {
    console.log(update.value)
    const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.long}&appid=${props.apiKey}&units=${props.units}&exclude=minutely,alerts,hourly,daily`)
    weather.value = await weatherData.json()
    currentWeather.value = weather.value.current
    utcToDate(currentWeather.value.dt, weather.value.timezone_offset)
    emits("currentWeather", [weather.value])
  } catch (error) {
    console.log(error)
  }
})

// set update interval to update every minute minus the current seconds elapsed
setInterval(() => {
  update.value = !update.value
}, (120 - new Date().getSeconds()) * 1000)
</script>

<template>
  <div class="component card" style="padding-left: 15px; padding-bottom: 20px;" v-if="currentWeather">
    <h1>
      {{ utcToDate(currentWeather.dt, weather.timezone_offset) }}, 
      {{ utcToTime(currentWeather.dt, weather.timezone_offset) }}
    </h1>
    <div style="display: flex;">
      {{ currentWeather.weather[0].description }}
      <img draggable="false" :alt="currentWeather.weather[0]" :src="`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`" />
    </div>
    <div class="grid-container">
      <div>
        Cloud Cover
        {{ currentWeather.clouds }}%
      </div>
      <div>
        Humidity
        {{ currentWeather.humidity }}%
      </div>
      <div>
        Pressure
        {{ currentWeather.pressure }}hPa
      </div>
      <div>
        Temperature
        {{ currentWeather.temp }}°C
      </div>
      <div>
        Feels Like
        {{ currentWeather.feels_like }}°C
      </div>
      <div>
        Dew Point
        {{ currentWeather.dew_point }}°C
      </div>
      <div>
        {{ currentWeather.wind_speed }}m/s
        {{ convertDirection(currentWeather.wind_deg) }}
      </div>
      <div>
        Visibility
        {{ (currentWeather.visibility / 1000).toFixed(2) }}km
      </div>
      <div>
        UV Index
        {{ currentWeather.uvi }}
      </div>
      <div>
        Sunrise
        {{ utcToTime(currentWeather.sunrise, weather.timezone_offset) }}
      </div>
      <div>
        Sunset
        {{ utcToTime(currentWeather.sunset, weather.timezone_offset) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  max-width: 600px;
  grid-template-columns: auto auto auto;
  grid-gap: 10px;
  padding: 10px;
}
</style>