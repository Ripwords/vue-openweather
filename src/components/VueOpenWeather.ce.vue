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
        class="min-w-[150px] m-2 p-2 card" 
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

<style>
.component ::-webkit-scrollbar {
  width: 20px;
}

.component ::-webkit-scrollbar-track {
  background-color: transparent;
}

.component ::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
}

.component ::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
}

.component ::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

.component .card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
}

@media (prefers-color-scheme: dark) {
  .card {
    background-color: #333;
    color: #fff;
  }
}
</style>