<script setup>
import { ref, computed } from 'vue'
import AppLayout from '../shared/presentation/components/app-layout.vue'

// Reactive filter values
const typeFilter = ref('')
const statusFilter = ref('')

// Static data for reports
const reports = ref([
  {
    id: 1,
    title: 'Monthly Crop Yield Report',
    description: 'Comprehensive analysis of crop yields across all parcels for October 2024',
    date: '2024-10-11',
    type: 'Yield Analysis',
    parcel: 'North Field A',
    crop: 'Corn',
    status: 'Completed',
    fileSize: '2.4 MB'
  },
  {
    id: 2,
    title: 'Soil Quality Assessment',
    description: 'Detailed soil analysis and recommendations for parcel improvement',
    date: '2024-10-08',
    type: 'Soil Analysis',
    parcel: 'South Field B',
    crop: 'Wheat',
    status: 'Completed',
    fileSize: '1.8 MB'
  },
  {
    id: 3,
    title: 'Irrigation Efficiency Report',
    description: 'Water usage optimization and irrigation system performance evaluation',
    date: '2024-10-05',
    type: 'Water Management',
    parcel: 'East Field C',
    crop: 'Tomatoes',
    status: 'In Progress',
    fileSize: '3.1 MB'
  },
  {
    id: 4,
    title: 'Pest Control Effectiveness',
    description: 'Analysis of pest management strategies and their impact on crop health',
    date: '2024-10-03',
    type: 'Pest Management',
    parcel: 'West Field D',
    crop: 'Soybeans',
    status: 'Completed',
    fileSize: '1.5 MB'
  },
  {
    id: 5,
    title: 'Harvest Planning Report',
    description: 'Optimal harvest timing and resource allocation across all parcels',
    date: '2024-09-28',
    type: 'Planning',
    parcel: 'All Parcels',
    crop: 'Mixed Crops',
    status: 'Draft',
    fileSize: '4.2 MB'
  },
  {
    id: 6,
    title: 'Weather Impact Analysis',
    description: 'Assessment of weather conditions impact on crop development and yield',
    date: '2024-09-25',
    type: 'Weather Analysis',
    parcel: 'North Field A',
    crop: 'Corn',
    status: 'Completed',
    fileSize: '2.7 MB'
  }
])

// Computed property for filtered reports
const filteredReports = computed(() => {
  let filtered = reports.value

  // Filter by type
  if (typeFilter.value) {
    filtered = filtered.filter(report => {
      switch (typeFilter.value) {
        case 'yield': return report.type === 'Yield Analysis'
        case 'soil': return report.type === 'Soil Analysis'
        case 'water': return report.type === 'Water Management'
        case 'pest': return report.type === 'Pest Management'
        case 'planning': return report.type === 'Planning'
        case 'weather': return report.type === 'Weather Analysis'
        default: return true
      }
    })
  }

  // Filter by status
  if (statusFilter.value) {
    filtered = filtered.filter(report => {
      switch (statusFilter.value) {
        case 'completed': return report.status === 'Completed'
        case 'progress': return report.status === 'In Progress'
        case 'draft': return report.status === 'Draft'
        default: return true
      }
    })
  }

  return filtered
})

const getStatusColor = (status) => {
  switch (status) {
    case 'Completed': return '#28a745'
    case 'In Progress': return '#ffc107'
    case 'Draft': return '#6c757d'
    default: return '#6c757d'
  }
}

const getTypeIcon = (type) => {
  switch (type) {
    case 'Yield Analysis': return 'pi pi-chart-bar'
    case 'Soil Analysis': return 'pi pi-map'
    case 'Water Management': return 'pi pi-tint'
    case 'Pest Management': return 'pi pi-bug'
    case 'Planning': return 'pi pi-calendar'
    case 'Weather Analysis': return 'pi pi-sun'
    default: return 'pi pi-file'
  }
}
</script>

<template>
  <AppLayout>
    <div class="reports-container">
      <div class="header">
        <h1>Reports Dashboard</h1>
        <p>Comprehensive reports for crop management and parcel analysis</p>
      </div>

      <div class="filters">
        <div class="filter-group">
          <label>Filter by Type:</label>
          <select class="filter-select" v-model="typeFilter">
            <option value="">All Types</option>
            <option value="yield">Yield Analysis</option>
            <option value="soil">Soil Analysis</option>
            <option value="water">Water Management</option>
            <option value="pest">Pest Management</option>
            <option value="planning">Planning</option>
            <option value="weather">Weather Analysis</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Filter by Status:</label>
          <select class="filter-select" v-model="statusFilter">
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="progress">In Progress</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div class="reports-grid">
        <div v-for="report in filteredReports" :key="report.id" class="report-card">
          <div class="report-header">
            <div class="report-icon">
              <i :class="getTypeIcon(report.type)"></i>
            </div>
            <div class="report-meta">
              <h3>{{ report.title }}</h3>
              <span class="report-type">{{ report.type }}</span>
            </div>
            <div class="report-status">
              <span
                class="status-badge"
                :style="{ backgroundColor: getStatusColor(report.status) }"
              >
                {{ report.status }}
              </span>
            </div>
          </div>

          <div class="report-content">
            <p class="report-description">{{ report.description }}</p>

            <div class="report-details">
              <div class="detail-item">
                <i class="pi pi-map-marker"></i>
                <span>{{ report.parcel }}</span>
              </div>
              <div class="detail-item">
                <i class="pi pi-leaf"></i>
                <span>{{ report.crop }}</span>
              </div>
              <div class="detail-item">
                <i class="pi pi-calendar"></i>
                <span>{{ report.date }}</span>
              </div>
              <div class="detail-item">
                <i class="pi pi-file"></i>
                <span>{{ report.fileSize }}</span>
              </div>
            </div>
          </div>

          <div class="report-actions">
            <button class="btn btn-primary">
              <i class="pi pi-eye"></i>
              View Report
            </button>
            <button class="btn btn-secondary">
              <i class="pi pi-download"></i>
              Download
            </button>
            <button class="btn btn-tertiary">
              <i class="pi pi-share-alt"></i>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
.reports-container {
  padding: 20px;
  background: #f8f9fa;
  min-height: calc(100vh - 80px);
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;
}

.header p {
  color: #6c757d;
  font-size: 1.1rem;
}

.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-group label {
  font-weight: 600;
  color: #495057;
  font-size: 0.9rem;
}

.filter-select {
  padding: 8px 12px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 0.9rem;
  background: white;
  min-width: 150px;
}

.filter-select:focus {
  outline: none;
  border-color: #1d6b31;
}

.reports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
}

.report-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.report-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.report-header {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid #f8f9fa;
}

.report-icon {
  width: 48px;
  height: 48px;
  background: #1d6b31;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.report-icon i {
  font-size: 1.5rem;
  color: white;
}

.report-meta {
  flex: 1;
}

.report-meta h3 {
  margin: 0 0 4px 0;
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: 600;
}

.report-type {
  color: #6c757d;
  font-size: 0.9rem;
  font-weight: 500;
}

.status-badge {
  padding: 4px 12px;
  color: white;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.report-content {
  padding: 20px;
}

.report-description {
  color: #495057;
  line-height: 1.6;
  margin-bottom: 20px;
}

.report-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6c757d;
  font-size: 0.9rem;
}

.detail-item i {
  color: #1d6b31;
  width: 16px;
}

.report-actions {
  display: flex;
  gap: 8px;
  padding: 20px;
  border-top: 2px solid #f8f9fa;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #1d6b31;
  color: white;
  flex: 1;
}

.btn-primary:hover {
  background: #155a28;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.btn-tertiary {
  background: #e9ecef;
  color: #495057;
}

.btn-tertiary:hover {
  background: #dee2e6;
}

@media (max-width: 768px) {
  .reports-grid {
    grid-template-columns: 1fr;
  }

  .filters {
    flex-direction: column;
  }

  .report-details {
    grid-template-columns: 1fr;
  }

  .report-actions {
    flex-direction: column;
  }
}
</style>