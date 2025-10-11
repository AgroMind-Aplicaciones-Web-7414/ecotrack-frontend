<script setup lang="js">
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {CultivationService} from '../../application/cultivation.service.js'

const crops = ref([]);
const cropService = new CultivationService();
const router = useRouter();

onMounted(async ()=>{
  crops.value = await cropService.getCrops()
  const cropsList = crops.value || []
  if(cropsList.length === 0){
    await router.replace('/crops/empty')
  }else{
    await router.replace('/crops')
  }
})

</script>

<template>
  <router-view name="crops-view"/>
</template>

<style scoped>

</style>