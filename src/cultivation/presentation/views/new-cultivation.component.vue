<script setup lang="js">
import { ref, computed } from 'vue'
import { cultivationService } from '../../application/cultivation.service.js'
import { useRouter } from "vue-router"
import AppLayout from '../../../shared/presentation/components/app-layout.vue'

const router = useRouter()
const cropCreated = ref(false)

// Estados reactivos del servicio
const loading = computed(() => cultivationService.state.loading)
const error = computed(() => cultivationService.state.error)

const form = ref({
  name: '',
  surface: '',
  location: '',
  plantingDate: null,
  farmerId: '1', // Por ahora hardcodeado al usuario demo
  organizationId: '2', // Por ahora hardcodeado a una organización
  variety: '',
  growthStage: 'Siembra'
})

async function createCrop() {
  try {
    // Validar campos requeridos
    if (!form.value.name || !form.value.surface || !form.value.location || !form.value.plantingDate) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    // Convertir fecha al formato correcto
    const formattedDate = form.value.plantingDate ?
      new Date(form.value.plantingDate).toISOString().split('T')[0] : null;

    const cultivationData = {
      ...form.value,
      plantingDate: formattedDate
    };

    await cultivationService.createCrop(cultivationData);
    cropCreated.value = true;
  } catch (error) {
    console.error('Error creating crop:', error);
    alert("Error al crear el cultivo");
  }
}

function continueScreen() {
  router.push('/crops')
}

function resetForm() {
  cropCreated.value = false;
  form.value = {
    name: '',
    surface: '',
    location: '',
    plantingDate: null,
    farmerId: '1',
    organizationId: '2',
    variety: '',
    growthStage: 'Siembra'
  };
}
</script>

<template>
  <AppLayout>
    <div class="container">
      <h1>Crear Cultivo</h1>
      <div class="form-container">
        <template v-if="!cropCreated">
          <form @submit.prevent="createCrop">
            <p class="form-title">
              <span class="pi pi-leaf icon-spacing"></span>Datos del Cultivo:
            </p>

            <pv-floatlabel class="inputs">
              <pv-input-text v-model="form.name" class="input" required></pv-input-text>
              <label>Nombre del Cultivo</label>
            </pv-floatlabel>

            <pv-floatlabel class="inputs">
              <pv-input-text v-model="form.surface" class="input" required></pv-input-text>
              <label>Superficie (ej: 3.5 ha)</label>
            </pv-floatlabel>

            <pv-floatlabel class="inputs">
              <pv-input-text v-model="form.location" class="input" required></pv-input-text>
              <label>Ubicación</label>
            </pv-floatlabel>

            <pv-floatlabel class="inputs">
              <pv-input-text v-model="form.variety" class="input"></pv-input-text>
              <label>Variedad (opcional)</label>
            </pv-floatlabel>

            <pv-floatlabel class="inputs">
              <pv-datepicker v-model="form.plantingDate" date-format="dd/mm/yy" class="date" required></pv-datepicker>
              <label>Fecha de Siembra</label>
            </pv-floatlabel>

            <!-- Mostrar error si existe -->
            <div v-if="error" class="error-message">
              <i class="pi pi-exclamation-triangle"></i>
              {{ error }}
            </div>

            <pv-button
              type="submit"
              class="create"
              :loading="loading"
              :disabled="loading"
            >
              {{ loading ? 'Creando...' : 'Crear Cultivo' }}
            </pv-button>
          </form>
        </template>

        <template v-else>
          <div class="success-message">
            <div class="check-icon">
              <span class="pi pi-check"></span>
            </div>
            <p class="success-text">¡Se creó el cultivo de forma exitosa!</p>
            <div class="action-buttons">
              <pv-button @click="continueScreen" class="continue-btn">Ver Cultivos</pv-button>
              <pv-button @click="resetForm" class="secondary-btn">Crear Otro</pv-button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.container h1 {
  color: #2c5530;
  text-align: center;
  margin-bottom: 2rem;
}

.form-container {
  width: 100%;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: white;
}

.form-title {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c5530;
}

.icon-spacing {
  margin-right: 0.75rem;
  font-size: 1.25rem;
  background-color: #4CAF50;
  padding: 8px;
  border-radius: 50%;
  color: white;
}

.inputs {
  display: block;
  margin-bottom: 1.5rem;
  width: 100%;
}

.inputs .input {
  border-radius: 8px;
  padding: 0.875rem;
  width: 100%;
  background-color: white !important;
  border: 2px solid #E0E0E0 !important;
  color: black !important;
  transition: all 0.3s ease;
}

.inputs .input:focus {
  border-color: #4CAF50 !important;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1) !important;
  outline: none !important;
}

.inputs .date {
  width: 100%;
}

.inputs .date input {
  border-radius: 8px;
  padding: 0.875rem;
  width: 100%;
  background-color: white !important;
  border: 2px solid #E0E0E0 !important;
  color: black !important;
}

.inputs .date input:focus {
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1) !important;
  border-color: #4CAF50 !important;
  outline: none !important;
}

.error-message {
  background: #FFEBEE;
  border: 1px solid #FFCDD2;
  color: #C62828;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.create {
  width: 100%;
  background-color: #4CAF50 !important;
  color: white !important;
  border: none !important;
  outline: none !important;
  padding: 0.875rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.create:hover:not(:disabled) {
  background-color: #45a049 !important;
  transform: translateY(-1px);
}

.create:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.check-icon {
  width: 80px;
  height: 80px;
  background-color: #4CAF50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.check-icon .pi {
  font-size: 2rem;
  color: white;
  font-weight: bold;
}

.success-text {
  font-size: 1.25rem;
  color: #2c5530;
  margin-bottom: 2rem;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.continue-btn {
  background-color: #4CAF50 !important;
  border: none !important;
  color: white !important;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  outline: none !important;
  border-radius: 8px;
}

.continue-btn:hover {
  background-color: #45a049 !important;
}

.secondary-btn {
  background-color: #FF9800 !important;
  border: none !important;
  color: white !important;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  outline: none !important;
  border-radius: 8px;
}

.secondary-btn:hover {
  background-color: #F57C00 !important;
}

/* Estilos para PrimeVue Float Label */
:deep(.p-float-label.p-inputwrapper-focus input),
:deep(.p-float-label.p-inputwrapper-filled input),
:deep(.p-float-label.p-inputwrapper-focus .p-datepicker input),
:deep(.p-float-label.p-inputwrapper-filled .p-datepicker input) {
  background-color: white !important;
  color: black !important;
  border-color: #4CAF50 !important;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1) !important;
}

:deep(.p-float-label.p-inputwrapper-focus label),
:deep(.p-float-label.p-inputwrapper-filled label) {
  color: #4CAF50 !important;
  background-color: white !important;
}

:deep(.p-inputtext),
:deep(.p-datepicker input) {
  background-color: white !important;
  color: black !important;
  border-color: #E0E0E0 !important;
}

/* Responsive */
@media (max-width: 640px) {
  .container {
    padding: 0.5rem;
  }

  .form-container {
    padding: 1.5rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .continue-btn,
  .secondary-btn {
    width: 100%;
  }
}
</style>