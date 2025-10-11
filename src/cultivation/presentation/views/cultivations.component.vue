<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { cultivationService } from '../../application/cultivation.service.js';
import AppLayout from '../../../shared/presentation/components/app-layout.vue';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';

const router = useRouter();

// Estados reactivos del servicio
const cultivations = computed(() => cultivationService.state.cultivations);
const loading = computed(() => cultivationService.state.loading);
const error = computed(() => cultivationService.state.error);

onMounted(async () => {
  try {
    await cultivationService.getAllCultivations();
  } catch (err) {
    console.error('Error loading cultivations:', err);
  }
});

const goCreateCultivation = () => {
  router.push('/crops/new');
};

const editCultivation = (cultivation) => {
  router.push(`/crops/${cultivation.id}/edit`);
};

const deleteCultivation = async (cultivation) => {
  if (confirm(`¿Estás seguro de que quieres eliminar el cultivo "${cultivation.name}"?`)) {
    try {
      await cultivationService.deleteCultivation(cultivation.id);
    } catch (err) {
      alert('Error al eliminar el cultivo');
      console.error('Error deleting cultivation:', err);
    }
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getGrowthStageColor = (stage) => {
  const colors = {
    'Siembra': 'info',
    'Germinación': 'success',
    'Vegetativo': 'success',
    'Floración': 'warning',
    'Fructificación': 'warning',
    'Tuberización': 'danger',
    'Maduración': 'danger',
    'Cosecha': 'success'
  };
  return colors[stage] || 'secondary';
};
</script>

<template>
  <AppLayout>
    <div class="cultivations-container">
      <!-- Header -->
      <div class="header">
        <div class="title-section">
          <h1>Gestión de Cultivos</h1>
          <p>Administra y supervisa todos tus cultivos agrícolas</p>
        </div>

        <div class="actions">
          <Button
            label="Nuevo Cultivo"
            icon="pi pi-plus"
            @click="goCreateCultivation"
            class="p-button-success"
            :disabled="loading"
          />
        </div>
      </div>

      <!-- Estado de carga -->
      <div v-if="loading" class="loading-state">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        <p>Cargando cultivos...</p>
      </div>

      <!-- Estado de error -->
      <div v-else-if="error" class="error-state">
        <i class="pi pi-exclamation-triangle" style="font-size: 2rem; color: #e74c3c"></i>
        <p>{{ error }}</p>
        <Button
          label="Reintentar"
          icon="pi pi-refresh"
          @click="cultivationService.getAllCultivations()"
          class="p-button-outlined"
        />
      </div>

      <!-- Lista de cultivos -->
      <div v-else-if="cultivations.length > 0" class="cultivations-section">
        <DataTable :value="cultivations" responsiveLayout="scroll" class="cultivations-table">
          <Column field="name" header="Cultivo" sortable>
            <template #body="slotProps">
              <div class="cultivation-name">
                <i class="pi pi-leaf text-green-600"></i>
                <div>
                  <div class="name">{{ slotProps.data.name }}</div>
                  <div class="variety" v-if="slotProps.data.variety">{{ slotProps.data.variety }}</div>
                </div>
              </div>
            </template>
          </Column>

          <Column field="surface" header="Superficie" sortable>
            <template #body="slotProps">
              <span class="surface-badge">{{ slotProps.data.surface }}</span>
            </template>
          </Column>

          <Column field="location" header="Ubicación">
            <template #body="slotProps">
              <div class="location-info">
                <i class="pi pi-map-marker"></i>
                <span>{{ slotProps.data.location }}</span>
              </div>
            </template>
          </Column>

          <Column field="plantingDate" header="Fecha de Siembra" sortable>
            <template #body="slotProps">
              <span class="date-text">{{ formatDate(slotProps.data.plantingDate) }}</span>
            </template>
          </Column>

          <Column field="growthStage" header="Etapa">
            <template #body="slotProps">
              <Tag
                :value="slotProps.data.growthStage"
                :severity="getGrowthStageColor(slotProps.data.growthStage)"
                class="growth-tag"
              />
            </template>
          </Column>

          <Column header="Acciones">
            <template #body="slotProps">
              <div class="action-buttons">
                <Button
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-text p-button-warning"
                  @click="editCultivation(slotProps.data)"
                  title="Editar cultivo"
                />
                <Button
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-text p-button-danger"
                  @click="deleteCultivation(slotProps.data)"
                  title="Eliminar cultivo"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- Estado sin cultivos -->
      <div v-else class="empty-state">
        <i class="pi pi-leaf box-icon"></i>
        <h2 class="title">Aún no hay cultivos</h2>
        <p>Comienza creando tu primer cultivo agrícola</p>
        <Button
          label="Crear Primer Cultivo"
          icon="pi pi-plus"
          @click="goCreateCultivation"
          class="p-button-success"
        />
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
.cultivations-container {
  padding: 1rem;
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.title-section h1 {
  margin: 0 0 0.5rem 0;
  color: #2c5530;
  font-size: 2rem;
}

.title-section p {
  margin: 0;
  color: #666;
  font-size: 1.1rem;
}

.cultivations-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cultivation-name {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.cultivation-name .name {
  font-weight: 600;
  color: #2c5530;
}

.cultivation-name .variety {
  font-size: 0.875rem;
  color: #666;
  font-style: italic;
}

.surface-badge {
  background: #E8F5E8;
  color: #2E7D32;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-weight: 600;
  font-size: 0.875rem;
}

.location-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
}

.location-info i {
  color: #4CAF50;
}

.date-text {
  color: #555;
  font-size: 0.9rem;
}

.growth-tag {
  font-weight: 600;
  font-size: 0.75rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.loading-state, .error-state, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px dashed #dee2e6;
  margin-top: 2rem;
}

.loading-state p, .error-state p, .empty-state p {
  margin: 1rem 0;
  color: #666;
  font-size: 1.1rem;
}

.box-icon {
  font-size: 4rem;
  color: #95a5a6;
  margin-bottom: 1rem;
}

.empty-state .title {
  margin: 0.5rem 0;
  color: #2c5530;
  font-size: 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
  }

  .cultivations-container {
    padding: 0.5rem;
  }
}
</style>