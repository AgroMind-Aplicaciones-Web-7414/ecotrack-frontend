<script setup lang="js">
import {WeatherService} from '../../application/weather.service.js'
import {onMounted, ref} from 'vue'

const weatherData = ref(null)
const loading = ref(true)
const error = ref(null)

const weather = new WeatherService()

onMounted(async () => {
  try{
    const result = await weather.getWeather()
    weatherData.value = result
  }catch(err){
    error.value = err
  }finally{
    loading.value = false
  }
})

</script>

<template>
<div>
  <p v-if="loading">Loading Weather...</p>
  <p v-else-if="error">Error: {{error}}</p>
  <div v-else class="organization-container">
    <pv-card class="organization-card">
      <template #content>
        <div class="icon-and-text">
          <span class="pi pi-sun icon-spacer"></span>
          <div>
            <div class="organization-name">Clima:</div>
            <div class="details">
              {{ weatherData.condition }}:
              {{ weatherData.temperature }}°C
            </div>
          </div>
        </div>
      </template>
    </pv-card>
  </div>
</div>
</template>

<style scoped>
.organization-container {
  margin-bottom: 1rem;
  width: 100%;
}
.organization-card {
  background: white !important;
  color: black !important;
  font-size: 1.5rem;
  box-shadow: 1px 1px 7px rgb(218, 218, 218) !important;
  border-radius: 10px;
}
.icon-spacer{
  font-size: 4.5rem;
}
.icon-and-text{
  display: flex;
  gap: 1rem;
  text-align: left;
}
.organization-name {
  font-weight: bold;
}
</style>