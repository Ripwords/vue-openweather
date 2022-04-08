# Vue 3 + OpenWeather

[![vue3](https://img.shields.io/badge/vuejs-3.x-brightgreen.svg)](https://vuejs.org/)
[![npm](https://img.shields.io/npm/v/vue-openweather)](http://npmjs.com/package/vue-openweather)
[![npm download per month](https://img.shields.io/npm/dm/vue-openweather)](http://npmjs.com/package/vue-openweather)

<img src="https://user-images.githubusercontent.com/58784686/162488946-1d0f1ffc-633f-45c4-8fdd-f64b6e46919d.png">

Inspired by [vue-weather-widget](https://github.com/dipu-bd/vue-weather-widget)

## Install

### NPM

```
npm i vue-openweather
```

## OpenWeatherAPI

Get an OpenWeatherAPI key by signing up an account at the OpenWeather website

## Usage
```html
<script setup lang="ts">
  import VueOpenWeather from "vue-openweather";
  import "vue-openweather/dist/style.css";
</script>

<template>
  <VueOpenWeather 
    apiKey="your-open-weather-api-key"
    lat="your-latitude"
    long="your-longitude"
    hourly
  />
</template>


```

## Props

| Props       | Type               | Default Value    | Description                |
|-------------|--------------------|------------------|----------------------------|
| apiKey      | string (required)  | -                | Your API key               |
| lat         | string (required)  | -                | Your latitude              |
| long        | string (required)  | -                | Your longitude             |
| hourly      | boolean            | false            | Hourly data for 48 hours   |
| daily       | boolean            | true             | Daily data for 3 days      |
| units       | string             | metric           | Metric or Imperial units   |


