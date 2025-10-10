<script setup lang="js">
import {useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {CultivationService} from '../../application/cultivation.service.js'

const router = useRouter()
const crops = ref([])
const cropService = new CultivationService()

onMounted(async () => {
  crops.value = await cropService.getCrops()
})


function goToNewCrop(){
  router.push("crops/new")
}

function formatDate(date){
  const newdate = new Date(date)
  const day = newdate.getDate()
  const month = newdate.getMonth()+1
  const year = newdate.getFullYear()
  return `${day}/${month}/${year}`
}

const totalSurface = computed(() => {
  return (crops.value || []).reduce((sum, crop)=>{
    const surfaceValue = parseFloat(crop.surface)
    return sum + (isNaN(surfaceValue) ? 0 : surfaceValue)
  },0)
})
</script>

<template>
  <div class="container">
    <h2 class="title">Lista de Cultivos</h2>
    <div class="container-crops">
      <div class="crops-container">
        <div class="crops-grid" v-for="crop in crops" :key="crop.id">
          <pv-card class="crop-card">
            <template #content>
              <div class="crop-content">
                <h3 class="crop-name">{{crop.name}}</h3>
                <div class="crop-info">
                  <p><span class="label">Superficie: </span> {{crop.surface}}</p>
                  <p><span class="label">Ubicacion: </span> {{crop.location}}</p>
                  <p><span class="label"> Fecha de Siembra</span> {{formatDate(crop.plantingDate)}}</p>
                </div>
              </div>
            </template>
          </pv-card>
        </div>
        <div>
          <pv-button class="new-crop" @click="goToNewCrop">+
            <p>Añadir Cultivo</p>
          </pv-button>

        </div>
      </div>
    </div>
    <pv-card class="total-area-card">
      <template #content>
        <div class="total-content">
          <span class="icon-surface pi pi-globe"></span>
          <div class="text-content">
            <h3>Total Area</h3>
            <p>{{totalSurface}} ha</p>
          </div>
        </div>
      </template>
    </pv-card>
  </div>

</template>

<style scoped>
:global(html, body){
  margin: 0;
  padding: 0;
  height: 100%;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  justify-content: flex-start;
  padding: 1rem 0;
  gap: 1rem;
  box-sizing: border-box;
}
.container-crops {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-shadow: 1px 1px 7px rgb(218, 218, 218) !important;
  border-radius: 15px;
  padding: 1.5rem;
}
.title{
  margin: 0.5rem 0;
}
.crops-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  justify-items: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}
.new-crop {
  background-color: #2196F3 !important;
  border-radius: 10px !important;
  color: white !important;
  border: none;
  width: 15rem;
  height: 18rem;
  font-size: 4rem !important;
  justify-content: center;
  transition: transform 0.3s ease !important;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.new-crop p{
  font-size: 1rem !important;
  margin-top: 0.5rem;
}
.crop-card {
  background-color: #2196F3 !important;
  color: white;
  box-shadow: none !important;
  border-radius: 10px !important;
  width: 15rem;
  height: 18rem;
  justify-content: center;
  transition: transform 0.3s ease;
}
.crop-card:hover{
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
.crop-content{
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  height: 100%;
}
.crop-name{
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
  text-transform: capitalize;
}
.crop-info p{
  margin: 0.2rem 0;
  font-size: 0.95rem;
}
.label{
  font-weight: 500;
  opacity: 0.9;
}
.new-crop:hover {
  transform: translateY(-5px);
  color: white !important;
}
.total-area-card{
  background-color: #2E7D32 !important;
  color: white !important;
  border-radius: 10px !important;
  width: 38vh;
  height: 12vh !important;
  display: flex;
  text-align: left !important;
  flex-direction: row !important;
  align-items: center !important;
  margin: 0.5rem 0;
}
.total-content{
  display: flex;
  align-items: center;
  gap: 1rem;
}
.total-area-card h3{
  margin: 0;
  font-size: 1.5rem;
}
.total-area-card p{
  margin: 0;
  font-size: 1.3rem;
}
.icon-surface{
  font-size: 4rem;
}
</style>