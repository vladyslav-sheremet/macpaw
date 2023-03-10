import App from './App.vue'
import { createApp } from 'vue'
import LoaderComponent from '@/components/LoaderComponent.vue'
import SvgComponent from '@/components/SvgComponent.vue'

// [] 1. Сделать правильный порядок имортов

createApp(App)
    .component('loader-component', LoaderComponent)
    .component('svg-component', SvgComponent)
    .mount('#app')
