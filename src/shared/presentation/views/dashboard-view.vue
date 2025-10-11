<script setup>
import { useRouter } from 'vue-router';
import { userStore } from '../../../iam/application/user.store.js';
import AppLayout from '../components/app-layout.vue';
import OrganizationCard from '../../../organization/presentation/components/organization-card.vue';
import Button from 'primevue/button';

const router = useRouter();

const orgs = [
  { id:1, name:'Organización Agrícola San Juan' },
  { id:2, name:'Cooperativa Verde Valle' },
  { id:3, name:'Asociación EcoFarm' }
];

const goCreate = () => router.push({ name:'organization-create' }); // placeholder
const onEnter = (org) => router.push({ name:'organization-detail', params:{ id: org.id }});
const onDelete = (org) => alert(`Eliminar ${org.name} (por implementar)`);
</script>

<template>
  <AppLayout>
    <div class="dashboard-content">
      <div class="header">
        <h1>Mis Organizaciones</h1>
        <p>Gestiona tus organizaciones agrícolas y cooperativas</p>
      </div>

      <div class="actions">
        <Button
          label="Crear Nueva Organización"
          icon="pi pi-plus"
          @click="goCreate"
          class="p-button-success"
        />
      </div>

      <div class="organizations-grid">
        <OrganizationCard
            v-for="org in orgs"
            :key="org.id"
            :org="org"
            @enter="onEnter(org)"
            @delete="onDelete(org)"
        />
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
.dashboard-content {
  padding: 1rem;
}

.header {
  margin-bottom: 2rem;
}

.header h1 {
  margin: 0 0 0.5rem 0;
  color: #2c5530;
  font-size: 2rem;
}

.header p {
  margin: 0;
  color: #666;
  font-size: 1.1rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
}

.organizations-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>