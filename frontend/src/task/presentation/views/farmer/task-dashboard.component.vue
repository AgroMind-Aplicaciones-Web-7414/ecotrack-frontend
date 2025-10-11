<script setup lang="js">
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'
import Weather from '../../../../weather/presentation/views/weather.component.vue'

const router = useRouter()

onMounted(()=>{
  router.push('/tasks/completed')
})

</script>

<template>
  <div class="main-content">

    <div class="information-column">

      <div class="organization-container">
        <pv-card class="organization-card">
          <template #content>
            <div class="icon-and-text">
              <span class="pi pi-sitemap icon-spacer"></span>
              <div>
                <div class="organization-name">Organizacion</div>
                <div class="details">Nombre</div>
              </div>
            </div>
          </template>
        </pv-card>
      </div>

      <div class="tasks-buttons">
        <router-link to="/tasks/completed" class="task-button">
          <p>
            <span class="pi pi-check btn-icon"></span>Tareas Completadas
          </p>
        </router-link>
        <router-link to="/tasks/in-progress" class="task-button">
          <p>
            <span class="pi pi-file-edit btn-icon"></span>Tareas En Proceso
          </p>
        </router-link>
        <router-link to="/tasks/pending" class="task-button">
          <p>
            <span class="pi pi-clock btn-icon"></span>Tareas Pendientes
          </p>
        </router-link>
      </div>

      <div class="weather-logs-row">
        <Weather/>
      </div> </div> <div class="tasks-column">
    <div class="tasks-and-logs">
      <router-view class="router-view" name="task-dashboard"/>
      <div class="logs-button">
        <router-link to="/tasks/logs" class="button-card-style">Ver Bitacoras</router-link>
      </div>
    </div>
  </div> </div> </template>

<style scoped>
.main-content{
  display: grid;
  grid-template-columns:1fr 1fr;
  gap: 2rem;
}
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
.tasks-buttons {
  margin-bottom: 1rem;
  display: flex !important;
  flex-direction: column !important;
}
.task-button{
  background-color: white !important;
  display: flex;
  align-items: center;
  border: none !important;
  box-shadow: 1px 1px 7px rgb(218, 218, 218) !important;
  outline: none;
  color: black !important;
  margin-bottom: 1rem;
  border-radius: 10px;
  font-size: 1.3rem;
  justify-content: left;
  height: 8vh;
  transition: background-color 0.3s ease;
}
.task-button p{
  margin-left: 1rem;
}
.task-button:hover{
  background-color: #2196F3 !important;
  color: white !important;
}
.task-button.router-link-exact-active {
  background-color: #2196F3 !important;
  color: white !important;
}
.btn-icon{
  font-size: 1.5rem;
  margin-right: 1rem;
}
.logs-button{
  width: 100%;
  margin-top: 1rem;
  padding: 0 1rem;
}
.button-card-style{
  background-color: white !important;
  display: flex;
  align-items: center;
  border: none !important;
  box-shadow: 1px 1px 7px rgb(218, 218, 218) !important;
  outline: none;
  color: black !important;
  margin-bottom: 1rem;
  border-radius: 10px;
  font-size: 1.3rem;
  justify-content: center;
  height: 6vh;
  transition: background-color 0.3s ease;
}
.button-card-style:hover{
  background-color: #2196F3 !important;
  color: white !important;
}

.button-card-style.router-link-exact-active {
  background-color: #2196F3 !important;
  color: white !important;
}
.tasks-column {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.tasks-and-logs{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.router-view{
  flex-grow: 1;
}
</style>