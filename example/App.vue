<script setup lang="ts">
import { VueOpenWeather, VueCurrentWeather } from '../src/components/index'
// import { VueOpenWeather, VueCurrentWeather } from 'vue-openweather'
import { convertTimeZone } from '../src/components/index'
const output = (e: any) => {
  console.log(e[0].timezone_offset)
  console.log(e[0].hourly[0].dt)
  console.log(convertTimeZone(e[0].hourly[0].dt, e[0].timezone_offset))
}
const current = (e: any) => console.log(e)

const lat = "48.9"
const long = "95"
</script>

<template>
  <VueOpenWeather
    apiKey="fcd7c46a039d1f8d59ef5c1ed18f9c6d"
    :lat="lat"
    :long="long"
    hourly
    :excludes="['minutely','alerts','current']"
    @weatherData="output"
  />
  <VueCurrentWeather
    apiKey="fcd7c46a039d1f8d59ef5c1ed18f9c6d"
    :lat="lat"
    :long="long"
    @currentWeather="current"
  />
</template>
