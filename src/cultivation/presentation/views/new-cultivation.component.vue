<script setup lang="js">
import { ref } from 'vue'
import {CultivationService} from '../../application/cultivation.service.js'
import {useRouter} from "vue-router"

const router = useRouter()
const cropService = new CultivationService()
const cropCreated = ref(false)

const form = ref({
  name: '',
  surface: '',
  location: '',
  plantingDate: null
})

function createCrop(resource){
  try{
    cropService.createCrop(resource)
    cropCreated.value = true
  }catch(error){
    console.log(error)
    alert("Error creating crop")
  }
}

function continueScreen(){
  router.push('/crops')
}
</script>

<template>
<div class="container">
  <h1>Create Crop</h1>
  <div class="form-container">
    <template v-if="!cropCreated">
      <form @submit.prevent="createCrop(form)">
        <p class="form-title">
          <span class="pi pi-user icon-spacing"></span>Datos:
        </p>
        <pv-floatlabel class="inputs">
          <pv-input-text v-model="form.name" class="input" required></pv-input-text>
          <label>Nombre</label>
        </pv-floatlabel>
        <pv-floatlabel class="inputs">
          <pv-input-text v-model="form.surface" class="input" required></pv-input-text>
          <label>Superficie</label>
        </pv-floatlabel>
        <pv-floatlabel class="inputs">
          <pv-input-text v-model="form.location" class="input" required></pv-input-text>
          <label for="on_label">Ubicacion</label>
        </pv-floatlabel>
        <pv-floatlabel  class="inputs">
          <pv-datepicker v-model="form.plantingDate" date-format="dd/mm/yy" class="date" required></pv-datepicker>
          <label>Fecha de Siembra</label>
        </pv-floatlabel>
        <pv-button type="submit" class="create">Crear</pv-button>
      </form>
    </template>
    <template v-else>
      <div class="success-message">
        <div class="check-icon">
          <span class="pi pi-check"></span>
        </div>
        <p class="success-text">Se creo el cultivo de forma exitosa!</p>
        <pv-button @click="continueScreen" class="continue-btn">Continuar</pv-button>
      </div>
    </template>
  </div>
</div>
</template>

<style>

.container {
  width: 100%;
  padding: 0 5rem;
}
.form-container{
  width: 100%;
  padding: 5vh 15vh;
  border-radius: 1rem;
  box-shadow: 1px 1px 7px rgb(218, 218, 218);
}
.form-title {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}
.icon-spacing{
  margin-right: 0.5rem;
  font-size: 1.5rem;
  background-color: orange;
  padding: 7px;
  border-radius: 50%;
  color: white;
}
.inputs{
  display: block;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  width: 60vh;
}
.inputs .input{
  border-radius: 8px;
  padding: 0.5rem;
  width: 100%;
  background-color: white;
  border-color: rgba(0, 0, 0, 0.23) !important;
  color: black;
}
.inputs .input:focus{
  border-color: rgba(0, 0, 0, 0.23) !important;
  outline: none !important;
}
.inputs .date{
  width: 100%;
}
.inputs .date input {
  border-radius: 8px;
  padding: 0.5rem;
  width: 100%;
  background-color: white;
  border-color: rgba(0, 0, 0, 0.23) !important;
  color: black;
}
.inputs .date input:focus{
  box-shadow: none !important;
  border-color: #1a1a1a !important;
  outline: none !important;
}
.create, button.create{
  background-color: #2196F3 !important;
  color: white !important;
  border: none !important;
  outline: none !important;
}
.create:hover{
  background-color: #1974b8 !important;
  color: white !important;
  border: none !important;
}
.success-message{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
}
.check-icon{
  width: 100px;
  height: 100px;
  background-color: #2196F3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.check-icon .pi{
  font-size: 50px;
  color: white;
  font-weight: bold;
}
.continue-btn{
  background-color: #FF9900 !important;
  border: none !important;
  color: white !important;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  outline: none !important;
}
.continue-btn:hover {
  background-color: #cc8400 !important;
}

.p-float-label.p-inputwrapper-focus input,
.p-float-label.p-inputwrapper-filled input,
.p-float-label.p-inputwrapper-focus .p-datepicker input,
.p-float-label.p-inputwrapper-filled .p-datepicker input {
  background-color: white !important;
  color: black !important;
  border-color: rgba(0,0,0,0.23) !important;
  box-shadow: none !important;
}

/* Label que sube al enfocarse o con valor */
.p-float-label.p-inputwrapper-focus label,
.p-float-label.p-inputwrapper-filled label {
  color: black !important;
  background-color: white !important;
}
.p-inputtext,
.p-datepicker input {
  background-color: white !important;
  color: black !important;
  border-color: rgba(0,0,0,0.23) !important;
}
.p-float-label .p-inputtext:focus::after,
.p-float-label .p-datepicker input:focus::after {
  border-color: black !important;
}
</style>