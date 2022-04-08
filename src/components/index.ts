import { defineCustomElement } from 'vue'
import VueOpenWeatherComponent from './VueOpenWeather.ce.vue'
import 'virtual:windi.css'

export const VueOpenWeather = defineCustomElement(VueOpenWeatherComponent)

export function register(tagname = 'vue-openweather') {
  customElements.define(tagname, VueOpenWeather)
}