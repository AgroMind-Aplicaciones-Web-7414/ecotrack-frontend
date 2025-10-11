<script setup lang="js">
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {CultivationService} from '../../application/cultivation.service.js'

const cropService = new CultivationService();
const router = useRouter();

onMounted(async ()=>{
  const crops = await cropService.getCrops()
  const cropsList = crops || []
  if(cropsList.length === 0){
    await router.replace('/crops/empty')
  }
})

</script>

<template>
  <router-view></router-view>
</template>

<style scoped>

</style>