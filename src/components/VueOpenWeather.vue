<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
const props = defineProps({
  "apiKey": String,
  "lat": String,
  "long": String,
  "dashboard": {
    type: Boolean,
    default: false
  }
})

const apiLink = ref('')
const weather = ref<any>('')
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

watchEffect(async () => {
  apiLink.value = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.long}&appid=${props.apiKey}&units=metric`
  try {
    const weatherData = await fetch(apiLink.value)
    weather.value = await weatherData.json()
    console.log(weather.value)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="component">
    <div v-if="props.dashboard">
    
    </div>
    <div 
      v-else 
      ref="horScrollbar" 
      class="flex overflow-x-scroll" 
      @wheel="scrollHorizontally"
    >
      <div 
        class="min-w-[150px] m-2 p-2 dark:bg-[#333] dark:color-[#fff] rounded-[5px] shadow-dark-900 scrollbar scrollbar-thumb-rounded scrollbar-thumb-gray-900 scrollbar-track-gray-100"
        v-for="condition in weather.hourly" :key="weather.hourly.dt"
      >
        <p class="mt-1" align="center">
          {{ new Date(condition.dt * 1000).toUTCString() }}
        </p>
        <p align="center">
          <i-mdi:cloud-outline />
          {{ condition.clouds }}%
        </p>
        <div class="flex justify-center">
          <img :src="`http://openweathermap.org/img/wn/${condition.weather[0].icon}@2x.png`" />
        </div>
      </div>
    </div>
  </div>
</template>