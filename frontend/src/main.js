import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.js'
import PrimeVue from 'primevue/config'
import Material from '@primeuix/themes/material'
import {Button, FloatLabel, Card, Checkbox, InputText, DatePicker, Toolbar} from 'primevue'
import 'primeicons/primeicons.css'


createApp(App)
    .use(PrimeVue,{theme: {preset: Material}, ripple: true})
    .component('pv-toolbar', Toolbar)
    .component('pv-button', Button)
    .component('pv-floatlabel', FloatLabel)
    .component('pv-card', Card)
    .component('pv-checkbox', Checkbox)
    .component('pv-datepicker', DatePicker)
    .component('pv-input-text', InputText)
    .use(router)
    .mount('#app')
