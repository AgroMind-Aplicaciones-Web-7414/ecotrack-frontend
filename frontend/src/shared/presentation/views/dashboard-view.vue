<script setup>
import { useRouter } from 'vue-router';
import AppLayout from '../components/app-layout.vue';
import OrganizationCard from '../../../organization/presentation/components/organization-card.vue';
import Button from 'primevue/button';

const router = useRouter();

const orgs = [
  { id:1, name:'Organizacion 1' },
  { id:2, name:'Organizacion 2' }
];

const goCreate = () => router.push({ name:'organization-create' }); // placeholder
const onEnter = (org) => router.push({ name:'organization-detail', params:{ id: org.id }});
const onDelete = (org) => alert(`Eliminar ${org.name} (por implementar)`);
</script>

<template>
  <AppLayout>
    <div class="wrap">
      <div class="top-row">
        <Button label="Crear Organización" @click="goCreate" />
      </div>

      <OrganizationCard
          v-for="org in orgs"
          :key="org.id"
          :org="org"
          @enter="onEnter(org)"
          @delete="onDelete(org)"
      />
    </div>
  </AppLayout>
</template>

<style scoped>
.wrap{max-width:980px;margin:0 auto}          /* ← centra todo el contenido */
.top-row{display:flex;justify-content:flex-end;margin-bottom:16px}
</style>
