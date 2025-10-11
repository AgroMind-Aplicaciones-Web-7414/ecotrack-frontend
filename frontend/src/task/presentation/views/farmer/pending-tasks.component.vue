<script setup lang="js">
import {TaskService} from '../../../application/task.service.js'
import {ref, onMounted} from "vue"
import {useRouter} from 'vue-router'

const router = useRouter()
const taskService = new TaskService()
const tasks = ref([])
const loading = ref(true)

onMounted(async () => {
  try{
    tasks.value = await taskService.getTasksPending()
  }finally {
    loading.value = false
  }
})

async function startTask(taskID){
  try{
    const numericID = Number(taskID)
    const now = new Date();
    const startedAt = new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }).format(now);
    await taskService.updateStartedDate(numericID, startedAt);
    await taskService.updateStatus(numericID, 'InProgress')
    alert("Task started successfully")
    tasks.value = tasks.value.filter(task => Number(task.taskID) !== numericID)
  }catch(error){
    console.log(error)
  }
}
</script>

<template>
  <div class="container">
    <h3>Pending Tasks</h3>
    <div v-if="!loading">
      <div class="tasks" v-if="tasks.length > 0">
        <ul class="task-list" v-for="task in tasks" :key="task.taskID" >
          <li class="task-item">{{task.title}}</li>
          <pv-button class="more-button" @click="startTask(task.taskID)">Iniciar</pv-button>
        </ul>
      </div>
      <div v-else class="tasks">
        <h3>No tienes tareas pendientes</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 7px rgb(218, 218, 218) !important;
  text-align: center;
}
.container h3{
  margin-top: 2rem;
}
.tasks{
  width: 100%;
  gap: 1rem;
  margin-top: 3rem;
}
.task-list{
  display: flex;
  gap: 5rem;
  width: 100%;
  justify-content: center;
  list-style: none;
}
.more-button{
  background-color: #FF9900 !important;
  border: none !important;
  height: 1.7rem;
  width: 38%;
  border-radius: 8px;
  color: white !important;
  outline: none;
}
.more-button:hover{
  background-color: #df8600 !important;
}
</style>