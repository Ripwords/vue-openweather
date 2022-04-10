import { createApp } from 'vue'
import App from './App.vue'
import VueOpenWeather from '../src/components/index'

createApp(App).use(VueOpenWeather).mount('#app')