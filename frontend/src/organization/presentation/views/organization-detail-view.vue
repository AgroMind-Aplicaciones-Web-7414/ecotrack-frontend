<script setup>
import { useRoute, useRouter } from 'vue-router';
import AppLayout from '../../../shared/presentation/components/app-layout.vue';
import Button from 'primevue/button';

const route = useRoute();
const router = useRouter();
const orgId = route.params.id;

const goCreateParcel = () => {
  // Pasamos el id de la organización para asociar la nueva parcela
  router.push({ name: 'parcel-create', query: { orgId } });
};
</script>

<template>
  <AppLayout>
    <div class="wrap">
      <div class="empty">
        <i class="pi pi-box box-icon"></i>
        <h2 class="title">Aun no hay parcelas</h2>
        <Button label="Crear Parcela" @click="goCreateParcel" />
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
.wrap{max-width:1100px;margin:0 auto}
.empty{
  background:#f3f6f9;border-radius:16px;display:flex;flex-direction:column;
  align-items:center;justify-content:center;padding:48px 18px;color:#111
}
.box-icon{font-size:8rem;color:#9aa3ad;margin-bottom:10px}
.title{margin:6px 0 18px 0}
</style>
