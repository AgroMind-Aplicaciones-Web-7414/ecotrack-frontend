<script setup lang="js">
import {useRouter} from 'vue-router';

const router = useRouter();

function goNewCrop(){
  router.push('/crops/new');
}
</script>

<template>
<div>
  <img src="../../../assets/images/emptybox.png" alt="Empty Image" class="empty-img"/>
  <p class="text">Aun no hay cultivos</p>
  <pv-button @click="goNewCrop" class="create-btn">Crear cultivo</pv-button>
</div>
</template>

<style scoped>
.empty-img{
  width: 60%;
  height: 60%;
  filter: brightness(2.0) grayscale(100%) contrast(0.0);
  margin: 0;
}
.text{
  font-size: 1.3rem;
}
.create-btn{
  background-color: #2196F3 !important;
  border: none !important;
  color: white !important;
  outline: none !important;
}
.create-btn:hover{
  background-color: #1974b8 !important;
}
</style>