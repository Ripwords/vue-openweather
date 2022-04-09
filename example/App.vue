<script setup lang="ts">
import { VueOpenWeather, VueCurrentWeather, convertTimeZone } from '../src/components/index'
const output = (e: any) => {
  console.log(e[0].timezone_offset)
  console.log(e[0].hourly[0].dt)
  console.log(convertTimeZone(e[0].hourly[0].dt, e[0].timezone_offset))
}
const current = (e: any) => console.log(e)
</script>

<template>
  <VueOpenWeather
    apiKey="fcd7c46a039d1f8d59ef5c1ed18f9c6d"
    lat="34.05"
    long="-118.24"
    hourly
    :excludes="['minutely','alerts','current']"
  />
  <VueCurrentWeather
    apiKey="fcd7c46a039d1f8d59ef5c1ed18f9c6d"
    lat="3.22"
    long="101.74"
    @currentWeather="current"
  />
</template>
