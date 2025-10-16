<script setup lang="js">
import { WeatherService } from '../../application/weather.service.js'
import { onMounted, ref } from 'vue'
import AppLayout from '../../../shared/presentation/components/app-layout.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'

const weatherData = ref(null)
const loading = ref(true)
const error = ref(null)

const weather = new WeatherService()

onMounted(async () => {
  await loadWeather()
})

const loadWeather = async () => {
  loading.value = true
  error.value = null
  try {
    const result = await weather.getWeather()
    weatherData.value = result
  } catch (err) {
    error.value = err.message || 'Error al cargar el clima'
  } finally {
    loading.value = false
  }
}

const refreshWeather = () => {
  loadWeather()
}
</script>

<template>
  <AppLayout>
    <div class="weather-container">
      <div class="header">
        <h1>Información del Clima</h1>
        <p>Datos meteorológicos actuales para la gestión agrícola</p>
      </div>

      <div class="actions">
        <Button
          label="Actualizar"
          icon="pi pi-refresh"
          @click="refreshWeather"
          :loading="loading"
          class="p-button-outlined"
        />
      </div>

      <!-- Estado de carga -->
      <div v-if="loading" class="loading-state">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        <p>Cargando información del clima...</p>
      </div>

      <!-- Estado de error -->
      <div v-else-if="error" class="error-state">
        <i class="pi pi-exclamation-triangle" style="font-size: 2rem; color: #e74c3c"></i>
        <p>{{ error }}</p>
        <Button
          label="Reintentar"
          icon="pi pi-refresh"
          @click="refreshWeather"
          class="p-button-outlined"
        />
      </div>

      <!-- Información del clima -->
      <div v-else class="weather-content">
        <Card class="weather-card">
          <template #header>
            <div class="weather-header">
              <i class="pi pi-sun weather-icon"></i>
              <h2>Condiciones Actuales</h2>
            </div>
          </template>
          <template #content>
            <div class="weather-info">
              <div class="main-weather">
                <div class="temperature">
                  <span class="temp-value">{{ weatherData.temperature }}°C</span>
                  <span class="condition">{{ weatherData.condition }}</span>
                </div>
              </div>

              <div class="weather-details" v-if="weatherData.humidity || weatherData.windSpeed">
                <div class="detail-item" v-if="weatherData.humidity">
                  <i class="pi pi-tint"></i>
                  <span>Humedad: {{ weatherData.humidity }}%</span>
                </div>
                <div class="detail-item" v-if="weatherData.windSpeed">
                  <i class="pi pi-flag"></i>
                  <span>Viento: {{ weatherData.windSpeed }} km/h</span>
                </div>
                <div class="detail-item" v-if="weatherData.location">
                  <i class="pi pi-map-marker"></i>
                  <span>{{ weatherData.location }}</span>
                </div>
              </div>
            </div>
          </template>
        </Card>

        <!-- Información adicional para agricultura -->
        <Card class="agricultural-info">
          <template #header>
            <div class="info-header">
              <i class="pi pi-leaf"></i>
              <h3>Información Agrícola</h3>
            </div>
          </template>
          <template #content>
            <div class="agricultural-tips">
              <div class="tip-item">
                <i class="pi pi-check-circle" style="color: #28a745"></i>
                <span>Condiciones favorables para actividades al aire libre</span>
              </div>
              <div class="tip-item">
                <i class="pi pi-info-circle" style="color: #17a2b8"></i>
                <span>Monitorea las condiciones antes de realizar tratamientos</span>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
.weather-container {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  margin-bottom: 2rem;
}

.header h1 {
  margin: 0 0 0.5rem 0;
  color: #2c5530;
  font-size: 2rem;
}

.header p {
  margin: 0;
  color: #666;
  font-size: 1.1rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
}

.loading-state, .error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px dashed #dee2e6;
}

.loading-state p, .error-state p {
  margin: 1rem 0;
  color: #666;
  font-size: 1.1rem;
}

.weather-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.weather-card {
  background: linear-gradient(135deg, #4CAF50, #66BB6A) !important;
  color: white !important;
  border-radius: 16px !important;
  box-shadow: 0 8px 24px rgba(76, 175, 80, 0.3) !important;
}

.weather-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  color: white;
}

.weather-icon {
  font-size: 2.5rem;
  color: #FFF176;
}

.weather-header h2 {
  margin: 0;
  color: white;
}

.weather-info {
  padding: 1rem;
}

.main-weather {
  text-align: center;
  margin-bottom: 2rem;
}

.temperature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.temp-value {
  font-size: 4rem;
  font-weight: bold;
  color: white;
}

.condition {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  text-transform: capitalize;
}

.weather-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
}

.detail-item i {
  color: #FFF176;
}

.agricultural-info {
  background: white !important;
  border-radius: 16px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  color: #2c5530;
}

.info-header i {
  font-size: 1.5rem;
  color: #4CAF50;
}

.info-header h3 {
  margin: 0;
  color: #2c5530;
}

.agricultural-tips {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #333;
  line-height: 1.5;
}

.tip-item i {
  margin-top: 0.25rem;
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .weather-content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .temp-value {
    font-size: 3rem;
  }

  .weather-container {
    padding: 0.5rem;
  }
}
</style>